import React from 'react';
import { TailSpin } from 'react-loader-spinner'; // Example loader component from 'react-loader-spinner'

const Loader = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <TailSpin color="#00BFFF" height={80} width={80} />
    </div>
  );
};

export default Loader;
