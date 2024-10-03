// working code fine belwo code
import React, { useState } from 'react';
import { Sidebar as FlowbiteSidebar } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { HiMenu } from 'react-icons/hi';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col md:flex-row h-full border-r border-gray-200">
      <button
        className="md:hidden p-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        <HiMenu size={24} />
      </button>
      <FlowbiteSidebar className={`md:block ${isOpen ? 'block' : 'hidden'}`}>
        {/* <div className="flex h-full flex-col justify-between py-2"> */}
          <FlowbiteSidebar.Items>
            <FlowbiteSidebar.ItemGroup>
              <FlowbiteSidebar.Item as={Link} to="/dashboard">
                Dashboard
              </FlowbiteSidebar.Item>
              <FlowbiteSidebar.Item as={Link} to="/users">
                User Management
              </FlowbiteSidebar.Item>
              <FlowbiteSidebar.Item as={Link} to="/bookings">
                Booking Management
              </FlowbiteSidebar.Item>
              <FlowbiteSidebar.Item as={Link} to="/users">
                User Management
              </FlowbiteSidebar.Item>
              <FlowbiteSidebar.Item as={Link} to="/bookings">
                Booking Management
              </FlowbiteSidebar.Item>
              <FlowbiteSidebar.Item as={Link} to="/bookings">
                Booking Management
              </FlowbiteSidebar.Item>
              <FlowbiteSidebar.Item as={Link} to="/users">
                User Management
              </FlowbiteSidebar.Item>
              <FlowbiteSidebar.Item as={Link} to="/bookings">
                Booking Management
              </FlowbiteSidebar.Item>
              <FlowbiteSidebar.Item as={Link} to="/bookings">
                Booking Management
              </FlowbiteSidebar.Item>
              <FlowbiteSidebar.Item as={Link} to="/users">
                User Management
              </FlowbiteSidebar.Item>
              <FlowbiteSidebar.Item as={Link} to="/bookings">
                Booking Management
              </FlowbiteSidebar.Item>
              <FlowbiteSidebar.Item as={Link} to="/users">
                User Management
              </FlowbiteSidebar.Item>
              <FlowbiteSidebar.Item as={Link} to="/bookings">
                Booking Management
              </FlowbiteSidebar.Item>
            </FlowbiteSidebar.ItemGroup>
          </FlowbiteSidebar.Items>
        {/* </div> */}
        
      </FlowbiteSidebar>
    </div>
  );
};

export default Sidebar;