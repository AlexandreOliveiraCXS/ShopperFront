
import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';

import Drop from './pages/Drop';

const RoutesCustomer = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Drop />} path="/" />
            </Routes>
        </BrowserRouter>
    );
}

export default RoutesCustomer;