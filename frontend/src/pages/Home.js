import React from 'react';
import {Link} from 'react-router-dom'

import icon1 from '../assets/images/icon01.png';
import icon2 from '../assets/images/icon02.png';
import icon3 from '../assets/images/icon03.png';

import heroImage1 from '../assets/images/hero-img01.png';
import heroImage2 from '../assets/images/hero-img02.png';
import heroImage3 from '../assets/images/hero-img03.png';
import featureImg from '../assets/images/feature-img.png'
import avatarIcon from '../assets/images/avatar-icon.png';
import videoIcon from '../assets/images/video-icon.png';
import faqIcon from '../assets/images/faq-img.png';

import { IoMdArrowRoundForward } from "react-icons/io";
import About from '../components/About';
import ServiceList from '../components/ServiceList';
import DoctorCard from '../components/DoctorCard';
import DoctorList from '../components/DoctorList';
import FaqList from '../components/FaqList';


const Home = () => {
  return (
    <>
      <section className='hero_section pt-[60px] 2xl:h-[800px]'>
        <div className='container'>
          <div className='flex flex-col lg:flex-row items-center justify-between'>
            <div>
              <div className='lg:w-[550px]'>
                <h1 className='text-[36px] text-headingColor font-[800] md:text-[60px] leading-[60px]'>We help patients live a healthy, longer life</h1>
                <p className='text_para'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
                <button className=' bg-primaryColor text-white px-4 py-2 rounded-3xl mt-2 font-[700] '>Request an Appointment</button>
              </div>
              <div className='flex lg:flex-row flex-col  lg:items-center gap-5 lg:gap-[30px] mt-[20px]'>
                <div>
                  <h2 className='text-[36px] lg:text-[45px] leading-[56px] lg:leading-[54px] font-[700] text-headingColor '>15+</h2>
                  <span className='w-[100px] h-2 bg-yellowColor rounded-full block mt-[-10px]'></span>
                  <p className='text_para'>Years of Experience</p>
                </div>
                <div>
                  <h2 className='text-[36px] lg:text-[45px] leading-[56px] lg:leading-[54px] font-[700] text-headingColor '>30+</h2>
                  <span className='w-[100px] h-2 bg-purpleColor rounded-full block mt-[-10px]'></span>
                  <p className='text_para'>Clinic Location</p>
                </div>
                <div>
                  <h2 className='text-[36px] lg:text-[45px] leading-[56px] lg:leading-[54px] font-[700] text-headingColor '>100%</h2>
                  <span className='w-[100px] h-2 bg-irisBlueColor rounded-full block mt-[-10px]'></span>
                  <p className='text_para'>patient Statisfaction</p>
                </div>
              </div>
            </div>
            <div className='flex gap-[30px] justify-end'>
              <div>
                <img src={heroImage1} alt='' className='w-full       '/>
              </div>
              <div className='mt-[20px]'>
                <img src={heroImage2} alt='' className='w-full mb-[20px]'/>
                <img src={heroImage3} alt='' className='w-full'/>
              </div>
            </div>

          </div>

        </div>
      </section>
      <section>
        <div className='container'>
          <div className='lg:w-[470px] mx-auto'>
            <h1 className='heading text-center'>Providing the best medical services</h1>
            <p className='text_para text-center'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore </p> 
          </div>
          <div className='grid md:grid-cols-3 grid-cols-1 items-center justify-center gap-4 mt-[10px] lg:mt-[55px] '>
            <div className='py-[30px] px-5'>
              <div className='flex items-center justify-center'>
                <img src={icon1} alt="" />
              </div>
              <div>
                <h2 className='text-[26px] leading-9 text-headingColor font-[700] text-center'>Find a Doctor</h2>
                <p className='text-[16px] leading-7 text-textColor font-[400] mt-4 text-center' >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore 
                </p>
                <Link to='/doctors' className='w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] mt-[30px] mx-auto flex items-center justify-center group hover:bg-primaryColor hover:border-none'>
                <IoMdArrowRoundForward />
                </Link>
              </div>
            </div>
            <div className='py-[30px] px-5'>
              <div className='flex items-center justify-center'>
                <img src={icon2} alt="" />
              </div>
              <div>
                <h2 className='text-[26px] leading-9 text-headingColor font-[700] text-center'>Find a Location</h2>
                <p className='text-[16px] leading-7 text-textColor font-[400] mt-4 text-center' >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore 
                </p>
                <Link to='/doctors' className='w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] mt-[30px] mx-auto flex items-center justify-center group hover:bg-primaryColor hover:border-none'>
                <IoMdArrowRoundForward />
                </Link>
              </div>
            </div>
            <div className='py-[30px] px-5'>
              <div className='flex items-center justify-center'>
                <img src={icon3} alt="" />
              </div>
              <div>
                <h2 className='text-[26px] leading-9 text-headingColor font-[700] text-center'>Book Appointment</h2>
                <p className='text-[16px] leading-7 text-textColor font-[400] mt-4 text-center' >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore 
                </p>
                <Link to='/doctors' className='w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] mt-[30px] mx-auto flex items-center justify-center group hover:bg-primaryColor hover:border-none'>
                <IoMdArrowRoundForward />
                </Link>
              </div>
            </div>
          </div>

        </div>
        
      </section>
      <About />
      <section>
        <div className='container'>
        <div className='lg:w-[470px] mx-auto'>
            <h1 className='heading text-center'>Our medical services</h1>
            <p className='text_para text-center'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore </p> 
          </div>
        </div>
        <ServiceList />
      </section>
      <section>
        <div className='container'>
          <div className='flex items-center justify-between flex-col lg:flex-row'>
            <div className='xl:w-[670px]'>
              <h2 className='heading'>
                Get virtual treatment <br /> anytime.
              </h2>
              <ul className='pl-4'>
                <li className='text_para'>
                  1.Schedule the appointment directly
                </li>
                <li className='text_para'>
                  2. Search for your physician here, and contact their office
                </li>
                <li className='text_para'>
                  3. view our physicians who are accepting new patients, use the online scheduling tool to select an appointment time.
                </li>
              </ul>
              <button className='btn'>Learn More</button>
            </div>
          <div className="relative z-10 xl:w-[770px] flex justify-end mt-[50px] 1g:mt-0">
            <img src={featureImg} className="w-3/4" alt="" />

            <div className="w-[150px] lg:w-[248px] bg-white absolute bottom-[50px] left-0 md:bottom-[50px] md:left-5 z-20 p-2 pb-3 lg:pt-4 lg:px-4 lg:pb-[26px] rounded-[10px]">
              <div className="flex items-center justify-between">
                <div className='flex items-center gap-[6px] lg:gap-3'>
                  <p className='text-[10px] leading-[10px] lg:text-[14px] lg:leading-5 text-headingColor font-600'>
                    Tue 24
                  </p>
                  <p className='text-[10px] leading-[10px] lg:text-[14px] lg:leading-5 font-600 text-textColor'>
                    10:00 AM
                  </p>
                </div>
                <span className='w-5 h-5 lg:w-[34px] lg:h-[34px]
                 font-600 bg-yellowColor rounded py-1 px-[6px] lg:py-3 lg:px-[9px] flex items-center justify-center '>
                  <img src={videoIcon} alt='hh' />
                </span>
              </div>
              <div className="w-[65px] lg:w-[96px]  py-1 px-2 lg:py-(6px] lg:px-[10px] text-[8px] leading-[8px] lg:text-[12px] lg:leading-4 bg-irisBlueColor font-[500] mt-2 lg:mt-4 rounded-full">Consultation</div>
              <div className="flex items-center gap-[6px] lg:gap-[10px) mt-2 lg:mt-[18px]">
                  <img src={avatarIcon} alt="" />
                  <h4 className="text-[10px] leading-3 lg:text-[16px] lg:leading-[22px] font-[708] text-headingColor">Wayne Collins</h4>
              </div>
          </div>
          </div>
          </div>
        </div>
      </section>
      <section>
        <div className='container'>
        <div className='lg:w-[470px] mx-auto'>
            <h1 className='heading text-center'>Our medical services</h1>
            <p className='text_para text-center'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore </p> 
        </div>
        <DoctorList />
        </div>
      </section>
      <section>
        <div className='container'>
          <div className='flex justify-between gap-[50px] lg:gap-[100px]'>
            <div className='w-1/2 hidden md:block '>
               <img src={faqIcon} alt="" />
            </div>
            <FaqList />
          </div>

        </div>
      </section>
      
    </>
  )
}

export default Home