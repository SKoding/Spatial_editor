import React from "react"
//import { Close } from '@material-ui/icons'
import { Link } from 'react-router-dom'
import CloseOutlined from "@mui/icons-material/CloseOutlined";

function MenuItems({showMenu,active}) {
  return (
    <ul
      className={
        active
          ? "flex-col flex items-center fixed inset-0 left-1/4 uppercase bg-black/40 backdrop-blur-lg gap-8 justify-center p-8 md:hidden"
          : "hidden"
      }
    >
      <CloseOutlined onClick={showMenu} className="cursor-pointer" />
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/">Testimonials</Link>
      </li>
      <li>
        <Link to="/">Information</Link>
      </li>
      <li>
        <Link to="/">Jobs</Link>
      </li>
      <li>
        <Link to="/">About</Link>
      </li>
      <li>
        <Link to="/">Contact</Link>
      </li>
    </ul>
  );
}

export default MenuItems;
