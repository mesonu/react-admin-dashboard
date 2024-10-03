

"use client";

import { Footer } from "flowbite-react";

export default function Component() {
  return (
    <Footer container>
      <Footer.Copyright href="#" by="Flowbite™" year={2022} />
      <Footer.LinkGroup>
        <Footer.Link href="#">About</Footer.Link>
        <Footer.Link href="#">Privacy Policy</Footer.Link>
        <Footer.Link href="#">Licensing</Footer.Link>
        <Footer.Link href="#">Contact</Footer.Link>
      </Footer.LinkGroup>
    </Footer>
  );
}

// import React from 'react';
// import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';

// const Footer = () => {
//   return (
//     <footer className="bg-white dark:border-gray-700 dark:bg-gray-800 text-black py-4 rounded">
//       <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
//         <div className="text-center md:text-left mb-4 md:mb-0">
//           <p>&copy; {new Date().getFullYear()} My Website. All rights reserved.</p>
//         </div>
//         <div className="flex space-x-4">
//           <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
//             <FaFacebook className="text-2xl" />
//           </a>
//           <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
//             <FaTwitter className="text-2xl" />
//           </a>
//           <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
//             <FaLinkedin className="text-2xl" />
//           </a>
//           <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
//             <FaInstagram className="text-2xl" />
//           </a>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;