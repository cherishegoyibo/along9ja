export default function Navbar() {
  return (
    <header>
      <div className="primary-header">
        <div className="header-logo">
          <a href="#">
            <img
              src="./images/along9ja.png"
              alt="Along9ja logo"
              width="160"
              height="60"
            />
          </a>
        </div>

        <label htmlFor="check" className="open-menu">
          <i className="fa-solid fa-bars"></i>
        </label>
        <nav>
          <label htmlFor="check" className="close-menu">
            <i className="fa-solid fa-xmark"></i>
          </label>
          <ul className="nav-bar">
            <input type="checkbox" id="check" />
            <li className="nav-item">
              <a href="/" className="nav-link">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a href="/explore-routes" className="nav-link">
                Explore Routes
              </a>
            </li>
            <li className="nav-item">
              <a href="/nearby-buses" className="nav-link">
                Nearby Buses
              </a>
            </li>
            <li className="nav-item">
              <a href="/saved-places" className="nav-link">
                Saved Places
              </a>
            </li>
            <li className="nav-item">
              <a href="/about-us" className="nav-link">
                About Us
              </a>
            </li>
            <button className="nav-item" type="button">
              <a href="/sign-in" className="nav-link">
                Sign Up
                <i className="fa-solid arrow fa-arrow-right-to-bracket"></i>
              </a>
            </button>
          </ul>
        </nav>
      </div>
    </header>
  );
}
