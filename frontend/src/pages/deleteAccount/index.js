import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
import axios from '../../config/axios';


const token = localStorage.getItem('@super-crud/token');



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


export default function DeleteAccount() {
  const history = useHistory();
  const [ password, setPassword] = useState("");



  async function handleDeleteAccount() {
    if ( token ) {
      const response = await isValid(token);
      if ( response.status === 200 ) {
        const data = {
          id: response.data.id,
          password: password,
        }
        console.log(data.password);
        const responseDelete = await axios({
          method: 'delete',
          headers: {
            authorization: `Bearer ${token}`,
          },
          url: '/user',
          data,
        }).then((res) => {
          if(res.status === 200) {
            history.push('/');
          }
        });
      }
    }
  }

  function handleInputChange(event) {
    setPassword(event.target.value);
  }


  return (
    <>
      <h1>DeleteAccount</h1>
      <label>password:</label>
      <input onChange={handleInputChange}/>
      <br/>
      <button onClick={handleDeleteAccount} type="submit">delete</button>
    </>
  )
}
