import React, { Component } from 'react';
import {Link} from 'react-router-dom';

function Home() {
  return(
    <div className="home-container">
      <h1>Github War: Battle your collegues...</h1>
      <Link className='button' to='/battle'>Start War</Link>
    </div>
  )
}

export default Home;