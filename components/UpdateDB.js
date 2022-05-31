import React from 'react'

function UpdateDB() {
// const wikidata_nums = ["Q60", "Q62", "Q65", "Q100", "Q61", "Q975", "Q5083", "Q5092", "Q5917", "Q6346"]
const wikidata_nums = [62]
const axios = require("axios");
const [cities,setCities] = React.useState([])

// const timer = ms => new Promise(res => setTimeout(res, ms));
let json_arr = []

function update() {
    for (let i=0; i<wikidata_nums.length; i++) {
        // await timer(4000)
        const options = {
            method: 'GET',
            url: 'https://cost-of-living-and-prices.p.rapidapi.com/prices',
            params: {city_name: 'Bratislava', country_name: 'Slovakia'},
            headers: {
              'X-RapidAPI-Host': 'cost-of-living-and-prices.p.rapidapi.com',
              'X-RapidAPI-Key': '665587ffb4msh5194ff99f4e1c2dp1fd5d0jsna8fae9f2a7ea'
            }
          };
          

        axios.request(options).then(function (response) {
            console.log(response.data);
            json_arr.push(response.data.data)
            addCity(response.data.data)
        }).catch(function (error) {
            console.error(error);
        });

        console.log("json_arr:",json_arr)
        
    }
}

function updateCity(data) {
    data.wikidata_id = data.wikiDataId
    data.elevation_meters = data.elevationMeters

    const options = {
        method: 'PATCH',
        url: 'http://127.0.0.1:4000/cities',
        params: data,
        headers: {
        }
      };
      axios.request(options).then(function (response) {
        console.log(response.data)
        setCities([...cities,response.data])
      }).catch(function (error) {
        console.error(error);
      });
}
React.useEffect(() => {
    const options = {
        method: 'GET',
        url: 'http://127.0.0.1:4000/cities/search',
        params: {},
        headers: {
        }
      };
      axios.request(options).then(function (response) {
        setCities(response.data);
      }).catch(function (error) {
        console.error(error);
      });
},[])


  return (
    <div>PopulateDB</div>
  )
}

export default UpdateDB