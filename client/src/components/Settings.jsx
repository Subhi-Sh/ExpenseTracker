import React, { useState } from 'react';
import { useGlobalContext } from '../contexts/GlobalContext';
import Select from "react-select";

export default function Settings() {

  const { currencies, selectedCurrency, setSelectedCurrency } = useGlobalContext();
  console.log(currencies);
  
  const handleCurrencyChange = (selectedOption) => {
    setSelectedCurrency(selectedOption.value);
    console.log(selectedOption);
  }

  const options = currencies.map((currency) => ({
    value: currency.symbol,
    label: currency.name
  }));

  return (
    <div>
      <h1 className="p-2 mb-4">Settings</h1>

      <div>
        <Select 
          options={options} 
          value={selectedCurrency} 
          onChange={handleCurrencyChange} 
          placeholder="Select Currency"
        />
      </div>
    </div>
  )
}
