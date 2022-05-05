import React from 'react'
import { useEffect, useState } from 'react'
import { useUser } from '@auth0/nextjs-auth0'
import City from '../components/City'

function FilteredCities({ cities, cityKeys }) {
    const { user, isLoading } = useUser();
    const [categories, setCategories] = useState([]);
    const axios = require("axios");

    useEffect(() => {
        if (!isLoading && user) {
          const options = {
            method: 'GET',
            url: 'http://127.0.0.1:4000/categories',
            params: {sub: user.sub},
            headers: {
            }
          };
          axios.request(options).then(function (response) {
            setCategories(response.data);
            console.log("categories axios get:",response.data)
          }).catch(function (error) {
            console.error(error);
          });
        } else {
          setCategories([]);
        }
    
      },[user, isLoading])
    
    const headers = cityKeys.map((k) => <th key={k}
        className="px-6 py-3 text-xs font-semibold text-left uppercase align-middle border border-l-0 border-r-0 border-solid whitespace-nowrap bg-blueGray-50 text-blueGray-500 border-blueGray-100"
        >{k}</th>)

    const rows = cities.map((city) => <City key={city.id} categories={categories} setCategories={setCategories} city={city} cityKeys={cityKeys} />)

    return (
        // <div className="relative z-20 overflow-y-scroll left-20 max-h-max md:w-2/3 top-20 overscroll-none">FilteredCities
        <div className="bg-[url('../img/charleston.jpeg')] relative z-10 flex flex-wrap items-center justify-between px-3 py-3 shadow-xl md:left-1/3 md:block md:fixed md:top-20 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden md:w-2/3"> 
            <div
                className="relative flex flex-col w-full min-w-0 mb-6 break-words bg-white rounded shadow-lg opacity-90"
            >
                <div className="block w-full overflow-x-auto">
                    <table className="items-center w-full bg-transparent border-collapse">
                        <thead>
                            <tr>
                                <th
                                    className="px-6 py-3 text-xs font-semibold text-left uppercase align-middle border border-l-0 border-r-0 border-solid whitespace-nowrap bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                >
                                    City
                                </th>
                                <th
                                className={
                                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                }
                                >
                                    Region
                                </th>
                                {headers}
                            </tr>
                        </thead>
                        <tbody>
                            {rows}
                        </tbody>
                    </table>
                </div> 
            </div> 
            
        </div>
    )
}

export default FilteredCities