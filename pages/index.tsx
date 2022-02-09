import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
const Dictaphone = dynamic(() => import('../components/Dictaphone'), { ssr: false });
const Home: NextPage = () => {
  return <Dictaphone />;
};

export default Home;
