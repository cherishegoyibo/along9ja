import React from "react";
import "../styles/team.css";
import "../styles/along9ja.css";

export default function Teams() {
  return (
    <>
      <main className="hero">
        <div className="hero-text">
          <h1 className="heading">About Us</h1>
          <p className="p-text-two">
            Along9ja App is a mobile and web-based application designed to solve
            navigation challenges for public transport passengers in Nigerian
            cities. The app provides detailed, crowdsourced directions for
            getting from point A to B via public transportation. With features
            like route recommendations, safety alerts, real-time updates, and
            AI-powered personalized suggestions, this platform enhances urban
            mobility while prioritizing user safety and convenience.
          </p>
          <button>
            <a href="#">CONTACT US</a>
          </button>
        </div>
      </main>

      <div className="main-row">
        <div>
          <div>
            <h2>Why We Started Along9ja?</h2>
            <br />
          </div>
          <p className="p-text">
            Born out of the frustration of navigating public transport without
            reliable guidance, <br />
            we envisioned a solution that would combine the power of technology,
            AI, and community contributions to simplify travel for everyone.{" "}
            <br /> We focus on the unique challenges of public transport in
            emerging markets, <br />
            leveraging crowdsourcing to deliver personalized, locally relevant,
            and safety-conscious navigation solutions.
          </p>
          <button>
            <a href="/">Learn More</a>
          </button>
        </div>
      </div>
      <br />
      <br />
      <div className="team-row">
        <div className="left">
          <img
            className="image-side"
            src="/images/pexels-daniel-sikpi-191282566-11390779.jpg"
            alt="Why"
          />
        </div>

        <div className="right">
          <div className="text-content">
            <h2 className="heading-3">What Makes Us Unique</h2>
            <p className="p-text">
              We focus on the unique challenges of public transport in emerging
              markets, leveraging crowdsourcing to deliver personalized, locally
              relevant, and safety-conscious navigation solutions.
            </p>
            <button>
              <a href="/#">Learn More</a>
            </button>
          </div>
        </div>
      </div>

      {/* Section two */}
      <br />
      <br />

      <div className="team-row">
        <div className="right">
          <div className="text-content">
            <span>
              <br />
              <h2>MISSION</h2>
              <p>
                To empower public transport passengers with accurate, real-time
                navigation and safety information, fostering a seamless and
                secure commuting experience.
              </p>
            </span>
            <span>
              <br />
              <h2>VISION</h2>
              <p>
                To be the go-to platform for public transport navigation,
                transforming the way people travel in Nigeria and beyond.
              </p>
            </span>
          </div>
        </div>
        <div className="left">
          <img
            className="image-side"
            src="/images/pexels-david-iloba-28486424-15183533.jpg"
            alt=""
          />
        </div>
      </div>

      {/* Section Two*/}

      {/* Who We Are*/}

      <section className="Team-a">
        <h2 className="who">WHO WE ARE</h2>
        <br />
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
      </section>
    </>
  );
}
