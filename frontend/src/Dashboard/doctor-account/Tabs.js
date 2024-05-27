import {useContext ,useRef} from "react";
import { BiMenu } from "react-icons/bi";
import { authContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
const Tabs = ({ tab, setTab }) => {
  const { dispatch } = useContext(authContext);
  const navigate=useNavigate();
    const handleLogout = () => {
        dispatch({ type: "LOGOUT" });
        navigate('/')
    }
    const tabRef=useRef(null)
    const tabToggler = () => {
      tabRef.current.classList.toggle('show_menu')
  }
  return (
    <div>
      <span className="lg:hidden" onClick={tabToggler}>
        <BiMenu className="w-6 h-6 cursor-pointer" />
      </span>
      <div className="hidden lg:flex flex-col p-[30px] bg-white shadow-panelShadow items-center h-max rounded-md " ref={tabRef} onClick={tabToggler}>
        <button
          className={`${tab === "overview" ? " bg-indigo-100 text-primaryColor" : "bg-transparent text-headingColor"} w-full btn rounded-md hover:bg-blue-400 hover:text-white mt-5`}
          onClick={() => setTab("overview")}
        >
          Overview
        </button>
        <button
          className={`${tab === "appointments" ? " bg-indigo-100 text-primaryColor" : "bg-transparent text-headingColor"} w-full btn mt-5 rounded-md hover:bg-blue-400 hover:text-white `}
          onClick={() => setTab("appointments")}
        >
          Appointments
        </button>
        <button
          className={`${tab === "profile" ? " bg-indigo-100 text-primaryColor" : "bg-transparent text-headingColor"} w-full btn mt-5 rounded-md hover:bg-blue-400 hover:text-white`}
          onClick={() => setTab("profile")}
        >
          Profile
        </button>
        <div className="mt-5 w-full">
                            <button className="w-full bg-[#181A1E] hover:bg-black p-3 text-[16px] leading-7 rounded-md text-white" onClick={handleLogout}>
                                Logout
                            </button>
                            <button className="w-full bg-red-600 hover:bg-red-800 mt-4 p-3 text-[16px] leading-7 rounded-md text-white">
                                Delete account
                            </button>
                        </div>
      </div>
    </div >

  );

};

export default Tabs;