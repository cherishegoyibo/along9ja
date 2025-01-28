import { useRef, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';


const REGISTER_URL = 'https://along9ja-backend.onrender.com/createUser';


import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const NAME_REGEX = /^[A-z ]{3,50}$/; // Allows letters and spaces, 3-50 characters
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email validation
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
// const REGISTER_URL = "/signUp";

const SignUp = () => {
  const navigate = useNavigate();
  const nameRef = useRef();
  const errRef = useRef();

  const [name, setName] = useState("");
  const [validName, setValidName] = useState(false);
  const [nameFocus, setNameFocus] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [password, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const [registeredName, setRegisteredName] = useState("");

  useEffect(() => {
    nameRef.current.focus();
  }, []);

  useEffect(() => {
    setValidName(NAME_REGEX.test(name));
  }, [name]);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(password));
    setValidMatch(password === matchPwd);
  }, [password, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [name, email, password, matchPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!NAME_REGEX.test(name) || !EMAIL_REGEX.test(email) || !PWD_REGEX.test(password )) {
      setErrMsg("Invalid Entry");
      return;
    }
    try {
      const response = await axios.post(
        REGISTER_URL,
        JSON.stringify({ name, email, password }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      )
      console.log(response?.data);
      setSuccess(true);
      setName("");
      setEmail("");
      setPwd("");
      setMatchPwd("");
      setTimeout(() => navigate('/'), 2000); 
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 409) {
        setErrMsg("Email Already Registered");
      } else {
        setErrMsg("Registration Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      {success ? (
        <section className="signup-section">
          <h1>Success!</h1>
      
          <p>
             You have successfully registered, <strong>{registeredName}</strong>.
          </p>
        </section>
      ) : (
        <section className="signup-section">
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <h1>Sign Up</h1>
          <form onSubmit={handleSubmit} className="signup-form">
            <label htmlFor="name" className="signup-label">
              Name:
              <FontAwesomeIcon
                icon={faCheck}
                className={validName ? "valid" : "hide"}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={validName || !name ? "hide" : "invalid"}
              />
            </label>
            <input
              className="signup-input"
              type="text"
              id="name"
              ref={nameRef}
              autoComplete="off"
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
              aria-invalid={validName ? "false" : "true"}
              onFocus={() => setNameFocus(true)}
              onBlur={() => setNameFocus(false)}
            />
            <label htmlFor="email" className="signup-label">
              Email:
              <FontAwesomeIcon
                icon={faCheck}
                className={validEmail ? "valid" : "hide"}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={validEmail || !email ? "hide" : "invalid"}
              />
            </label>
            <input
              className="signup-input"
              type="email"
              id="email"
              autoComplete="off"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
              aria-invalid={validEmail ? "false" : "true"}
              onFocus={() => setEmailFocus(true)}
              onBlur={() => setEmailFocus(false)}
            />
            <label htmlFor="password" className="signup-label">
              Password:
              <FontAwesomeIcon
                icon={faCheck}
                className={validPwd ? "valid" : "hide"}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={validPwd || !password ? "hide" : "invalid"}
              />
            </label>
            <input
              className="signup-input"
              type="password"
              id="password"
              onChange={(e) => setPwd(e.target.value)}
              value={password}
              required
              aria-invalid={validPwd ? "false" : "true"}
              onFocus={() => setPwdFocus(true)}
              onBlur={() => setPwdFocus(false)}
            />
            <label htmlFor="confirm_pwd" className="signup-label">
              Confirm Password:
              <FontAwesomeIcon
                icon={faCheck}
                className={validMatch && matchPwd ? "valid" : "hide"}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={validMatch || !matchPwd ? "hide" : "invalid"}
              />
            </label>
            <input
              className="signup-input"
              type="password"
              id="confirm_pwd"
              onChange={(e) => setMatchPwd(e.target.value)}
              value={matchPwd}
              required
              aria-invalid={validMatch ? "false" : "true"}
              onFocus={() => setMatchFocus(true)}
              onBlur={() => setMatchFocus(false)}
            />
            <button
              className="signup-button"
              type="submit"
              disabled={!validName || !validEmail || !validPwd || !validMatch}
            >
              Sign Up
            </button>
          </form>
          <p className="signup-p">
            Already have an account?
            <br />
            <span className="line">
              <a href="#" className="signin-link">
                Sign In
              </a>
            </span>
          </p>
        </section>
      )}
    </>
  );
};

export default SignUp;
