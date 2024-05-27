import DoctorCard from "./DoctorCard";
import {doctors} from '../assets/data/doctors';

import { BASE_URL } from "../config";
import useFetchData from "../hooks/useFetchData";
import Loading from '../loader/Loading';
import Error from "../error/Error";

const DoctorList=() => {
    // console.log(doctors)
    const {data,loading,error}=useFetchData(`${BASE_URL}/doctors`)
    const {appointments,...doctor}=data;

return (
    <>
    {loading && <Loading />}
    {error && <Error />}
    {!loading && !error &&
    <div className="grid grid-cols-1 sa:grid-cols-2 md:grid-cols-3 gap-5 lg:gap-[30px] mt-[30px] 1g:mt-[55px]">
        {data.map((doctor, index)=> (
            <DoctorCard key={data._id} doctor={doctor} />
        ))}
    </div>
    }
    </>
);

};

export default DoctorList;