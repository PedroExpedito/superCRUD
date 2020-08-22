import React, {useState} from 'react';


export default function DeleteAccount() {
  const [ error, setError] = useState(null);
  const token = localStorage.getItem('@super-crud/token');


  return (
    <>
      <form>
        <h1>DeleteAccount</h1>
        <label>{error}</label>
        <label>password:</label>
        <input/>
        <br/>
        <button type="submit">delete</button>
      </form>
    </>
  )
}
