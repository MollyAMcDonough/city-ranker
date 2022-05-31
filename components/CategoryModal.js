import React from "react";
import { useUser } from '@auth0/nextjs-auth0'

export default function CategoryModal({categories, setCategories, cityData, setCityData}) {
  const { user, isLoading } = useUser();
  const [showModal, setShowModal] = React.useState(false);
  const [category, setCategory] = React.useState([]);
  const axios = require("axios");

  function handleChange(e) {
    setCategory({...category, [e.target.name]: e.target.value})
  }

  function handleSubmit(e) {
      e.preventDefault();
      const params = {...category, sub: user.sub}
      const options = {
        method: 'POST',
        url: 'http://127.0.0.1:4000/categories',
        params: params,
        headers: {
        }
      };
      axios.request(options).then(function (response) {
        setCategories([...categories,response.data])
        setCityData({...cityData, category_id: response.data.id})
        setShowModal(false)
      }).catch(function (error) {
        console.error(error);
      });
  }
  return (
    <>
      <button
        className="px-6 py-3 mb-1 mr-1 text-sm font-bold text-white uppercase rounded-md cursor-pointer bg-sky-600 hover:bg-black"
        type="button"
        onClick={() => setShowModal(true)}
      >
        New Category
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
                    New Category
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
                <form>
                      <label htmlFor="name">Name:</label><br/>
                      <input className="mt-2 mb-4 border rounded-md border-sky-600 md:w-full" id="name" type="text" name="name" onChange={handleChange} /><br/>
                      <label htmlFor="description">Description:</label><br/>
                      <textarea className="mt-2 border rounded-md border-sky-600 md:w-full" id="description" name="description" onChange={handleChange} />
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
                    className="px-6 py-3 mb-1 mr-1 text-sm font-bold text-white uppercase rounded-md cursor-pointer bg-sky-600 hover:bg-black"
                    type="button"
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