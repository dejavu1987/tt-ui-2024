import Header from "../components/Header/Header";

const MainLayout = ({ children }) => {
  return (
    <div className="layout layout--main">
      <Header />
      <main id="main">{children}</main>
      <footer>
        <div className="text-white text-center p-5">
          &copy; Copyright anil@anilmaharjan.com.np 2019
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
