import React from 'react';
import { useState } from 'react';

function CitySearchForm({ filterSubmit }) {
    const [searchData,setSearchData] = useState({})
    const [addressData,setAddressData] = useState({})
    const [errors, setErrors] = useState({})
    const axios = require("axios");

    function handleSubmit(e) {
        e.preventDefault();
        if (searchData.distance) {
            delete searchData.distance
        }
        if (searchData.latitude) {
            delete searchData.latitude
        }
        if (searchData.longitude) {
            delete searchData.longitude
        }
        
        for (var key of Object.keys(searchData)) {
            if (searchData[key] === "") {
                delete searchData[key]
            }
        }
        
        for (var key of Object.keys(addressData)) {
            if (addressData[key] === "") {
                delete addressData[key]
            }
        }
        if (Object.keys(addressData).length!==0) {
            if (((addressData.postalcode || addressData.city) && !addressData.distance) || (addressData.distance && !(addressData.postalcode || addressData.city))) {
                console.log({...errors, "errors": "Need to have both a distance and a postal code or city to filter on max distance"})
                console.log(!(Object.keys(errors).length===0))

                console.log(Object.keys(errors).length)
                setErrors({...errors, "errors": "Need to have both a distance and a postal code or city to filter on max distance"})
            } else {
                let geocoding = {...addressData}
                delete geocoding[distance]
                const options = {
                    method: 'GET',
                    url: 'https://forward-reverse-geocoding.p.rapidapi.com/v1/forward',
                    params: geocoding,
                    headers: {
                    'X-RapidAPI-Host': 'forward-reverse-geocoding.p.rapidapi.com',
                    'X-RapidAPI-Key': '665587ffb4msh5194ff99f4e1c2dp1fd5d0jsna8fae9f2a7ea'
                    }
                };
                
                axios.request(options).then(function (response) {
                    if (Object.keys(response.data).length===0) {
                        setErrors({...errors, "errors": "Check postal code and/or city. Not found"})
                    } else {
                        searchData.latitude = response.data[0].lat
                        searchData.longitude = response.data[0].lon
                        searchData.distance = addressData.distance
                        setSearchData(searchData)
                        setErrors({})
                        filterSubmit(searchData)
                    }
                }).catch(function (error) {
                    console.error(error);
                });
            } 
        } else {
            setSearchData(searchData)
            setErrors({})
            console.log("about to filter searchData:",searchData)
            filterSubmit(searchData)
        }
    }

    function handleAddressChange(e){
        setAddressData({...addressData,  [e.target.id]: e.target.value})

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
    <div className="relative z-10 flex flex-wrap items-center justify-between px-4 bg-white shadow-xl md:left-0 md:block md:fixed md:top-20 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden md:w-1/3">
        <form>
            <h4 className="py-3 text-sky-600 text-md">
                Input values for the city metrics that matter to you. Fields left empty won&apos;t be considered.
            </h4>
            {/* <label htmlFor="city" className="py-2 text-sm" >
                City Name: 
            </label>
            <input 
                type="text" 
                id="city" 
                name="city" 
                onChange={handleChange} 
                className="pl-2 m-2 border rounded-md border-sky-600 "
            /><br/> */}
            <label htmlFor="population_max" className="py-2 text-sm" >
                Population Max: 
            </label>
            <input 
                type="number" 
                id="population_max" 
                name="population_max" 
                onChange={handleChange} 
                className="pl-2 m-2 text-sm border rounded-md border-sky-600 "
            /><br/>
            <label htmlFor="population_min" className="py-2 text-sm">
                Population Min: 
            </label>
            <input 
                type="number" 
                id="population_min" 
                name="population_min" 
                onChange={handleChange} 
                className="pl-2 m-2 text-sm border rounded-md border-sky-600 "
            /><br/>
            <label htmlFor="distance" className="py-2 text-sm">
                Max Distance (mi):
            </label>
            <input 
                type="number" 
                id="distance" 
                name="distance" 
                onChange={handleAddressChange} 
                className="pl-2 m-2 text-sm border rounded-md border-sky-600 "
            /><br/>
            <label htmlFor="postalcode" className="py-2 pl-6 text-sm">
                From Postal Code: 
            </label>
            <input 
                type="number" 
                id="postalcode" 
                name="postalcode" 
                onChange={handleAddressChange} 
                className="pl-2 m-2 text-sm border rounded-md border-sky-600 "
            /><br/>
            <label htmlFor="city" className="py-2 pl-6 text-sm">
                From City: 
            </label>
            <input 
                type="text" 
                id="city" 
                name="city" 
                onChange={handleAddressChange} 
                className="pl-2 m-2 text-sm border rounded-md border-sky-600"
            /><br/>
            <label htmlFor="airport" className="py-2 text-sm">
                Min Airport Size:
            </label>
            <select 
                name="airport" 
                id="airport"
                onChange={handleChange} 
                className="pl-2 m-2 text-sm border rounded-md border-sky-600"
            >
                <option value="nil">No Airport</option>
                <option value="P-N">Nonhub</option>
                <option value="P-S">Small hub</option>
                <option value="P-M">Medium hub</option>
                <option value="P-L">Large hub</option>
            </select><br/>
            <label htmlFor="coastal" className="py-2 pr-2 text-sm">
                On the Ocean: 
            </label>
            <input 
                type="radio" 
                id="both" 
                name="coastal" 
                value=""
                className="m-2" 
                onClick={handleRadioClick}
            />
            <label htmlFor="both" className="py-2 pr-2 text-sm">
                Both
            </label>
            <input 
                type="radio" 
                id="yes" 
                name="coastal" 
                value={true} 
                className="m-2" 
                onClick={handleRadioClick}
            />
            <label htmlFor="yes" className="py-2 pr-2 text-sm">
                Yes
            </label>
            <input 
                type="radio" 
                id="no" 
                name="coastal" 
                value={false} 
                className="m-2" 
                onClick={handleRadioClick} 
            />
            <label htmlFor="no" className="py-2 text-sm">
                No
            </label><br/>
            <label htmlFor="on_water" className="py-2 pr-2 text-sm">
                On the water: 
            </label>
            <input 
                type="radio" 
                id="both" 
                name="on_water" 
                value=""
                className="m-2" 
                onClick={handleRadioClick}
            />
            <label htmlFor="both" className="py-2 pr-2 text-sm">
                Both
            </label>
            <input 
                type="radio" 
                id="yes" 
                name="on_water" 
                value={true} 
                className="m-2" 
                onClick={handleRadioClick}
            />
            <label htmlFor="yes" className="py-2 pr-2 text-sm">
                Yes
            </label>
            <input 
                type="radio" 
                id="no" 
                name="on_water" 
                value="false" 
                className="m-2" 
                onClick={handleRadioClick} 
            />
            <label htmlFor="no" className="py-2 text-sm">
                No
            </label><br/>
            <label htmlFor="tax_max" className="py-2 text-sm" >
                Max Income Tax (%): 
            </label>
            <input 
                type="number" 
                id="tax_max" 
                name="tax_max" 
                onChange={handleChange} 
                className="pl-2 m-2 text-sm border rounded-md border-sky-600 "
            /><br/>
            <label 
                htmlFor="monthly_after_tax_salary" 
                className="py-2 text-sm"
            >
                Min average monthly salary after tax:
            </label>
            <input 
                type="number" 
                id="monthly_after_tax_salary" 
                name="monthly_after_tax_salary"
                onChange={handleChange} 
                className="pl-2 m-2 text-sm border rounded-md border-sky-600 " 
            /><br/>
            <label className="py-2 text-sm">
                Max average price (USD/m^2) to buy an apartment:
            </label><br/>
            <label 
                htmlFor="apt_price_per_meter2_outside_city_center" 
                className="py-2 pl-6 text-sm"
            >
                Outside city center:
            </label>
            <input 
                type="number" 
                id="apt_price_per_meter2_outside_city_center" 
                name="apt_price_per_meter2_outside_city_center" 
                onChange={handleChange} 
                className="pl-2 m-2 text-sm border rounded-md border-sky-600 " 
            /><br/>
            <label 
                htmlFor="apt_price_per_meter2_inside_city_center" 
                className="py-2 pl-6 text-sm"
            >
                Inside city center:
            </label>
            <input 
                type="number" 
                id="apt_price_per_meter2_inside_city_center" 
                name="apt_price_per_meter2_inside_city_center" 
                onChange={handleChange} 
                className="pl-2 m-2 text-sm border rounded-md border-sky-600 " 
            /><br/>
            <label className="py-2 text-sm">
                Max average monthly rent for a one bedroom apartment:
            </label><br/>
            <label 
                htmlFor="monthly_rent_one_bdrm_outside_city_center" 
                className="py-2 pl-6 text-sm"
            >
                Outside city center:
            </label>
            <input 
                type="number" 
                id="monthly_rent_one_bdrm_outside_city_center" 
                name="monthly_rent_one_bdrm_outside_city_center" 
                onChange={handleChange} 
                className="pl-2 m-2 text-sm border rounded-md border-sky-600 " 
            /><br/>
            <label 
                htmlFor="monthly_rent_one_bdrm_inside_city_center" 
                className="py-2 pl-6 text-sm"
            >
                Inside city center:
            </label>
            <input 
                type="number" 
                id="monthly_rent_one_bdrm_inside_city_center" 
                name="monthly_rent_one_bdrm_inside_city_center" 
                onChange={handleChange} 
                className="pl-2 m-2 text-sm border rounded-md border-sky-600 " 
            /><br/>
            <label 
                htmlFor="monthly_utilities" 
                className="py-2 text-sm"
            >
                Max Monthly Utilities:
            </label>
            <input 
                type="number" 
                id="monthly_utilities" 
                name="monthly_utilities" 
                onChange={handleChange} 
                className="pl-2 m-2 text-sm border rounded-md border-sky-600 " 
            /><br/>
            <label 
                htmlFor="monthly_internet" 
                className="py-2 text-sm"
            >
                Max Monthly Internet:
            </label>
            <input 
                type="number" 
                id="monthly_internet" 
                name="monthly_internet" 
                onChange={handleChange} 
                className="pl-2 m-2 text-sm border rounded-md border-sky-600" 
            /><br/>
            {Object.keys(errors).length!==0 && 
                <h4 className="px-2 py-2 text-red-500 text-md">
                    {errors.errors}
                </h4>
            }
            <input 
                type="submit" 
                value="Submit" 
                onClick={handleSubmit} 
                className="p-2 m-2 text-sm text-white rounded-md cursor-pointer bg-sky-600 hover:bg-black" 
            />
        </form>
    </div>
  )
}

export default CitySearchForm