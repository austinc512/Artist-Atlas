import React from 'react';
import { Routes, Route } from 'react-router';

import Navigation from './components/Navigation';
import Body from './components/Body';

const Router = () => {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<Body />} />
      </Routes>
    </>
  );
};

export default Router;
