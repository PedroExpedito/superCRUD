import React, {useState} from 'react'
import * as Yup from 'yup';
import axios from '../../config/axios';
import { Link,useHistory  } from 'react-router-dom';
import './styles.css';

export default function Main() {
  const history = useHistory();
  const schema = Yup.object().shape({
    email: Yup.string().email().required(),
    password: Yup.string().min(8).max(256),
  });
  const [ credentials, setCredentials ] = useState({
    email: null,
    password: null,
  });

  const [ error, setError ] = useState();

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
      }).catch( (err) => {
        setError(err.response.data.message);
        console.log(err.response);
      });
      if (response) {
        localStorage.setItem('@super-crud/token',response.data.token);
        history.push("/dashboard")
      }
    } else {
      setError("preencha os dados");
    }
  }

  return (
    <>
      <div>
        <h1>Login</h1>
        <form>
          <label>{error}</label>
          <br/>
          <label><strong>email:</strong></label>
          <br/>
          <input autoComplete="email" onChange={handleOnChange} id="email" placeholder="email"/>
          <br/>
          <label><strong>password:</strong></label>
          <br/>
          <input type="password" autoComplete="current-password" onChange={handleOnChange} id="password" placeholder="password"/>
          <br/>
          <button onClick={handleSubmit} type="submit">login</button>
          <Link to="register"><button> Register</button></Link>
        </form>
      </div>
    </>
  )
}
