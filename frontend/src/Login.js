import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './LoginValidation'
import Validation from './LoginValidation';
import axios from 'axios';

function Login() {
    const [values, setValues] = useState({
        email: '',
        password: '',
    });
    const handleInput=(e)=>{
        setValues(prev => ({...prev, [e.target.name]: e.target.value}))
    }
    const [errors, setErrors]= useState({})
    const navigate = useNavigate();
    const handleSubmit = (e) => {
      e.preventDefault();
      const errors = Validation(values); // Validar los campos
      setErrors(errors); // Actualizar los errores
      console.log("Ingrese")
      // verificando si hay errores
      if (Object.values(errors).every(error => error === '')) {
          // si no hay errores, enviar solicitud POST
          axios.post('http://localhost:8080/login', values)
          .then(res => {
              if (res.data === "Success") {
                  navigate('/home');
                  console.log("No Ingrese")
              } else {
                  alert('No Record Existed');
                  console.log("No Ingrese")
              }
          })
          .catch(err => console.log(err));
      }
  }
  
  return (
    //creamos componente con html-boostrap para crear interfaz de login
    <div className='d-flex justify-content-center align-items-center bg-dark vh-100'>
      <div className='bg-white p-3 rounded w-25'>
        <h2>Sign-In</h2>
        <form onSubmit={handleSubmit}>
            <div className='mb-3'>
                <label htmlFor='email'>Email</label>
                <input 
                type='email'
                name='email' 
                placeholder='Enter Email' 
                className='form-control rounded-0'
                onChange={handleInput}/>
                {errors.email && <span className='text-danger'>{errors.email}</span>}
            </div>
            <div className='mb-3'>
                <label htmlFor='password'>Password</label>
                <input 
                type='password'
                name='password' 
                placeholder='Enter Password' 
                className='form-control rounded-0'
                onChange={handleInput}/>
                {errors.password && <span className='text-danger'>{errors.password}</span>}
            </div>
            <button 
            type='submit' 
            className='btn btn-primary w-100'>Login</button>
            <p>You are agree to aour terms and policies</p>
            <Link to="/signup" className='btn btn-success border w-100 text-decoration-none'>Create Account</Link>
        </form>
      </div>
    </div>
  )
}

export default Login
