import React from "react";

export default function SocialLogin() {
  return (
    <section className="social-login">
      <div>
        <button className="social-button">
          <img src="alx.svg" alt="ALX" className="social-icon" />
          ALX
        </button>
        <button className="social-button">
          <img src="googl.svg" alt="Google" className="social-icon" />
          Google
        </button>
      </div>
    </section>
  );
}
