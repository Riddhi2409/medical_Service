import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../config";
import { toast } from 'react-toastify'
import { HashLoader } from 'react-spinners/HashLoader'
import {authContext} from '../context/AuthContext'
import axios from 'axios'
const Login = () =>{

const [formData, setFormData] = useState(
    {  email: "",
    password: "",
});

const [loading,setLoading]=useState(false);

const navigate= useNavigate();
const {dispatch} = useContext(authContext);

const handleInputChange=e=> {

setFormData({ ...formData, [e.target.name]: e.target.value });

};

const submitHandler = async event => {

    event.preventDefault();
    setLoading(true);
    try {
      console.log(formData)
      const res = await axios.post(`${BASE_URL}/auth/login`, formData);
      console.log(res);
      const message=res.data.message;
      console.log(message)
      if (!res.data.status) {
        throw new Error(message)
      }
      dispatch({
        type:'LOGIN_SUCCESS',
        payload: {
            user: res.data.data,
            token: res.data.token,
            role: res.data.role
        }
      })
      setLoading(false);
      toast.success(message)
      navigate('/home');
    } catch (err) {
      console.log(err.message)
      toast.error(err.message);
      setLoading(false);
    }
  }

return (

<section className="px-5 lg:px-0">

<div className="w-full max-w-[570px] mx-auto rounded-lg shadow-md md:p-10">

<h3 me="text-headingColor text-[22px] leading-9 font-bold mb-10">

Hello! <span className="text-primaryColor">Welcome</span> Back

</h3>
<form className="py-4 md:py-0 mt-5" onSubmit={submitHandler}>

<div className="mb-5">

<input

type="email"

placeholder="Enter Your Email"

name="email"

value={formData.email}

onChange={handleInputChange}

className="w-full px-4 py-3 border-b border-solid ☐ border-[#0066ff61] focus: outline-попе

focus: border-b-primaryColor text-[16px] leading-7text-headingColor

placeholder: text-textColor rounded-md cursor-pointer"

required
/>

</div>

<div className="mb-5">

<input

type="password"

placeholder="Password"

name="password"

value={formData.password}

onChange={handleInputChange}

className="w-full px-4 py-3 border-b border-solid ☐ border-[#0066ff61] focus: outline-none

focus: border-b-primaryColor text-[16px] leading-7 text-headingColor

placeholder:text-textColor rounded-md cursor-pointer"

required
/>

</div>
<div className="mt-7">

<button

type="submit"

className="w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-2">

{"Login"}


</button>

</div>


<p className="mt-5 text-textColor text-center">

Don&apos;t have an account?

<Link to="/register" className="text-primaryColor font-medium ml-1">

Register

</Link>

</p>

</form>

</div>

</section>

);

};

export default Login;

