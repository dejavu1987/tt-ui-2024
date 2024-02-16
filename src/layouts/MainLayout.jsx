import React from 'react';
import Header from '../components/Header/Header';

const MainLayout = ({ children }) => {
  return (
    <div className="layout layout--main">
      <Header />
      <main className="py-5" id="main">
        {children}
      </main>
      <footer>
        <div className="text-light text-center p-5">
          &copy; Copyright anil@anilmaharjan.com.np 2019
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
