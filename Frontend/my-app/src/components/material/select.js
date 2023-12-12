import * as React from 'react';
import { styled } from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import NativeSelect from '@mui/material/NativeSelect';
import InputBase from '@mui/material/InputBase';
import styled2 from 'styled-components';


const BootstrapInput = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3),
  },
  '& .MuiInputBase-input': {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}));

export default function CustomizedSelects({ onSelectChange, onTimezoneChange }) {
  const [selectedCurrency, setCurrency] = React.useState('');
  const [selectedTimezone, setTimezone] = React.useState('');

  const handleCurrencyChange = (event) => {
    const selectedCurrency = event.target.value;
    setCurrency(selectedCurrency);
    if (onSelectChange) {
      onSelectChange(selectedCurrency);
    }
  };

  const handleTimezoneChange = (event) => {
    const selectedTimezone = event.target.value;
    setTimezone(selectedTimezone);
    if (onTimezoneChange) {
      onTimezoneChange(selectedTimezone);
    }
  };

  return (
    <>
      <FormControl sx={{ m: 1 }} variant="standard">
        <InputLabel htmlFor="demo-customized-textbox" shrink={true}>
          幣種
        </InputLabel>
        <BootstrapInput
          id="demo-customized-textbox"
          value={selectedCurrency}
          onChange={handleCurrencyChange}
          placeholder="請輸入幣種 (例 : btcusdt)" // 可以根據需求更改提示文字
        />
      </FormControl>
      <FormControl sx={{ m: 1 }} variant="standard">
        <InputLabel htmlFor="demo-customized-select-native" shrink={true}>
          時區
        </InputLabel>
        <NativeSelect
          id="demo-customized-select-native"
          value={selectedTimezone}
          onChange={handleTimezoneChange}
          input={<BootstrapInput />}
        >
          <option aria-label="None" value="" />
          <option value={"1h"}>1h</option>
          <option value={"4h"}>4h</option>
          <option value={"1d"}>1D</option>
        </NativeSelect>
      </FormControl>
    </>
  );
};
