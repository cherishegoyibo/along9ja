import React from "react";
import { useRef, useState, useEffect } from "react";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Navbar from "../Components/Navbar";

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PWD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+]).{8,24}$/;

export default function SignIn() {
  const emailRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    console.log(result);
    console.log(email);
    setValidEmail(result);
  }, [email]);

  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    console.log(result);
    console.log(pwd);
    setValidPwd(result);
    const match = pwd === matchPwd;
    setValidMatch(match);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [email, pwd, matchPwd]);

  return (
    <>
      <section className="signin">
        <p
          ref={errRef}
          className={errMsg ? "errmsg" : "offscreen"}
          aria-alive="assertive"
        >
          {errMsg}
        </p>
        <h1> Sign Up</h1>
        <form>
          <label htmlFor="user-email">
            Email:
            <span className={validEmail ? "valid" : "hide"}>
              <FontAwesomeIcon icon={faCheck} />
            </span>
            <span className={validEmail || !email ? "hide" : "invalid"}>
              <FontAwesomeIcon icon={faTimes} />
            </span>
          </label>
          <input
            type="text"
            id="user-email"
            ref={emailRef}
            autoComplete="off"
            onChange={(e) => setEmail(e.target.value)}
            required
            aria-invalid={validEmail ? "false" : "true"}
            aria-describedby="uidnote"
            onFocus={() => setEmailFocus(true)}
            onBlur={() => setEmailFocus(false)}
          />
          <p
            id="uidnote"
            className={
              userFocus && email && !validEmail ? "instructions" : "offscreen"
            }
          >
            <FontAwesomeIcon icon={faInfoCircle} />
            a to 24 characters.
            <br />
            Must begin with a letter.
            <br />
            Letters, numbers underscores, hyphens allowed.
          </p>
        </form>
      </section>
    </>
  );
}
