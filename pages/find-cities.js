import React from 'react'
import { useState } from 'react'
import { useUser } from '@auth0/nextjs-auth0'
import NavBar from '../components/NavBar'
import CitySearchForm from '../components/CitySearchForm'

export default function FindCities({}) {
  const { user, isLoading } = useUser();
  const [cities, setCities] = useState([]);
  const axios = require("axios");

  function filterSubmit(cityFilters) {

    const options = {
      method: 'GET',
      url: 'http://127.0.0.1:4000/cities/search',
      params: cityFilters,
      headers: {
        // 'X-RapidAPI-Host': 'cost-of-living-and-prices.p.rapidapi.com',
        // 'X-RapidAPI-Key': '665587ffb4msh5194ff99f4e1c2dp1fd5d0jsna8fae9f2a7ea'
      }
    };

    axios.request(options).then(function (response) {
      console.log(response.data);
    }).catch(function (error) {
      console.error(error);
    });

  }

  return (
    <div className="overscroll-contain">
      <NavBar />
      <div className="relative overscroll-none">
        <CitySearchForm filterSubmit={filterSubmit} />
      </div>
    </div>
  )
}
