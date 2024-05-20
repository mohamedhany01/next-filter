import React, { memo } from 'react';
import { NextPage } from 'next';
import FilterByRadio from '../FilterByRadio/FilterByRadio';
import PriceSlider from '../PriceSlider/PriceSlider';
import { Box, Card, CardContent, Divider, Typography } from '@mui/material';

interface Props {
  priceRange: any;
  changePrice: any;
  filterBy: any;
}

const FilterPanel: NextPage<Props> = ({
  priceRange,
  changePrice,
  filterBy,
}) => {
  return (
    <Card sx={{ borderRadius: 3, boxShadow: 3, mb: 2 }}>
      <CardContent>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography variant='h5' component='div' sx={{ mt: 2 }}>
            Filters
          </Typography>
        </Box>
        <Divider sx={{ mt: 2 }} />
        <h4 className='py-2 text-xl font-bold'>Filter By:</h4>
        <FilterByRadio
          filterBy={filterBy}
          labelName={'Name'}
          defaultValue={''}
          radios={[
            {
              label: 'A - Z',
              value: 'az',
            },
            {
              label: 'Z - A',
              value: 'za',
            },
          ]}
        />

        <FilterByRadio
          labelName={'Price'}
          filterBy={filterBy}
          defaultValue={''}
          radios={[
            {
              label: 'High',
              value: 'high',
            },
            {
              label: 'Low',
              value: 'low',
            },
          ]}
        />
        <Divider sx={{ mt: 2 }} />
        <h4 className='py-2  text-xl font-bold'>Price Range</h4>
        <PriceSlider value={priceRange} changePrice={changePrice} />
      </CardContent>
    </Card>
  );
};

export default memo(FilterPanel);
