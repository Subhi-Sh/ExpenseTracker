import React from 'react';
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
    <div className='w-full flex flex-col items-center '>
      <h1 className="p-2 text-[#EEEEEE] mb-4">Settings</h1>

      <div className='flex flex-col p-2 w-1/4 justify-center rounded-3xl bg-[#EEEEEE] '>
        <p className='text-[#31363F] mr-2 p-2  mt-2 text-2xl'>Change Currency : </p>
        <Select 
          className='p-2 w-4/5'
          options={options} 
          value={selectedCurrency} 
          onChange={handleCurrencyChange} 
          placeholder="Select Currency"
        />
      </div>
    </div>
  )
}
