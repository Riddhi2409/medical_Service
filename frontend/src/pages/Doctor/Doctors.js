import React, { useEffect, useState } from 'react'
import {Routes , Route} from 'react-router-dom';
import { BASE_URL } from '../../config';
import Loading from '../../loader/Loading';
import Error from '../../error/Error';
import useFetchData from '../../hooks/useFetchData';
import DoctorCard from '../../components/DoctorCard';

import DoctorList from '../../components/DoctorList';

const Doctors = () => {
  const {data,loading,error}=useFetchData(`${BASE_URL}/doctors`)
  const {appointments,...doctor}=data;
  const [query,setQuery]=useState('');
  const [debounceQuery,setDebounceQuery]=useState('')
  const handleSearch = ()=>{
    setQuery(query.trim())
  }
  useEffect(()=>{
    const tiemeout=setTimeout(()=>{
      setDebounceQuery(query)
    },700)
    return ()=>clearTimeout(tiemeout)
  },[query])
  return (
    <>
      <section  className='bg-[#fff9ea]'>
        <div className='container text-center'>
          <h2 className='heading'>Find a Doctor</h2>
          <div className='max-w-[570px] mt-[30px] mx-auto bg-[#0066ff2c] rounded-md flex items-center justify-center'>
            <input 
              type="search"
              className='py-2 px-4 pr-2 bg-transparent w-full focus:outline-none cursor-pointer placeholder:text-textColor'
              placeholder='Search doctor by name or specifications'
              value={e=>setQuery(e.target.value)}
              
            />
            <button className='btn mt-0 rounded-[0px] rounded-r-md ' onClick={handleSearch}>search</button>
          </div>
        </div>
      </section>
      <section>
      {loading && <Loading />}
      {error && <Error />}
      {!loading && !error && (
        <div className="grid grid-cols-1 sa:grid-cols-2 md:grid-cols-3 gap-5 lg:gap-[30px] mt-[30px] 1g:mt-[55px]">
          {data.map((doctor, index)=> (
              <DoctorCard key={data._id} doctor={doctor} />
          ))}
        </div>
      )
    }
    </section>
    </>
  )
}

export default Doctors