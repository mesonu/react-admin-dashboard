import React from 'react';
import TopNavBar from './TopNavBar';
import Footer from './Footer';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
  return (
    <>
      <TopNavBar />
      <div className="flex items-start pt-16 h-screen bg-gray-100">
        <Sidebar/>
        <div className="flex flex-col flex-1">
          <main className="flex-1 p-4 overflow-y-auto">
            {children}
            <Footer />
          </main>
          
        </div>
      </div>
    </>
  );
};

export default Layout;

// // import React from 'react';
// // import Sidebar from './Sidebar';
// // import TopNavBar from './TopNavBar';
// // import Footer from './Footer';
// // const Layout = ({ children }) => {
// //   return (
// //     <div className="flex flex-col md:flex-row h-screen bg-gray-100">
// //       <Sidebar />
// //       <div className="flex flex-col flex-1">
// //         <TopNavBar />
// //         <main className="flex-1 p-4 overflow-y-auto">
// //           {children}
// //           <Footer/>
// //         </main>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Layout;