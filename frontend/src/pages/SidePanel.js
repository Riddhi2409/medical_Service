import React from "react";
import convertTime from "../utils/convertTime";
import {BASE_URL} from '../config'
const SidePanel = ({doctorId,ticketPrice,timeSlots}) => {
    const token=JSON.parse(localStorage.getItem('token'))
    const bookingHandler = async() =>{
        try{
            const res= await fetch(`${BASE_URL}/bookings/checkout-session/${doctorId}`,{
                method: 'post',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            const data=await res.json()
            if(!res.ok){
                throw new Error(data.message+ 'please try again')
            }
            if(data.session.url){
                window.location.href=data.session.url
            }
        }catch(err){

        }
    }
    return (
        <div className="shadow-panelShadow p-3 lg:p-5 rounded-md  md:h-[19rem]">
            <div className="flex items-center justify-between">
                <p className="text_para mt-0 font-semibold">Ticket Price</p>
                <span className="text-[16px] leading-7 lg:text-[22px] lg:leading-8 text-headingColor font-bold">
                    {ticketPrice} BDT
                </span>
            </div>
            <div className="mt-[30px]">
                <p className="text_para mt-0 font-semibold text-headingColor">
                    Available Time Slots:
                </p>
                <ul className="mt-3">
                    {timeSlots?.map((timeSlot,index)=>(
                    <li className="flex items-center justify-between mb-2" key={index}>
                        <p className="text-[15px] leading-6 text-textColor font-semibold">
                            {timeSlot.day}
                        </p>
                        <p className="text-[15px] leading-6 text-textColor font-semibold">
                            {convertTime(timeSlot.startingTime)} {" - "} {convertTime(timeSlot.endingTime)}
                        </p>
                    </li>
                    ))}
                </ul>

            </div>
            <button className="btn px-2 w-full" onClick={bookingHandler}>Book a Appointment</button>
        </div>
    )
}
export default SidePanel;