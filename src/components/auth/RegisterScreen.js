import React from 'react';
import validator from 'validator';
import { Link } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { fetchSinToken } from '../../helpers/fetch';

const RegisterScreen = ({history}) => {


  const initialForm = {
    name:"",
    email: "",
    password:"",
    password2:""
  };

  const [ formValues, handleInputChange ] = useForm( initialForm );

  const {name, email, password, password2} = formValues;

  const handleSubmit = async(e) => {
    e.preventDefault();
    if(isFormValid()){
      const resp = await fetchSinToken("auth/new",{name, email, password}, "POST");
      const body = await resp.json();
      if(body.status){
        history.replace("/auth/login");
        console.log(body.message);
      }else{
        console.log(body.errors[0].msg);
      }
    } 
  }
  const error={};

  const isFormValid = ()=>{
    const nameValidations = ["admin", "god"];

      if(name.length === 0){
      error.name="Name is required";
      return false;  
    } else if(nameValidations.includes(name)){
      error.name="Nice try";
      return false;
    } else if(email.trim().length === 0){
      error.email = "Email is required";
      return false;
    } else if(!validator.isEmail(email)){
      error.email = "Email is not valid";
      return false;
    } else if(password.length === 0){
      error.password="Password is required";
      return false;
    } else if(password.length < 6 ){
      error.password="password must be minimum of 6 characters";
      return false;
    } else if(password !== password2){
      error.password2 = "password must be equals";
      return false;
    }

    return true;
  }


 return (
  <form onSubmit={handleSubmit}>
      <i className="far fa-sticky-note mb-4" style={{ fontSize: "100px" }}></i>
      <h1 className="h3 mb-3 fw-normal">Please sign Up</h1>

      <div className="form-floating">
        <input
          type="text"
          className="form-control"
          id="floatingInputName"
          name="name"
          placeholder="name..."
          autoComplete="off"
          value={name}
          onChange={handleInputChange}
          autoFocus
        />
        <label htmlFor="floatingInputName">Name</label>
        {!isFormValid() && <div className="form-text text-danger text-start">{error.name}</div>}
      </div>

      <div className="form-floating">
        <input
          type="email"
          className="form-control"
          id="floatingInputEmail"
          name="email"
          placeholder="name@example.com..."
          autoComplete="off"
          value={email}
          onChange={handleInputChange}
        />
        <label htmlFor="floatingInputEmail">Email address</label>
        {!isFormValid() && <div className="form-text text-danger text-start">{error.email}</div>}
      </div>

      <div className="form-floating">
        <input
          type="password"
          className="form-control"
          id="floatingPassword"
          name="password"
          placeholder="Password..."
          value={password}
          onChange={handleInputChange}
        />
        <label htmlFor="floatingPassword">Password</label>
        {!isFormValid() && <div className="form-text text-danger text-start">{error.password}</div>}
      </div>

      <div className="form-floating">
        <input
          type="password"
          className="form-control"
          id="floatingPassword2"
          name="password2"
          placeholder="Confirm Password..."
          value={password2}
          onChange={handleInputChange}
        />
        <label htmlFor="floatingPassword2">Confirm Password</label>
        {!isFormValid() && <div className="form-text text-danger text-start">{error.password2}</div>}
      </div>

      <button className="w-100 btn btn-lg btn-dark" type="submit">
        Sign Up
      </button>
      <Link className="btn btn-link text-success" to="/auth/login">
        Sing In
      </Link>
  </form>
 );
}

export default RegisterScreen;