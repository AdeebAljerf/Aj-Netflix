import Logo from "./Logo";
import "../../css/Nav.css";
//? --------------------------NAV---------------------------------------
export default function NavBar({ children }) {
  return (
    <>
      <header className="container">
        <div className="nav-bar">
          <Logo></Logo>
          {children}
        </div>
      </header>
    </>
  );
}
