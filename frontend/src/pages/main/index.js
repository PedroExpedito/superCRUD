import React, {useState} from 'react'
import * as Yup from 'yup';
import axios from '../../config/axios';
import { Link } from 'react-router-dom';

export default function Main() {
  const schema = Yup.object().shape({
    email: Yup.string().email().required(),
    password: Yup.string().min(8).max(256),
  });
  const [ credentials, setCredentials ] = useState({
    email: null,
    password: null,
  });

  async function handleOnChange(event) {
    setCredentials({ ...credentials,[event.target.id]: event.target.value});
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (await schema.isValid(credentials)){
      const response = await axios({
        method: 'post',
        url: '/sessions',
        data: credentials,
      });
      console.log(response.data);
      alert("ok");
    } else {
      alert("preencha os dados");
    }
  }

  return (
    <>
      <h1>login</h1>
      <form>
        <label>email:</label>
        <br/>
        <input onChange={handleOnChange} id="email" placeholder="email"/>
        <br/>
        <label>password:</label>
        <br/>
        <input type="password" onChange={handleOnChange} id="password" placeholder="password"/>
        <br/>
        <button onClick={handleSubmit} type="submit">login</button>
        <Link to="register"><button> Register</button></Link>
      </form>
    </>
  )
}
