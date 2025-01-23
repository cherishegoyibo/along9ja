import React from "react";
import "../styles/along9ja.css";

export default function Services() {
  let message = `Along9ja App is a mobile and web-based application designed to solve navigation challenges for public transport passengers in Nigerian cities. The app provides detailed, crowdsourced directions for getting from point A to B via public transportation. With features like route recommendations, safety alerts, real-time updates, and AI-powered personalized suggestions, this platform enhances urban mobility while prioritizing user safety and convenience.

`;
  return (
    <>
      <main className="">
        <div className="section-title-wrapper">
          <h1>About Us</h1>
          <p className="section-subtitle">{message}</p>
          <span>
            <br />
            <h3>WHY?</h3>
            <p>
              Navigating public transport in Nigeria can be challenging, leaving
              passengers confused, lost, or at risk. Our platform bridges this
              gap by providing reliable, crowdsourced directions and safety
              tips, making travel safer and more convenient.
            </p>
          </span>
          <span>
            <br />
            <h3>MISSION</h3>
            <p>
              To empower public transport passengers with accurate, real-time
              navigation and safety information, fostering a seamless and secure
              commuting experience.
            </p>
          </span>
          <span>
            <br />
            <h3>VISION</h3>
            <p>
              To be the go-to platform for public transport navigation,
              transforming the way people travel in Nigeria and beyond.
            </p>
          </span>
          <span>
            <br />
            <h3>OUR STORY</h3>
            <p>
              Born out of the frustration of navigating public transport without
              reliable guidance, we envisioned a solution that would combine the
              power of technology, AI, and community contributions to simplify
              travel for everyone. <br /> We focus on the unique challenges of
              public transport in emerging markets, leveraging crowdsourcing to
              deliver personalized, locally relevant, and safety-conscious
              navigation solutions.
            </p>
          </span>
          <br />
          <h1>The Team Behind Along9ja</h1>
        </div>

        <div className="global-container">
          <div className="team-container">
            <div className="team-item">
              <img src="/images/Cherish.jpg" className="team-img" alt="pic" />

              <h3>CHERISH IBEH</h3>

              <div className="team-info"></div>

              <p>Frontend Engineer</p>

              <ul className="team-icon">
                <li>
                  <a href="#" className="twitter">
                    <i className="fa fa-twitter"></i>
                  </a>
                </li>

                <li>
                  <a
                    href="https://github.com/cherishegoyibo"
                    className="github"
                  >
                    <i className="fa fa-github"></i>
                  </a>
                </li>

                <li>
                  <a href="#" className="linkedIn">
                    <i className="fa fa-linkedin"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="team-container">
            <div className="team-item">
              <img src="/images/Mathias.jpg" className="team-img" alt="pic" />

              <h3>MATHIAS MARTINS</h3>

              <div className="team-info"></div>

              <p>Frontend Engineer</p>

              <ul className="team-icon">
                <li>
                  <a
                    href="https://twitter.com/montybasquiart"
                    className="twitter"
                  >
                    <i className="fa fa-twitter"></i>
                  </a>
                </li>

                <li>
                  <a
                    href="https://github.com/montybasquiart"
                    className="github"
                  >
                    <i className="fa fa-github"></i>
                  </a>
                </li>

                <li>
                  <a
                    href="https://www.linkedin.com/in/mathias-martins-agtctwd07/"
                    className="linkedIn"
                  >
                    <i className="fa fa-linkedin"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="team-container">
            <div className="team-item">
              <img src="/images/Femi.jpg" className="team-img" alt="pic" />

              <h3>MEHALAYESE FEMI</h3>

              <div className="team-info"></div>

              <p>Backend Engineer</p>

              <ul className="team-icon">
                <li>
                  <a href="#" className="twitter">
                    <i className="fa fa-twitter"></i>
                  </a>
                </li>

                <li>
                  <a href="https://github.com/megafemworld" className="github">
                    <i className="fa fa-github"></i>
                  </a>
                </li>

                <li>
                  <a href="#" className="linkedIn">
                    <i className="fa fa-linkedin"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="team-container">
            <div className="team-item">
              <img src="/images/Eben.jpg" className="team-img" alt="pic" />

              <h3>EBENEZER OSIGWE</h3>

              <div className="team-info"></div>

              <p>Backend Engineer</p>

              <ul className="team-icon">
                <li>
                  <a href="#" className="twitter">
                    <i className="fa fa-twitter"></i>
                  </a>
                </li>

                <li>
                  <a href="hhttps://github.com/Ebnen" className="github">
                    <i className="fa fa-github"></i>
                  </a>
                </li>

                <li>
                  <a href="#" className="linkedIn">
                    <i className="fa fa-linkedin"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
