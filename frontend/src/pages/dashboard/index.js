import React, { useState, useEffect } from 'react';
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
    console.log(err.response);
    return err.response;
  });
  return response;
}

const token = localStorage.getItem('@super-crud/token');


export default function Dashboard() {
  const history = useHistory();

  const [ login, setLogin ] = useState({
    label: "you dont authenticated",
    button: "login",
  });

  useEffect( () => {
    if (token) {
      console.log(`token: ${token}`);
      isValid(token).then((res) => {
        console.log("CHEGUEI");
        if(res.status === 200) {
          setLogin({
            label: "Autenticado",
            button: "logout",
          });
        }
      });
    }
  },[]);


  function handleLogoff() {
    localStorage.setItem('@super-crud/token', null);
    history.push('/');
  }

  function handleDeleteAccount() {
    history.push('/deleteaccount');
  }

  return (
    <>
      <h1>{login.label}</h1>
      <button onClick={handleLogoff}>{login.button}</button>
      <button onClick={handleDeleteAccount}>Delete Account</button>
    </>
  );
}
