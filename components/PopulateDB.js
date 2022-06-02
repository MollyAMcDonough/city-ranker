import React from 'react'

function PopulateDB() {
const wikidata_nums = [83813,159232,770571,986369, 659400, 185582, 186702, 1297]
const axios = require("axios");

const timer = ms => new Promise(res => setTimeout(res, ms));
let json_arr = []

async function pop() {
    for (let i=0; i<wikidata_nums.length; i++) {
        await timer(4000)
        const options = {
        method: 'GET',
        url: `https://wft-geo-db.p.rapidapi.com/v1/geo/cities/Q${wikidata_nums[i]}`,
        headers: {
            'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com',
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

function addCity(data) {
    data.wikidata_id = data.wikiDataId
    data.elevation_meters = data.elevationMeters

    const options = {
        method: 'POST',
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
    pop()
},[])


  return (
    <div>PopulateDB</div>
  )
}

export default PopulateDB