import React from 'react';
import { useState } from 'react';

function CitySearchForm({ filterSubmit }) {
    const [searchData,setSearchData] = useState({})
    function handleSubmit(e) {
        e.preventDefault();
        for (var key of Object.keys(searchData)) {
            if (searchData[key] === "") {
                delete searchData[key]
            }
        }
        console.log("Submit Event:", e)
        console.log("search data:", searchData)
        setSearchData(searchData)
        filterSubmit(searchData)
    }
    function handleChange(e) {
        setSearchData({...searchData, [e.target.id]: e.target.value})
    }
    function handleRadioClick(e) {
        let radio_val = ""
        if (e.target.value==="true") {
            radio_val = true;
        } else if (e.target.value==="false") {
            radio_val = false;
        }
        setSearchData({...searchData, [e.target.name]: radio_val})
    }
  return (
    //   <div className="relative left-0 z-20 overflow-y-scroll max-h-max md:w-1/3 top-20 overscroll-none">
    <div className="relative z-10 flex flex-wrap items-center justify-between px-3 py-3 bg-white shadow-xl md:left-0 md:block md:fixed md:top-20 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden md:w-1/3">
        <form>
            <h4 className="px-2 py-2 text-blue-600 text-md">
                Input values for the city metrics that matter to you. Fields left empty won't be considered.
            </h4>
            <label htmlFor="population_min" className="px-2 py-2 text-sm">
                Population Minimum: 
            </label>
            <input 
                type="number" 
                id="population_min" 
                name="population_min" 
                onChange={handleChange} 
                className="mx-2 mb-2 border border-blue-600 rounded-md "
            /><br/>
            <label htmlFor="population_max" className="px-2 py-2 text-sm" >
                Population Maximum: 
            </label>
            <input 
                type="number" 
                id="population_max" 
                name="population_max" 
                onChange={handleChange} 
                className="mx-2 mb-2 border border-blue-600 rounded-md "
            /><br/>
            <label htmlFor="on_water" className="px-2 py-2 mb-2 text-sm">
                On the water: 
            </label>
            <input 
                type="radio" 
                id="both" 
                name="on_water" 
                value="" 
                onClick={handleRadioClick}
            />
            <label htmlFor="both" className="px-2 py-2 text-sm">
                Both
            </label>
            <input 
                type="radio" 
                id="yes" 
                name="on_water" 
                value={true} 
                onClick={handleRadioClick}
            />
            <label htmlFor="yes" className="px-2 py-2 text-sm">
                Yes
            </label>
            <input 
                type="radio" 
                id="no" 
                name="on_water" 
                value="false" 
                onClick={handleRadioClick} 
            />
            <label htmlFor="no" className="px-2 py-2 text-sm">
                No
            </label><br/>
            <label 
                htmlFor="monthly_after_tax_salary" 
                className="px-2 py-2 text-sm"
            >
                Minimum average monthly salary after tax:
            </label>
            <input 
                type="number" 
                id="monthly_after_tax_salary" 
                name="monthly_after_tax_salary"
                onChange={handleChange} 
                className="mx-2 mb-2 border border-blue-600 rounded-md " 
            /><br/>
            <label className="px-2 py-2 text-md">
                Maximum average price (USD/m^2) to buy an apartment:
            </label><br/>
            <label 
                htmlFor="apt_price_per_meter2_outside_city_center" 
                className="px-2 py-2 text-sm"
            >
                Outside city center:
            </label>
            <input 
                type="number" 
                id="apt_price_per_meter2_outside_city_center" 
                name="apt_price_per_meter2_outside_city_center" 
                onChange={handleChange} 
                className="mx-2 mb-2 border border-blue-600 rounded-md " 
            /><br/>
            <label 
                htmlFor="apt_price_per_meter2_inside_city_center" 
                className="px-2 py-2 text-sm"
            >
                Inside city center:
            </label>
            <input 
                type="number" 
                id="apt_price_per_meter2_inside_city_center" 
                name="apt_price_per_meter2_inside_city_center" 
                onChange={handleChange} 
                className="mx-2 mb-2 border border-blue-600 rounded-md " 
            /><br/>
            <label className="px-2 py-2 text-md">
                Maximum average monthly rent for a one bedroom apartment:
            </label><br/>
            <label 
                htmlFor="monthly_rent_one_bdrm_outside_city_center" 
                className="px-2 py-2 text-sm"
            >
                Outside city center:
            </label>
            <input 
                type="number" 
                id="monthly_rent_one_bdrm_outside_city_center" 
                name="monthly_rent_one_bdrm_outside_city_center" 
                onChange={handleChange} 
                className="mx-2 mb-2 border border-blue-600 rounded-md " 
            /><br/>
            <label 
                htmlFor="monthly_rent_one_bdrm_inside_city_center" 
                className="px-2 py-2 text-sm"
            >
                Inside city center:
            </label>
            <input 
                type="number" 
                id="monthly_rent_one_bdrm_inside_city_center" 
                name="monthly_rent_one_bdrm_inside_city_center" 
                onChange={handleChange} 
                className="mx-2 mb-2 border border-blue-600 rounded-md " 
            /><br/>
            <label 
                htmlFor="monthly_utilities" 
                className="px-2 py-2 text-sm"
            >
                Maximum Monthly Utilities:
            </label>
            <input 
                type="number" 
                id="monthly_utilities" 
                name="monthly_utilities" 
                onChange={handleChange} 
                className="mx-2 mb-2 border border-blue-600 rounded-md " 
            /><br/>
            <label 
                htmlFor="monthly_internet" 
                className="px-2 py-2 text-sm"
            >
                Maximum Monthly Internet:
            </label>
            <input 
                type="number" 
                id="monthly_internet" 
                name="monthly_internet" 
                onChange={handleChange} 
                className="mx-2 mb-2 border border-blue-600 rounded-md" 
            /><br/>
            <input 
                type="submit" 
                value="Submit" 
                onClick={handleSubmit} 
                className="p-2 m-2 text-sm text-white bg-blue-600 rounded-md cursor-pointer hover:bg-black" 
            />
        </form>
    </div>
  )
}

export default CitySearchForm