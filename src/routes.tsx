
import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';

import Home from './pages/Home';
import Drop from './pages/Drop';
import ListCombo from './pages/ListCombo';
import ListProduts from './pages/ListProduts';

const RoutesCustomer = () => {
    return (
        <BrowserRouter>
        <Routes>
          <Route element={<Home />} path="/" />
          <Route element={<Drop />} path="/drop"/>
          <Route element={<ListProduts />} path="/ListProduts"/>
          <Route element={<ListCombo />} path="/ListCombo"/>
        </Routes>
      </BrowserRouter>
    );
}

export default RoutesCustomer;