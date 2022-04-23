import { Fragment } from 'react';

const Home = ({ name }: { name: string }) => {
  return (
    <Fragment>{`${name ? `Hi ${name}` : 'You are not logged in'}`}</Fragment>
  );
};

export default Home;
