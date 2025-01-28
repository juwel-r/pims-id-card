import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Shared/Navbar';

const MainLayout = () => {
    return (
        <div>
            <Navbar></Navbar>
            <div className='mt-16'>
            <Outlet></Outlet>
            </div>
        </div>
    );
};

export default MainLayout;