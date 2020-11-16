import React, {useState} from 'react'
import * as Yup from 'yup';
import axios from '../../config/axios';
import { useHistory } from 'react-router-dom';

export default function Main() {

  const history = useHistory();

  const schema = Yup.object().shape({
    name: Yup.string().min(2).max(256),
    email: Yup.string().email().required(),
    password: Yup.string().min(8).max(256),
  });
  const [ credentials, setCredentials ] = useState({
    name: null,
    email: null,
    password: null,
  });

  const [ error, setError] = useState();

  async function handleOnChange(event) {
    setCredentials({ ...credentials,[event.target.id]: event.target.value});
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (await schema.isValid(credentials)){
      const response = await axios({
        method: 'post',
        url: '/register',
        data: credentials,
      }).catch( (err) => {
        setError(err.response.data.message);
      });
      if (response) {
        history.push('/');
      }
    } else {
      setError("invalid credentials");
    }
  }
  function handleBack() {
    history.push('/');
  }

  return (
    <>
      <h1>Register</h1>
      <form>
        <label>{error}</label>
        <br/>
        <label>name:</label>
        <br/>
        <input onChange={handleOnChange} id="name" placeholder="name"/>
        <br />
        <label>email:</label>
        <br/>
        <input onChange={handleOnChange} id="email" placeholder="email"/>
        <br/>
        <label>password:</label>
        <br/>
        <input type="password" onChange={handleOnChange} id="password" placeholder="password"/>
        <br/>
        <button onClick={handleBack}>Back</button>
        <button onClick={handleSubmit} type="submit">register</button>
      </form>
    </>
  )
}

