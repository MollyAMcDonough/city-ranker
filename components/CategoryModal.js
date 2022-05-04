import React from "react";

export default function CategoryModal() {
  const [showModal, setShowModal] = React.useState(false);
  const [category, setCategory] = React.useState([]);

  function handleChange(e) {
    setCategory({...category, [e.target.name]: e.target.value})
  }
  return (
    <>
      <button
        className="px-6 py-3 mb-1 mr-1 text-sm font-bold text-white uppercase bg-blue-600 rounded-md cursor-pointer hover:bg-black"
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
            <div className="relative w-auto max-w-sm mx-auto my-6">
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
                      <label htmlFor="name">Name:</label>
                      <input id="name" type="text" name="name" onChange={handleChange} />
                      <label htmlFor="description">Description:</label>
                      <textarea name="description" onChange={handleChange}/>
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
                    className="px-6 py-3 mb-1 mr-1 text-sm font-bold text-white uppercase bg-blue-600 rounded-md cursor-pointer hover:bg-black"
                    type="button"
                    onClick={() => setShowModal(false)}
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