import { Component, FormEvent, Fragment, SyntheticEvent } from 'react';
import { withRouter, WithRouterProps } from '../hooks/withRouter';

type State = {
  name: string;
  email: string;
  password: string;
};

class Register extends Component<WithRouterProps, State> {
  constructor(props: WithRouterProps) {
    super(props);

    this.state = {
      name: '',
      email: '',
      password: '',
    };
  }

  onSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    const { name, email, password } = this.state;
    const { navigate } = this.props;

    try {
      const raw = await fetch(`http://localhost:5000/api/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });
      await raw.json();

      navigate('/login');
    } catch (error: any) {
      console.log(error.message);
    }
  };

  onChange = (e: FormEvent<HTMLInputElement>) => {
    const targetName = e.currentTarget.name as any;
    const targetValue = e.currentTarget.value;
    this.setState({
      [targetName]: targetValue,
    } as Pick<State, keyof State>);
  };

  render() {
    const { name, email, password } = this.state;

    return (
      <Fragment>
        <form onSubmit={this.onSubmit}>
          <img
            className="mb-4"
            src="https://getbootstrap.com/docs/5.1/assets/brand/bootstrap-logo.svg"
            alt="logo"
            width={72}
            height={57}
          />

          <h1 className="h3 mb-3 fw-normal">Please register</h1>

          <div className="form-floating">
            <input
              required
              type="text"
              className="form-control"
              id="floatingName"
              placeholder="Name"
              name="name"
              value={name}
              onChange={this.onChange}
            />
            <label htmlFor="floatingName">Name</label>
          </div>

          <div className="form-floating">
            <input
              required
              type="email"
              className="form-control"
              id="floatingEmail"
              placeholder="name@example.com"
              name="email"
              value={email}
              onChange={this.onChange}
            />
            <label htmlFor="floatingEmail">Email address</label>
          </div>

          <div className="form-floating">
            <input
              required
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
              name="password"
              value={password}
              onChange={this.onChange}
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>

          <button className="w-100 btn btn-lg btn-primary" type="submit">
            Submit
          </button>
        </form>
      </Fragment>
    );
  }
}

export default withRouter(Register);
