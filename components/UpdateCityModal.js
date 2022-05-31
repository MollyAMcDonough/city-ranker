import React from "react";
import { useUser } from '@auth0/nextjs-auth0';
import CategoryModal from "./CategoryModal"

export default function UpdateCityModal({ city, categories, changeCities }) {
    const { user, isLoading } = useUser();
    const [showModal, setShowModal] = React.useState(false);
    const [cityData, setCityData] = React.useState({
        category_id: city.category.id,
        sub: user.sub,
        note: city.note
    });
    const axios = require("axios");

    const categoryDropdowns = categories.map((cat) => <option key={cat.id} name="name" value={cat.id}>{cat.name}</option>)

    function handleChange(e) {
        setCityData({...cityData, [e.target.name]: e.target.value});
    }

    function handleDelete() {
        const options = {
            method: 'DELETE',
            url: `http://127.0.0.1:4000/user_cities/${city.id}`,
            params: {sub: user.sub},
            headers: {
            }
          };
          axios.request(options).then(function () {
            console.log("gonna call remove cities???")
            changeCities(city,"DELETE");
            setShowModal(false)
          }).catch(function (error) {
            console.error(error);
          });
    }

    function handleSubmit(e) {
        e.preventDefault();
        const options = {
            method: 'PATCH',
            url: `http://127.0.0.1:4000/user_cities/${city.id}`,
            params: cityData,
            headers: {
            }
          };
          axios.request(options).then(function (response) {
            changeCities(response.data,"UPDATE")
            setShowModal(false)
          }).catch(function (error) {
            console.error(error);
          });
    }
    
    return (
        <>
        <button
            className="px-3 py-2 text-xs font-medium text-white rounded-md cursor-pointer bg-sky-600 hover:bg-black"
            type="button"
            onClick={() => setShowModal(true)}
        >
            Edit
        </button>
        {showModal ? (
            <>
            <div
                className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none"
            >
                <div className="relative w-auto max-w-3xl mx-auto my-6">
                {/*content*/}
                <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
                    {/*header*/}
                    <div className="flex items-start justify-between p-5 border-b border-solid rounded-t border-blueGray-200">
                    <h3 className="text-3xl font-semibold">
                        {`Update ${city.city.city} in Your Cities`}
                    </h3>
                    <button
                        className="float-right p-1 ml-auto text-3xl font-semibold leading-none text-black bg-transparent border-0 outline-none opacity-5 focus:outline-none"
                        onClick={() => setShowModal(false)}
                    >
                        <span className="block w-6 h-6 text-2xl text-black bg-transparent outline-none opacity-5 focus:outline-none">
                        ×
                        </span>
                    </button>
                    </div>
                    {/*body*/}
                    <div className="relative flex-auto p-6">
                    <form className="flex flex-wrap px-auto">
                        <div className="px-2">
                            <label className="items-start text-base text-left" htmlFor="category">Category:</label><br/>
                            <select id="category" name="category_id" value={cityData.category_id} className="mt-2 text-sm border rounded-md border-sky-600" onChange={handleChange}>
                                {/* can maybe make a button that opens a smaller modal. once save the new category that should be the selected value in this savecity modal */}
                                {categoryDropdowns}
                            </select>
                        </div>
                        <div className="px-2 md:w-2/3 pr-auto">
                            <label className="items-start text-base text-left" 
                                htmlFor="note">Notes:</label><br/>
                            <textarea name="note" value={cityData.note} className="pl-1 mt-2 text-sm border rounded-md md:w-full border-sky-600" onChange={handleChange} />
                        </div>
                    </form>
                    </div>
                    {/*footer*/}
                    <div className="flex items-center justify-end p-6 border-t border-solid rounded-b border-blueGray-200">
                    <button
                        className="px-6 py-2 mb-1 mr-1 text-sm font-bold text-red-500 uppercase transition-all duration-150 ease-linear outline-none background-transparent focus:outline-none"
                        type="button"
                        onClick={() => setShowModal(false)}
                    >
                        Close
                    </button>
                    <button
                        className="px-6 py-3 mb-1 mr-1 text-sm font-bold text-white uppercase bg-red-500 rounded-md cursor-pointer hover:bg-black"
                        type="button"
                        onClick={handleDelete}
                    >
                        Delete
                    </button>
                    <button
                        className="px-6 py-3 mb-1 mr-1 text-sm font-bold text-white uppercase rounded-md cursor-pointer bg-sky-600 hover:bg-black"
                        type="submit"
                        onClick={handleSubmit}
                    >
                        Save Changes
                    </button>
                    </div>
                </div>
                </div>
            </div>
            <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
            </>
        ) : null}
        </>
    );
}