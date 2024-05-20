import React from "react";
const Header = () => {
  return (
    <div>
      <nav className="nav">
        <div className="nav-left">
          <a className="brand" href="#">
            All Tasks
          </a>
        </div>
        <div className="nav-right">
          <div className="tabs">
            <a href="#">Task Management Tool</a>
          </div>
        </div>
      </nav>
    </div>
  );
};
export default Header;
