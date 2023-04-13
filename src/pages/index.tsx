import React from 'react';
import Head from 'next/head';
import { useSelector, useDispatch } from 'react-redux';

type PropsType = {
  count: number;
}

type Props = {
  props: PropsType;
}

const Home: React.FC<Props> = ({ props }) => {
  // const textFromRd = useSelector((state) => state.text.value);
  const dispatch = useDispatch();

  const textArr: string[] = ['Welcome to Web Profile.', 'I\'m HeroPhumiphat', 'I would like to be Developer.'];

  const [text, setText] = React.useState<string>(' ');

  React.useEffect(() => {

}, [])

  return (
    <div>
      <Head>
        <title>หน้าหลัก | HeroPhumiphat</title>
      </Head>
      <main>
        <div className='w-full mt-20 text-center'>
          <h1 className='text-4xl'><span className='text-blue-400'>Hi!,</span>  {text}</h1>
        </div>
      </main>
    </div>
  )
}

export default Home;
