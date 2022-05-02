import React from 'react';
import { useUser, withPageAuthRequired, getSession } from '@auth0/nextjs-auth0';



export default withPageAuthRequired(function MyCities() {

  const { user, isLoading } = useUser();
  console.log("user:",user,isLoading);
  return (
    <div>MyCities</div>
  )
})

