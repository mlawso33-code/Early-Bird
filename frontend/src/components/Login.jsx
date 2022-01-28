import React, { useState, useEffect, useContext } from 'react';
import GlobalContext from '../contexts/context.js';

const Login = () => {
  const { page, setPage } = useContext(GlobalContext);

  return (
    <div>This is the Login page!</div>
  )
}

export default Login;