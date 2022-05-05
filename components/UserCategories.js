import React from 'react'
import UserCategory from '../components/UserCategory'

function UserCategories({ changeCategories, myCategories }) {
    
    function sortTable(column,dir) {
        let sortedCategories = [...myCategories]
        // if (column==="category") {
        //     sortedCategories.sort((a,b) => {
        //         return (a.category.name === b.category.name ? 0 : (a.category.name < b.category.name ? -1 :1));
        //     })
        // } else if (column==="note") {
        //     sortedCategories.sort((a,b) => {
        //         return (a.note === b.note ? 0 : (a.note < b.note ? -1 :1));
        //     })
        // } else {
        //     sortedCategories.sort((a,b) => {
        //         return (a.city[column] === b.city[column] ? 0 : (a.Category[column] < b.city[column] ? -1 :1));
        //     })
        // }
        // if (dir==="DESC") {
        //     sortedCategories.reverse()
        // }
        changeCategories(sortedCategories,"SORT")
    }

    const rows = myCategories.map((cat) => <UserCategory key={cat.id} category={category} changeCategories={changeCategories}/>)

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
                                    Name
                                    <button className="px-1" onClick={()=>sortTable("name","ASC")}>🔼</button>
                                    <button onClick={()=>sortTable("name","DESC")}>🔽</button>
                                </th>
                                <th 
                                    className="px-6 py-3 text-xs font-semibold text-left uppercase align-middle border border-l-0 border-r-0 border-solid whitespace-nowrap bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                >
                                    Description
                                    <button className="px-1" onClick={()=>sortTable("description","ASC")}>🔼</button>
                                    <button onClick={()=>sortTable("description","DESC")}>🔽</button>
                                </th>
                                <th 
                                    className="px-6 py-3 text-xs font-semibold text-left uppercase align-middle border border-l-0 border-r-0 border-solid whitespace-nowrap bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                >
                                    Number of Cities
                                    <button className="px-1" onClick={()=>sortTable("num_cities","ASC")}>🔼</button>
                                    <button onClick={()=>sortTable("num_cities","DESC")}>🔽</button>
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

export default UserCategories