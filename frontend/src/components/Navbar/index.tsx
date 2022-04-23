import { Fragment } from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({
  name,
  setName,
}: {
  name: string;
  setName: (name: string) => void;
}) => {
  const onLogout = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/logout`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      await response.json();
      setName('');
    } catch (error: any) {
      console.log(error.message);
    }
  };

  let menu = (
    <ul className="navbar-nav me-auto mb-2 mb-md-0">
      <li className="nav-item">
        <Link
          className="nav-link active"
          aria-current="page"
          to="/login"
          onClick={onLogout}>
          Logout
        </Link>
      </li>
    </ul>
  );
  if (!name) {
    menu = (
      <ul className="navbar-nav me-auto mb-2 mb-md-0">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/login">
            Login
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/register">
            Register
          </Link>
        </li>
      </ul>
    );
  }
  return (
    <Fragment>
      <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Home
          </Link>

          <div id="navbarCollapse">{menu}</div>
        </div>
      </nav>
    </Fragment>
  );
};

export default Navbar;
