import React from 'react';
import { useState,useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Job from './pages/Job';
import News from './pages/News';
import StrongIndicators from './pages/StrongIndicators';
import BuyCoins from './pages/BuyCoin';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();


function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path = "/" element={<HomePage/>}/>
        <Route path = "/job" element = {<Job/>}/>
        <Route path = "/news" element = {<News/>}/>
        <Route path = "/indicators" element = {<StrongIndicators/>}/>
        <Route path = "/buycoins" element = {<BuyCoins/>}/>
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
