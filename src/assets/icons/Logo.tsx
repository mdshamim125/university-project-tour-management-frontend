import { Link } from "react-router";
import logo from "../images/tour.png";

const Logo = () => {
  return (
    <Link
      to="/"
      className="flex justify-center text-blue-600 items-center font-bold text-2xl"
    >
      <img src={logo} className="h-24 w-28 rounded-full pt-6 p-4" alt="logo-image" />
    </Link>
  );
};

export default Logo;
