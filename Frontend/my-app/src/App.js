import React from 'react';
import { useState,useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
// import HomePage from './pages/HomePage';
import Job from './pages/Job';
// import News from './pages/News';



function App() {
  return (
    <div>
      <Routes>
        {/* <Route path = "/" element={<HomePage/>}/> */}
        <Route path = "/job" element = {<Job/>}/>
        {/* <Route path = "/news" element = {<News/>}/> */}
      </Routes>
    </div>
  );
}

export default App;
