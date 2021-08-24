import React from "react";
import validator from 'validator';
import { Link } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import { startLogin } from "../../actions/auth";

const LoginScreen = () => {

  const dispatch = useDispatch();
  const {loading} = useSelector(state => state.ui);

  const initialForm = {
    email: "",
    password:"",
  };

  const [ formValues, handleInputChange ] = useForm( initialForm );

  const {email, password} = formValues;

  const handleSubmit = (e) => {
    e.preventDefault();
    isFormValid() && dispatch(startLogin(email, password));
  }

  const error ={};
  const isFormValid = ()=>{

    if(email.trim().length === 0){
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
    }

    return true;
  }

  return (
    <form onSubmit={handleSubmit}>
      <i className="fas fa-sticky-note mb-4" style={{ fontSize: "100px" }}></i>
      <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

      <div className="form-floating">
        <input
          type="email"
          className="form-control"
          id="floatingInput"
          name="email"
          placeholder="name@example.com"
          autoComplete="off"
          value={email}
          onChange={handleInputChange}
          autoFocus
        />
        <label htmlFor="floatingInput">Email address</label>
        {!isFormValid() && <div className="form-text text-danger text-start">{error.email}</div>}
      </div>
      <div className="form-floating">
        <input
          type="password"
          className="form-control"
          id="floatingPassword"
          name="password"
          placeholder="Password"
          value={password}
          onChange={handleInputChange}
        />
        <label htmlFor="floatingPassword">Password</label>
        {!isFormValid() && <div className="form-text text-danger text-start" >{error.password}</div>}
      </div>
      <button className="w-100 btn btn-lg btn-dark" type="submit" disabled={loading}>
        Sign in
      </button>
      <Link className="btn btn-link text-success" to="/auth/register">
        Create Account
      </Link>
    </form>
  );
};

export default LoginScreen;
