import React from 'react';
import Slider from '@mui/material/Slider';
import { NextPage } from 'next';
interface Props {
  value: any;
  changePrice: any;
}
const PriceSlider: NextPage<Props> = ({ value, changePrice }) => {
  return (
    <div className='px-8'>
      <Slider
        value={value}
        onChange={changePrice}
        valueLabelDisplay='on'
        role='price-slider'
        className='mt-8 text-blue-700'
        min={1000}
        max={5000}
      />
    </div>
  );
};

export default PriceSlider;
