import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import Landing from './Landing';
import Search from './Search';

const App = () => (
  <>
    {/* <Router> */}
        {/* <Route path="/landing" element={<Landing />} /> */}
        {/* <Route path="/search" element={<Search />} /> */}
        {/* <Route path="*" element={<Navigate to="/landing" />} /> */}
    {/* </Router> */}
    {/* <Link to="/search">Go to Search</Link> */}
    <div><p>Hello!</p></div>
  </>
);

export default App;
