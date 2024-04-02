import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Validation from './SignupValidation'
import axios from 'axios'
//funcion para el registrase en la aplicacion
function Signup() {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
    });
    const handleInput=(e)=>{
        setValues(prev => ({...prev, [e.target.name]: e.target.value}))
    }
    const navigate = useNavigate();
    const [errors, setErrors]= useState({})
    const handleSubmit = (e) => {
      e.preventDefault();
      
      // Validar los campos
      const errors = Validation(values);
      
      // Verificar si hay errores
      if (!errors.name && !errors.email && !errors.password) {
          // No hay errores, enviar la solicitud POST
          axios.post('http://localhost:8080/signup', values)
              .then(res => {
                  navigate('/');
              })
              .catch(err => console.log(err));
      } else {
          // mostrar los errores al usuario
          setErrors(errors);
      }
  }
  
  return (
    //creamos componente con html-boostrap para crear interfaz de login
    <div className='d-flex justify-content-center align-items-center bg-dark vh-100'>
      <div className='bg-white p-3 rounded w-25'>
      <h2>Sign-Up</h2>
        <form onSubmit={handleSubmit}>
        <div className='mb-3'>
                <label htmlFor='name'>Name</label>
                <input 
                type='text' 
                placeholder='Enter Name' 
                className='form-control rounded-0'
                name='name'
                onChange={handleInput}/>
                {errors.name && <span className='text-danger'>{errors.name}</span>}
            </div>
            <div className='mb-3'>
                <label htmlFor='email'>Email</label>
                <input 
                type='email' 
                placeholder='Enter Email' 
                className='form-control rounded-0'
                name='email'
                onChange={handleInput}/>
                {errors.email && <span className='text-danger'>{errors.email}</span>}
            </div>
            <div className='mb-3'>
                <label htmlFor='password'>Password</label>
                <input 
                type='password' 
                placeholder='Enter Password' 
                className='form-control rounded-0'
                name='password'
                onChange={handleInput}/>
                {errors.password && <span className='text-danger'>{errors.password}</span>}
            </div>
            <button type='submit' className='btn btn-success w-100'>Signup</button>
            <p>You are agree to aour terms and policies</p>
            <Link to="/" className='btn btn-primary border w-100 text-decoration-none'>Login</Link>
        </form>
      </div>
    </div>
  )
}

export default Signup