import React, { useState } from "react";
import Explore from "./Explore";
import Map from "./Map";
//import Usage from "./Usage";
import "./tabs.css";

function Sidebar() {
  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };
  return (
    <div className="flex flex-row">
      <div className="bg-gray-200 w-[30%] shadow-lg">
        <div className="flex flex-col relative">
          <div className="justify-evenly text-2xl p-2 flex text-center relative">
            <div className="">
              <button>
                Settings
              </button>
            </div>
          </div>
          <div>
            {/* <div className={toggleState === 1 ? "" : "hidden"}>
              <Usage />
            </div> */}
            <div className={toggleState === 1 ? "" : "hidden"}>
              <Explore />
            </div>
          </div>
        </div>
      </div>
      <div className=" w-[70%]">
        <Map />
      </div>
    </div>
  );
}

export default Sidebar;
