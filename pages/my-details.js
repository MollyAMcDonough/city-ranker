import { useEffect, useState } from 'react';
import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0';
import NavBar from '../components/NavBar';
import UserDetails from '../components/UserDetails';


export default withPageAuthRequired(function MyCategories() {
  const { user, isLoading } = useUser();

  return (
    <div>
      <div>
        <NavBar />
      </div>
      <div>
        <UserDetails />
      </div>
    </div>
  )
})
