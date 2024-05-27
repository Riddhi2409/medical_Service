import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Doctors from '../pages/Doctor/Doctors';
import DoctorDetails from '../pages/Doctor/DoctorDetails';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Contact from '../pages/Contact';
import Service from '../pages/Service';
import MyAccount from '../Dashboard/user-account/MyAccount';
import Dashboard from '../Dashboard/doctor-account/Dashboard';
import ProtectedRoute from './ProtectedRoute';
import CheckoutSuccess from '../pages/Doctor/CheckoutSuccess';
const Layouts = () => {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/home' element={<Home />} />
          <Route path='/doctors' element={<Doctors />} />
          <Route path='/doctors/:id' element={<DoctorDetails />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Signup />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/services' element={<Service />} />
          <Route path='/checkout-success' element={<CheckoutSuccess />} />
          <Route path='/users/profile/me' element={<ProtectedRoute allowedRoles={['patient']}> <MyAccount /> </ProtectedRoute>} />
          <Route path='/doctors/profile/me' element={<ProtectedRoute allowedRoles={['doctor']}><Dashboard /></ProtectedRoute>} />
        </Routes>

      </main>
      <   Footer />
    </>
  )
}

export default Layouts