import { useEffect, useState } from 'react';
import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0';
import NavBar from '../components/NavBar';
import UserCities from '../components/UserCities';


export default withPageAuthRequired(function MyCities() {
  const { user, isLoading } = useUser();
  const [categories, setCategories] = useState([]);
  const [myCities, setMyCities] = useState([]);
  const axios = require("axios");

  useEffect(() => {
    if (!isLoading && user) {
        const options = {
            method: 'GET',
            url: 'http://127.0.0.1:4000/categories',
            params: {sub: user.sub},
            headers: {
            }
          };
          axios.request(options).then(function (response) {
            setCategories(response.data);
            console.log("categories axios get:",response.data)
          }).catch(function (error) {
            console.error(error);
          });
        
        const options2 = {
            method: 'GET',
            url: 'http://127.0.0.1:4000/user_cities',
            params: {sub: user.sub},
            headers: {
            }
        };
        axios.request(options2).then(function (response) {
            setMyCities(response.data);
            console.log("my cities axios get:",response.data)
        }).catch(function (error) {
            console.error(error);
        });
    } else {
        setCategories([]);
        setMyCities([]);
    }

  }, [user, isLoading])
  
  function changeCities(city, verb) {
    console.log("change cities was called")
    console.log("verb=",verb)
    console.log("verb==",verb==="DELETE")
    if (verb==="DELETE") {
        console.log("inside delete ifff")
        const newCities = myCities.filter((c) => c.id!==city.id)
        console.log("was city removed?",newCities)
        setMyCities(newCities)
    } else {
        const newCities = myCities.map((c) => {
            if (c.id===city.id) return city;
            return c;
        })
        setMyCities(newCities)
    }
  }

  return (
    <div>
      <div>
        <NavBar />
      </div>
      <div>
        <UserCities changeCities={changeCities} categories={categories} myCities={myCities} />
      </div>
    </div>
  )
})

