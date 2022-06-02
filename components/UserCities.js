import React from 'react'
import UserCity from '../components/UserCity'
import Popover from '../components/Popover'

function UserCities({ categories,changeCities,myCities }) {
    
    function sortTable(column,dir) {
        let sortedCities = [...myCities]
        console.log("column:",column)
        if (column==="category") {
            console.log("category",sortedCities[0].category.name)
            sortedCities.sort((a,b) => {
                return (a.category.name === b.category.name ? 0 : (a.category.name < b.category.name ? -1 :1));
            })
        } else if (column==="note") {
            console.log("note",sortedCities[0].note)
            sortedCities.sort((a,b) => {
                return (a.note === b.note ? 0 : (a.note < b.note ? -1 :1));
            })
        } else if (column==="region") {
            sortedCities.sort((a,b) => {
                return (a.city.region.name === b.city.region.name ? 0 : (a.city.region.name < b.city.region.name ? -1 :1));
            })
        } else {
            sortedCities.sort((a,b) => {
                return (a.city[column] === b.city[column] ? 0 : (a.city[column] < b.city[column] ? -1 :1));
            })
        }
        if (dir==="DESC") {
            sortedCities.reverse()
        }
        console.log("sortedCities", sortedCities)
        changeCities(sortedCities,"SORT")
    }
    
    const headerArr = ["on_water", "population"];
    
    const headers = headerArr.map((k) => {
        return (
        <th 
            key={k}
            className="px-6 py-3 text-xs font-semibold text-left uppercase align-middle border border-l-0 border-r-0 border-solid whitespace-nowrap bg-blueGray-50 text-blueGray-500 border-blueGray-100"
        >
            {k}
            <button className="px-1" onClick={()=>sortTable(k,"ASC")}>🔼</button>
            <button onClick={()=>sortTable(k,"DESC")}>🔽</button>
        </th>
        )
    })

    const rows = myCities.map((city) => <UserCity key={city.id} categories={categories} city={city} changeCities={changeCities}/>)

  return (
    <div className="bg-[url('../img/miltiadis-fragkidis-5ULk8EgE8tg-unsplash.jpg')] bg-no-repeat bg-cover relative z-10 flex flex-wrap items-center justify-between px-3 py-3 shadow-xl md:block md:fixed md:top-20 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden md:w-full">
        <div
                className="relative flex flex-col w-full min-w-0 mb-6 break-words bg-white rounded shadow-lg opacity-90"
            >
                <div className="block w-full overflow-x-auto text-center">
                    <table className="items-center w-full bg-transparent border-collapse">
                        <thead>
                            <tr>
                                <th
                                    className="px-6 py-3 text-xs font-semibold text-left uppercase align-middle border border-l-0 border-r-0 border-solid whitespace-nowrap bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                >
                                    Category
                                    <button className="px-1" onClick={()=>sortTable("category","ASC")}>🔼</button>
                                    <button onClick={()=>sortTable("category","DESC")}>🔽</button>
                                </th>
                                <th 
                                    className="px-6 py-3 text-xs font-semibold text-left uppercase align-middle border border-l-0 border-r-0 border-solid whitespace-nowrap bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                >
                                    City
                                    <button className="px-1" onClick={()=>sortTable("city","ASC")}>🔼</button>
                                    <button onClick={()=>sortTable("city","DESC")}>🔽</button>
                                </th>
                                <th 
                                    className="px-6 py-3 text-xs font-semibold text-left uppercase align-middle border border-l-0 border-r-0 border-solid whitespace-nowrap bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                >
                                    Region
                                    <button className="px-1" onClick={()=>sortTable("region","ASC")}>🔼</button>
                                    <button onClick={()=>sortTable("region","DESC")}>🔽</button>
                                </th>
                                {headers}
                                <th 
                                    className="px-6 py-3 text-xs font-semibold text-left uppercase align-middle border border-l-0 border-r-0 border-solid whitespace-nowrap bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                >
                                    avg_salary
                                    <button className="px-1" onClick={()=>sortTable("monthly_after_tax_salary","ASC")}>🔼</button>
                                    <button onClick={()=>sortTable("monthly_after_tax_salary","DESC")}>🔽</button>
                                </th>
                                <th 
                                    className="px-6 py-3 text-xs font-semibold text-left uppercase align-middle border border-l-0 border-r-0 border-solid whitespace-nowrap bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                >
                                    avg_rent
                                    <button className="px-1" onClick={()=>sortTable("monthly_rent_one_bdrm_inside_city_center","ASC")}>🔼</button>
                                    <button onClick={()=>sortTable("monthly_rent_one_bdrm_inside_city_center","DESC")}>🔽</button>
                                </th>
                                <th 
                                    className="px-6 py-3 text-xs font-semibold text-left uppercase align-middle border border-l-0 border-r-0 border-solid whitespace-nowrap bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                >
                                    notes
                                    <button className="px-1" onClick={()=>sortTable("note","ASC")}>🔼</button>
                                    <button onClick={()=>sortTable("note","DESC")}>🔽</button>
                                </th>
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