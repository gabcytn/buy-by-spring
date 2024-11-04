import { useState } from "react";

type PropTypes = {
  handleSearch?: (e: React.FormEvent, keyword: string) => void;
};
function Header({ handleSearch }: PropTypes) {
  const [search, setSearch] = useState("");
  return (
    <header
      className="bg-dark"
      style={{ minHeight: "5.5rem", display: "flex", alignItems: "center" }}
    >
      <div className="container">
        <nav className="navbar navbar-expand-lg bg-dark text-light">
          <div className="container-fluid">
            <a className="text-light navbar-brand" href="/">
              ToyCommerce
            </a>
            <ul className="navbar-nav">
              <li className="nav-item">
                <a
                  className="nav-link text-light active"
                  aria-current="page"
                  href="/home"
                >
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="text-light nav-link" href="/product/create">
                  Add Product
                </a>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="text-light nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Categories
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href="#">
                      Action
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Another action
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Something else here
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
            <form
              className="d-flex"
              role="search"
              onSubmit={
                handleSearch
                  ? (e) => {
                      handleSearch(e, search);
                    }
                  : undefined
              }
            >
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                id="search"
                name="search"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
              <button className="btn btn-success" type="submit">
                Search
              </button>
            </form>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;
