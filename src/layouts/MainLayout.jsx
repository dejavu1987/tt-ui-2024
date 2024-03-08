import MainMenu from "../components/MainMenu/MainMenu";

const MainLayout = ({ children }) => {
  return (
    <div className="layout layout--main">
      <MainMenu />
      <main id="main">{children}</main>
    </div>
  );
};

export default MainLayout;
