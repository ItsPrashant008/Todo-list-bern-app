import React, { useState, useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";

export const NavBar = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to="/">
          Home
        </Link>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/create-task">
                Create Task
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/update-task/1">
                Update Task
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/delete-task/1">
                Delete Task
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/view-tasks">
                View Task
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/viewAll-tasks">
                View All Tasks
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/viewUser-tasks">
                View User Tasks
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};
