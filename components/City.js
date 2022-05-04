import React from 'react'
import { useUser } from '@auth0/nextjs-auth0';
import SaveCityModal from './SaveCityModal';

function City({ categories, city, cityKeys }) {
    const { user, isLoading } = useUser();
    const cityData = cityKeys.map((k)=><td className="p-4 px-6 text-xs align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">{city[k]}</td>)
    console.log("city.city in city:",city.city)
    return (
        <tr>
            <th className="flex items-center p-4 px-6 text-xs text-left align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">
                <span
                    className="ml-3 font-bold cursor-pointer text-blueGray-600 hover:font-black"
                >
                    {city.city}
                </span>
            </th>
            <td className="p-4 px-6 text-xs align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">
                {city.region}
            </td>
            {cityData}
            {!isLoading && user && (
                <SaveCityModal cityName={city.city} categories={categories}/>
            )}
        </tr>
)
}

export default City