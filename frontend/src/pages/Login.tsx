import { Fragment, SyntheticEvent, useState } from 'react';
import { Navigate } from 'react-router-dom';

const Login = ({ setName }: { setName: (name: string) => void }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRedirect, setIsRedirect] = useState(false);

  const onSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:5000/api/login`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      setIsRedirect(true);
      setName(data.name);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  if (isRedirect) {
    return <Navigate replace to={'/'} />;
  }

  return (
    <Fragment>
      <form onSubmit={onSubmit}>
        <img
          className="mb-4"
          src="https://getbootstrap.com/docs/5.1/assets/brand/bootstrap-logo.svg"
          alt="logo"
          width={72}
          height={57}
        />
        <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
        <div className="form-floating">
          <input
            required
            type="email"
            className="form-control"
            id="floatingInput"
            placeholder="name@example.com"
            onChange={(e) => setEmail(e.currentTarget.value)}
          />
          <label htmlFor="floatingInput">Email address</label>
        </div>
        <div className="form-floating">
          <input
            required
            type="password"
            className="form-control"
            id="floatingPassword"
            placeholder="Password"
            onChange={(e) => setPassword(e.currentTarget.value)}
          />
          <label htmlFor="floatingPassword">Password</label>
        </div>
        <button className="w-100 btn btn-lg btn-primary" type="submit">
          Sign in
        </button>
      </form>
    </Fragment>
  );
};

export default Login;
