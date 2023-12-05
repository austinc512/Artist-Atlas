import React from 'react';
// import Navigation from "./components/Navigation";
import './App.css';
import Router from './Router';
import { BrowserRouter } from 'react-router-dom';
// import { Provider } from 'react-redux'; // remember Redux
// import store from './redux/store';

function App() {
  return (
    <BrowserRouter>
      {/* <Navigation /> */}
      <Router />
    </BrowserRouter>
  );
}

export default App;
