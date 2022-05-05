import React from 'react'
import { useUser } from '@auth0/nextjs-auth0';
import UpdateCityModal from './UpdateCityModal';

function UserCity({ categories, city, changeCities }) {
    const { user, isLoading } = useUser();
    const cityKeys = ["city", "region", "on_water", "population", "monthly_after_tax_salary",  "monthly_rent_one_bdrm_inside_city_center"];

    const cityData = cityKeys.map((k)=><td className="p-4 px-6 text-xs align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">{city.city[k].toString()}</td>)
    return (
        <tr>
            <td className="p-4 px-6 text-xs align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">{city.category.name}</td>
            {cityData}
            <td className="flex flex-wrap p-4 px-6 text-xs align-middle border-t-0 border-l-0 border-r-0 md:flex-row md:overflow-y-auto md:w-40 whitespace-nowrap">{city.note}</td>
            {!isLoading && user && (
                <td className="p-4 px-6 text-xs align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">
                    <UpdateCityModal city={city} categories={categories} changeCities={changeCities} />
                </td>
            )}
        </tr>
)
}

export default UserCity