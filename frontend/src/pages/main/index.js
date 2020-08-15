import React, {useState} from 'react'
import axios from '../../config/axios';

export default function Main() {
  const [ credentials, setCredentials ] = useState({
    email: null,
    password: null,
  });

  async function handleOnChange(event) {
    if (event.target.id === "email") {
      setCredentials({ ...credentials, email: event.target.value});
    } else {
      setCredentials({ ...credentials, password: event.target.value});
    }
    console.log(credentials);

  }

  async function handleSubmit(event) {
    event.preventDefault();
    if ( credentials.email !== null && credentials.password !== null) {
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
        <button>Register</button>
      </form>
    </>
  )
}
