import React from 'react'
import { useEffect, useState } from 'react'
import { useUser } from '@auth0/nextjs-auth0'
import UserCity from '../components/UserCity'

function UserCities({ categories,changeCities,myCities }) {
    // const { user, isLoading } = useUser();
    // const [categories, setCategories] = useState([]);
    // const [myCities, setMyCities] = useState([]);
    // const axios = require("axios");

    // useEffect(() => {
    //     if (!isLoading && user) {
    //         const options = {
    //             method: 'GET',
    //             url: 'http://127.0.0.1:4000/categories',
    //             params: {sub: user.sub},
    //             headers: {
    //             }
    //           };
    //           axios.request(options).then(function (response) {
    //             setCategories(response.data);
    //             console.log("categories axios get:",response.data)
    //           }).catch(function (error) {
    //             console.error(error);
    //           });
            
    //         const options2 = {
    //             method: 'GET',
    //             url: 'http://127.0.0.1:4000/user_cities',
    //             params: {sub: user.sub},
    //             headers: {
    //             }
    //         };
    //         axios.request(options2).then(function (response) {
    //             setMyCities(response.data);
    //             console.log("my cities axios get:",response.data)
    //         }).catch(function (error) {
    //             console.error(error);
    //         });
    //     } else {
    //         setCategories([]);
    //         setMyCities([]);
    //     }
    
    //   },[user, isLoading])

    //   function changeCities({ city, verb }) {
    //       if (verb==="DELETE") {
    //           const newCities = myCities.filter((c) => !c.id===city.id)
    //           setMyCities(newCities)
    //       } else {
    //           const newCities = myCities.map((c) => {
    //               if (c.id===city.id) return city;
    //               return c;
    //           })
    //           setMyCities(newCities)
    //       }
    //   }
    
    const headerArr = ["city", "region", "on_water", "population", "avg_salary",  "avg_rent" ,"notes"];
    
    const headers = headerArr.map((k) => <th key={k}
        className="px-6 py-3 text-xs font-semibold text-left uppercase align-middle border border-l-0 border-r-0 border-solid whitespace-nowrap bg-blueGray-50 text-blueGray-500 border-blueGray-100"
        >{k}</th>)

    const rows = myCities.map((city) => <UserCity key={city.id} categories={categories} city={city} changeCities={changeCities}/>)

  return (
    <div className="bg-[url('../img/charleston.jpeg')] relative z-10 flex flex-wrap items-center justify-between px-3 py-3 shadow-xl md:block md:fixed md:top-20 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden md:w-full">
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
                                    Category
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

export default UserCities