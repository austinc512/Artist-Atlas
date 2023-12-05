import React from 'react';
import Logo from '../img/treble_clef_3.png';
import { useNavigate } from 'react-router-dom';

const Navigation = () => {
  const navigate = useNavigate();
  return (
    <div className="nav">
      <div
        className="logo"
        onClick={() => {
          navigate('/');
        }}
      >
        <img src={Logo} alt="nav bar treble clef" id="nav-logo" />
        <h4>Artist Atlas</h4>
      </div>
    </div>
  );
};

export default Navigation;
