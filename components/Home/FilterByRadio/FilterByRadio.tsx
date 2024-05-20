import React from 'react';
import {
  FormControlLabel,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
} from '@mui/material';
import { NextPage } from 'next';
interface Props {
  labelName: any;
  defaultValue: any;
  radios: radioElement[];
  // handleCheckFilterBy: any
  filterBy: any;
}

interface radioElement {
  label: any;
  value: any;
}

const FilterByRadio: NextPage<Props> = ({
  filterBy,
  labelName,
  defaultValue,
  radios,
}) => {
  return (
    <div>
      <FormControl>
        <FormLabel>{labelName}</FormLabel>
        <RadioGroup defaultValue={defaultValue} name='radio-buttons-group'>
          {radios.map((radioElement, i) => (
            <FormControlLabel
              key={i}
              value={radioElement.value}
              control={
                <Radio onChange={(event) => filterBy(event.target.value)} />
              }
              label={radioElement.label}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </div>
  );
};

export default FilterByRadio;
