import React from 'react'
import { useState } from 'react'
import { useUser } from '@auth0/nextjs-auth0'
import NavBar from '../components/NavBar'
import CitySearchForm from '../components/CitySearchForm'
import FilteredCities from '../components/FilteredCities'


export default function FindCities({}) {
  const { user, isLoading } = useUser();
  const [categories, setCategories] = useState([]);
  const [cities, setCities] = useState([]);
  const [cityKeys, setCityKeys] = useState([]);
  const axios = require("axios");


  function filterSubmit(cityFilters) {
    let cityKeyArr = Object.keys(cityFilters).map((filter)=> {
      if (filter==="population_min" || filter==="population_max") {
        return "population"
      }
      return filter
    });
    setCityKeys([...new Set(cityKeyArr)])
    
    const options = {
      method: 'GET',
      url: 'http://127.0.0.1:4000/cities/search',
      params: cityFilters,
      headers: {
      }
    };

    axios.request(options).then(function (response) {
      setCities(response.data);
    }).catch(function (error) {
      console.error(error);
    });

  }

  return (
    <div className="flex flex-col overscroll-contain">
      <div>
        <NavBar />
      </div>
      <div className="flex flex-row" >
        <div className="relative flex-1 overscroll-none">
          <CitySearchForm filterSubmit={filterSubmit} />
        </div>
        <div className="relative flex-2 overscroll-none ">
          <FilteredCities cities={cities} cityKeys={cityKeys} />
        </div>
      </div>
    </div>
  )
}
