import React from 'react';
import './MenuBar.css';
const MenuBar = () => {
      return (
            <div>
                  <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-2">
                        <a className="navbar-brand" href="#">
                              <img
                                    src="https://www.svgrepo.com/show/303109/adobe-xd-logo.svg"
                                    alt="Logo"
                                    height="40"
                              />
                        </a>
                        <button
                              className="navbar-toggler"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target="#navbarNav"
                              aria-controls="navbarNav"
                              aria-expanded="false"
                              aria-label="Toggle navigation"
                        >
                              <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse p-2" id="navbarNav">
                              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                    <li className="nav-item">
                                          <a className="nav-link active" aria-current="page" href="#">
                                                Dashboard
                                          </a>
                                    </li>
                                    <li className="nav-item">
                                          <a className="nav-link" href="#">
                                                Explore
                                          </a>
                                    </li>
                                    <li className="nav-item">
                                          <a className="nav-link" href="#">
                                                Manage Items
                                          </a>
                                    </li>
                                    <li className="nav-item">
                                          <a className="nav-link" href="#">
                                                Manage Categories
                                          </a>
                                    </li>
                                    <li className="nav-item">
                                          <a className="nav-link" href="#">
                                                Manage Users
                                          </a>
                                    </li>
                              </ul>
                              {/* Add Dropdown for more options */}
                        </div>
                  </nav>
            </div>
      );
};

export default MenuBar;
