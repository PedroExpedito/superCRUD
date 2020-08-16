import React, { useState } from 'react';
import axios from '../../config/axios';

export default function Dashboard() {
  const token = localStorage.getItem('@super-clud/token');

  const [ login, setLogin ] = useState("precisa fazer login");


  async function isValid(token) {
    const response = await axios({
      method: 'get',
      url: '/dashboard',
      headers: {
        authorization: `Bearer ${token}`,
      }
    }).catch( (err) => {
      setLogin("precisa logar para visualizar está rota");
      return err.response;
    });
    setLogin("logado");
  }

  isValid(token);

  return (
    <h1>{login}</h1>
  );
}
