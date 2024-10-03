
import React from 'react';
import { Navbar } from 'flowbite-react';
import LogoutButton from './LogoutButton';

const TopNavBar = () => {
  return (
    <Navbar fluid={true} rounded={true} className='fixed z-30 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700'>
      <Navbar.Brand href="/dashboard">
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Admin Dashboard
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        <LogoutButton />
      </div>
    </Navbar>
  );
};

export default TopNavBar;