import { NextPage } from 'next';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useCart } from '../ShoppingCart/CartContext';
import Product from '../../constants/Product.interface';

import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import IconButton from '@mui/material/IconButton';
import { Stack } from '@mui/material';

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});

interface Props {
  item: Product;
}

const Item: NextPage<Props> = ({ item }) => {
  const { dispatch } = useCart();

  const addToCart = () => {
    dispatch({ type: 'ADD_TO_CART', payload: item });
  };

  return (
    <Paper
      sx={{
        p: 2,
        margin: '2rem 0rem',
        flexGrow: 1,
        backgroundColor: (theme) =>
          theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
      }}
    >
      <Grid container spacing={2}>
        <Grid item>
          <ButtonBase sx={{ width: 150, height: 150 }}>
            <Img alt='Product' src={item.image} />
          </ButtonBase>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction='column' spacing={2}>
            <Grid item xs>
              <Typography
                gutterBottom
                variant='h6'
                variantMapping={{ h6: 'h6' }}
                component='div'
                className='product-name'
              >
                {item.name}
              </Typography>
              <div>
                <Typography
                  variant='body1'
                  variantMapping={{ body1: 'p' }}
                  gutterBottom
                >
                  {item.description}
                </Typography>
                <Typography
                  variant='body2'
                  variantMapping={{ body2: 'p' }}
                  gutterBottom
                >
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ex
                  autem placeat debitis laboriosam quasi? Voluptas et quo
                  dolores consequatur illum!
                </Typography>
              </div>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          width={{
            xs: '100%',
            md: 'auto',
          }}
          justifyItems='center'
          alignContent='center'
        >
          <Stack
            direction={{
              xs: 'row',
              md: 'column',
            }}
            justifyContent={{
              xs: 'space-between',
            }}
          >
            <Typography
              variant='subtitle1'
              component='div'
              className='product-price'
            >
              ${item.price.toLocaleString()}
            </Typography>
            <IconButton
              color='primary'
              aria-label='add to shopping cart'
              role='add-to-cart'
              onClick={addToCart}
            >
              <AddShoppingCartIcon />
            </IconButton>
          </Stack>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Item;
