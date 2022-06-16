import { useEffect, useState } from 'react';
import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0';
import NavBar from '../components/NavBar';
import UserCategories from '../components/UserCategories';


export default withPageAuthRequired(function MyCategories() {
  const { user, isLoading } = useUser();
  const [myCategories, setMyCategories] = useState([]);
//   const [myCities, setMyCities] = useState([]);
  const axios = require("axios");

  useEffect(() => {
    if (!isLoading && user) {
        const options = {
            method: 'GET',
            // url: 'http://127.0.0.1:4000/categories',
            url: 'http://city-ranker-api.herokuapp.com/categories'
            params: {sub: user.sub},
            headers: {
            }
          };
          axios.request(options).then(function (response) {
            setMyCategories(response.data);
            console.log("categories axios get:",response.data)
          }).catch(function (error) {
            console.error(error);
          });
        
        // const options2 = {
        //     method: 'GET',
        //     url: 'http://127.0.0.1:4000/user_cities',
        //     params: {sub: user.sub},
        //     headers: {
        //     }
        // };
        // axios.request(options2).then(function (response) {
        //     setMyCities(response.data);
        //     console.log("my cities axios get:",response.data)
        // }).catch(function (error) {
        //     console.error(error);
        // });
    } else {
        setMyCategories([]);
        // setMyCities([]);
    }

  }, [user, isLoading])
  
  function changeCategories(category, verb) {
    if (verb==="DELETE") {
        const newCategories = myCategories.filter((c) => c.id!==category.id)
        setMyCategories(newCategories)
    } else if (verb==="UPDATE"){
        const newCategories = myCategories.map((c) => {
            if (c.id===category.id) return category;
            return c;
        })
        setMyCategories(newCategories)
    } else {
        setMyCategories(category)
    }
  }

  return (
    <div>
      <div>
        <NavBar />
      </div>
      <div>
        <UserCategories changeCategories={changeCategories} myCategories={myCategories} />
      </div>
    </div>
  )
})

