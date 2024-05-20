'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Head from 'next/head';
import FilterPanel from '../components/Home/FilterPanel/FilterPanel';
import List from '../components/Home/List/List';
import EmptyList from '../components/Home/ItemNotFound/ItemNotFound';
import Product from '../components/constants/Product.interface';
import Cart from '../components/Home/ShoppingCart/Cart';
import SearchAppBar from '../components/Home/SearchBar/SearchAppBar';
import { Box, Container, Grid } from '@mui/material';

async function fetchDataFromAPI() {
  const res = await fetch(`https://next-filter-one.vercel.app/products.json`);
  return res.json();
}

export default function Home() {
  const [inputSearch, setInputSearch] = useState('');
  const [filterBy, setFilterBy] = useState(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [resultFound, setResultFound] = useState(true);
  const [priceRange, setPriceRange] = useState([1000, 5000]);

  const changePrice = useCallback((e: Event, value: any) => {
    setPriceRange(value);
  }, []);

  const applyFilters = (products: Product[]) => {
    let newFilteredProducts = products;
    if (filterBy) {
      switch (filterBy) {
        case 'low':
          newFilteredProducts = newFilteredProducts.sort(
            (a, b) => a.price - b.price
          );
          break;
        case 'high':
          newFilteredProducts = newFilteredProducts.sort(
            (a, b) => b.price - a.price
          );
          break;
        case 'az':
          newFilteredProducts = newFilteredProducts.sort((a, b) =>
            a.name.localeCompare(b.name, undefined, { numeric: true })
          );
          break;
        case 'za':
          newFilteredProducts = newFilteredProducts.sort((a, b) =>
            b.name.localeCompare(a.name, undefined, { numeric: true })
          );
          break;
      }
    }

    const MinPrice = priceRange[0];
    const MaxPrice = priceRange[1];
    newFilteredProducts = newFilteredProducts.filter(
      (items) => items.price >= MinPrice && items.price <= MaxPrice
    );

    if (inputSearch) {
      newFilteredProducts = newFilteredProducts.filter(
        (items) =>
          items.name.toLowerCase().search(inputSearch.toLowerCase().trim()) !==
          -1
      );
    }

    setProducts(newFilteredProducts);
    !newFilteredProducts.length ? setResultFound(false) : setResultFound(true);
  };

  useEffect(() => {
    async function fetchData() {
      const data = await fetchDataFromAPI();
      setProducts(data);
      applyFilters(data);
    }
    fetchData();
  }, [filterBy, priceRange, inputSearch]);

  return (
    <>
      <Head>
        <title>Next Filter</title>
        <meta name='description' content='Next Filter' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <SearchAppBar
        handlerChange={(e: any) => setInputSearch(e.target.value)}
        value={inputSearch}
      />

      <Box
        sx={{
          display: 'flex',
          overflow: 'auto',
          width: '100%',
          height: '100%',
          bgcolor: 'rgba(0, 0, 0, 0.05)',
          paddingBottom: '2.5rem',
        }}
      >
        <Container
          component='main'
          maxWidth='lg'
          sx={{
            marginTop: '2rem',
          }}
        >
          <Box>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <FilterPanel
                  priceRange={priceRange}
                  changePrice={changePrice}
                  filterBy={setFilterBy}
                />

                <Cart />
              </Grid>

              <Grid item xs={12} md={8}>
                {resultFound ? <List list={products} /> : <EmptyList />}
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </>
  );
}
