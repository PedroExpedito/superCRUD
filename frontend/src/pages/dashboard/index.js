import React, { useState } from 'react';
import {useHistory} from 'react-router-dom';
import axios from '../../config/axios';

async function isValid(token) {
  const response = await axios({
    method: 'get',
    url: '/dashboard',
    headers: {
      authorization: `Bearer ${token}`,
    }
  }).catch( (err) => {
    return err.response;
  });
  return response;
}


export default function Dashboard() {
  const history = useHistory();

  const token = localStorage.getItem('@super-clud/token');

  const [ login, setLogin ] = useState({
    label: "you dont authenticated",
    button: "login",
  });

  console.log(token);

  if (token) {
    const response = isValid(token).then( (res) => {
      if (res.status === 200) {
        setLogin({
          label: "Dashboard",
          button: "logout",
        });
      }
    });

  }

  function handleLogoff() {
    localStorage.setItem('@super-clud/token', null);
    history.push('/');
  }

  return (
    <>
      <h1>{login.label}</h1>
      <button onClick={handleLogoff}>{login.button}</button>
    </>
  );
}
