import { useEffect, useState } from 'react'
import { AiOutlineDelete } from 'react-icons/ai'
import uploadCloudinary from '../../utils/uploadCloudinary'
import { BASE_URL } from '../../config'
import { toast } from 'react-toastify'
import {  useNavigate } from 'react-router-dom';

const Profile = ({doctorData}) => {
    const token=JSON.parse(localStorage.getItem('token'))
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        bio: '',
        specialization: '',
        ticketPrice: '',
        qualifications: [{startingDate: "",endingData: "",degree: "",university: ""}],
        experiences: [{startingDate: "",endingData: "",position: "",hospital: ""}],
        timeSlots:[{startingTime: "",endingTime: "",day: ""}],
        photo: "",
    })
    useEffect(()=>{
        setFormData({
            name: doctorData?.name,
            email: doctorData?.email,
            phone: doctorData?.phone,
            bio: doctorData?.bio,
            specialization: doctorData?.specialization,
            ticketPrice: doctorData?.ticketPrice,
            qualifications: doctorData?.qualifications,
            experiences: doctorData?.experiences,
            timeSlots:doctorData?.timeSlots,
            photo: doctorData?.photo,
        })
    },[doctorData])
    const handleInputChange = e => {
        setFormData({...formData,[e.target.name]:e.target.value})
    }
    const handleFileInputChange=async e=>{
        const file=e.target.files[0];
        const data = await uploadCloudinary(file)
        console.log(data.url)
        setFormData({...formData,photo: data.url})
        console.log(formData.photo)
    }
    const updateProfileHandler = async e =>{
        e.preventDefault();
        console.log(formData);
        try {
      
            const res = await fetch(`${BASE_URL}/doctors/${doctorData._id}`,{
              method: "PUT",
              headers: {
                  "content-type": "application/json",
                  Authorization: `Bearer ${token}`
              },
              body: JSON.stringify(formData)
            })
      
            const result=await res.json();
            console.log(result);
            if (!res.ok) {
              throw new Error(result.message)
            }
            // setLoading(false);
            toast.success(result.message)
            navigate('/doctors/profile/me');
          } catch (err) {
            console.log(err.message)
            toast.error(err.message);
            // setLoading(false);
          }
    }
    const addItem = (key,item)=>{
        setFormData(prevFormData=>({...prevFormData,[key]:[...prevFormData[key],item]}))
    }
    const addQualification=e=>{
        e.preventDefault();
        addItem('qualifications',{
            startingDate: "",endingData: "",degree: "",university: ""
        })
    }
    const addExperience=e=>{
        e.preventDefault();
        addItem('experiences',{
            startingDate: "",endingData: "",position: "",hospital: ""
        })
    }
    const addTimeSlots=e=>{
        e.preventDefault();
        addItem('timeSlots',{
            startingTime: "",endingTime: "",day: ""
        })
    }
    
    const handleQualificationChange = (event,index)=>{
        handleReusableInputChangeFunc('qualifications',event,index)
    }
    const handleExperienceChange = (event,index)=>{
        handleReusableInputChangeFunc('experiences',event,index)
    }
    const handleTimeslotsChange = (event,index)=>{
        handleReusableInputChangeFunc('timeSlots',event,index)
    }
    const  handleReusableInputChangeFunc=(key,event,index)=>{
        const {name,value}=event.target;
        setFormData(prevFormData=>{
            const updateItems =[...prevFormData[key]]
            updateItems[index][name]=value
            return {
                ...prevFormData,
                [key]:updateItems,
            }
        })
    }
    const deleteQualification = (e,index)=>{
        e.preventDefault()
        deleteItem('qualifications',index);
    }
    const deleteExperience = (e,index)=>{
        e.preventDefault();
        deleteItem('experiences',index);
    }
    const deleteItem=(key,index)=>{
        
        setFormData(prevFormData=>({...prevFormData,[key]:[...prevFormData[key].filter((_,i)=>i!==index)]}))
    }
    const deleteTimeSlots = (e,index)=>{
        e.preventDefault()
        deleteItem('timeSlots',index);
    }
    return (
        <div>
            <h2 className="text-headingColor font-bold text-[24px] leading-9 mb-10">
                Profile Information
            </h2>
            <form>
                <div className="mb-5">
                    <p className="form_label">Name*</p>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Full Name"
                        className="form_input"
                    />
                </div>
                <div className="mb-5">
                    <p className="form_label">Email*</p>
                    <input
                        type="text"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Email"
                        className="form_input"
                    />
                </div>
                <div className="mb-5">
                    <p className="form_label">Phone*</p>
                    <input
                        type="number"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="phone number"
                        className="form_input"
                    />
                </div>
                <div className="mb-5">
                    <p className="form_label">Bio*</p>
                    <input
                        type="text"
                        name="bio"
                        value={formData.bio}
                        onChange={handleInputChange}
                        placeholder="Bio"
                        className="form_input"
                        maxLength={100}
                    />
                </div>
                <div className="mb-5">
                    <div className="grid grid-cols-3 gap-5 mb-[30px]">
                        <div>
                            <p className="form_label">Gender*</p>
                            <select
                                name="gender"
                                value={formData.gender}
                                onChange={handleInputChange}
                                className="form_input py-3.5"
                            >
                                <option value="">Select</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <div>
                            <p className="form_label">Specialization*</p>
                            <select
                                name="specialization"
                                value={formData.specialization}
                                onChange={handleInputChange}
                                className="form_input py-3.5"
                            >
                                <option value="">Select</option>
                                <option value="surgeon">surgeon</option>
                                <option value="neurologist">neurologist</option>
                                <option value="dermatologist">dermatologist</option>
                            </select>
                        </div>
                        <div>
                            <p className='form_label '>Ticket Price</p>
                            <input type="number" placeholder='100' name="ticketPrice" value={formData.ticketPrice} onChange={handleInputChange} className='form_input '/>
                        </div>
                    </div>
                </div>
                <div className="mb-5">
                    <p className="form_label">Qualifications*</p>
                    {formData.qualifications?.map((item, index)=>(
                        <div key={index}>
                            <div>
                                <div className="grid grid-cols-2 gap-5">
                                    <div>
                                        <p className="form_label">Starting Date*</p>
                                        <input
                                            type="date"
                                            name="startingDate"
                                            value={item.startingDate}
                                            className="form_input"
                                            onChange={e=> handleQualificationChange(e,index)}
                                        />
                                    </div>
                                    <div>
                                        <p className="form_label">Ending Date*</p>
                                        <input
                                            type="date"
                                            name="endingDate"
                                            value={item.endingDate}
                                            className="form_input"
                                            onChange={e=> handleQualificationChange(e,index)}
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-5">
                                    <div>
                                        <p className="form_label">Degree*</p>
                                        <input
                                            type="text"
                                            name="degree"
                                            value={item.degree}
                                            className="form_input"
                                            onChange={e=> handleQualificationChange(e,index)}
                                        />
                                    </div>
                                    <div>
                                        <p className="form_label">University*</p>
                                        <input
                                            type="text"
                                            name="university"
                                            value={item.university}
                                            className="form_input"
                                            onChange={e=> handleQualificationChange(e,index)}
                                        />
                                    </div>
                                </div>
                                <button className='bg-red-600 rounded-full p-2 text-white text-[25px] mt-2  mb-[30px]' onClick={e=>deleteQualification(e,index)}><AiOutlineDelete /></button>
                            </div>
                        </div>
                    ))}
                    <button className='bg-[#000] py-2 px-5 rounded text-white h-fit cursor-pointer' onClick={addQualification}>Add qualification</button>
                </div>
                <div className="mb-5">
                    <p className="form_label">Experiences*</p>
                    {formData.experiences?.map((item, index)=>(
                        <div key={index}>
                            <div>
                                <div className="grid grid-cols-2 gap-5">
                                    <div>
                                        <p className="form_label">Starting Date*</p>
                                        <input
                                            type="date"
                                            name="startingDate"
                                            value={item.startingDate}
                                            className="form_input"
                                            onChange={e=>handleExperienceChange(e,index)}
                                        />
                                    </div>
                                    <div>
                                        <p className="form_label">Ending Date*</p>
                                        <input
                                            type="date"
                                            name="endingDate"
                                            value={item.endingDate}
                                            className="form_input"
                                            onChange={e=>handleExperienceChange(e,index)}
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-5">
                                    <div>
                                        <p className="form_label">Position*</p>
                                        <input
                                            type="text"
                                            name="position"
                                            value={item.position}
                                            className="form_input"
                                            onChange={e=>handleExperienceChange(e,index)}
                                        />
                                    </div>
                                    <div>
                                        <p className="form_label">Hospital*</p>
                                        <input
                                            type="text"
                                            name="hospital"
                                            value={item.hospital}
                                            className="form_input"
                                            onChange={e=>handleExperienceChange(e,index)}
                                        />
                                    </div>
                                </div>
                                <button className='bg-red-600 rounded-full p-2 text-white text-[25px] mt-2  mb-[30px]' onClick={e=>deleteExperience(e,index)}><AiOutlineDelete /></button>
                            </div>
                        </div>
                    ))}
                    <button className='bg-[#000] py-2 px-5 rounded text-white h-fit cursor-pointer' onClick={addExperience}>Add Experience</button>
                </div>
                <div className="mb-5">
                    <p className="form_label">Time Slots*</p>
                    {formData.timeSlots?.map((item, index)=>(
                        <div key={index}>
                            <div>
                                <div className="grid grid-cols-2 md:grid-cols-4 mb-[30px] gap-5">
                                    <div>
                                        <p className="form_label">Day*</p>
                                        <select name='day' value={item.day} className='form_input py-3.5'
                                        onChange={e=>handleTimeslotsChange(e,index)}
                                        >
                                            <option value="">Select</option>
                                            <option value="saturday">Saturday</option>
                                            <option value="sunday">Sunday</option>
                                            <option value="monday">Monday</option>
                                            <option value="tuesday">Tuesday</option>
                                            <option value="wednesday">Wednesday</option>
                                            <option value="thursday">Thursday</option>
                                            <option value="friday">Friday</option>
                                        </select>
                                    </div>
                                    <div>
                                        <p className="form_label">Starting Time*</p>
                                        <input
                                            type="time"
                                            name="startingTime"
                                            value={item.startingTime}
                                            className="form_input"
                                            onChange={e=>handleTimeslotsChange(e,index)}
                                        />
                                    </div>
                                    <div>
                                        <p className="form_label">Ending Time*</p>
                                        <input
                                            type="time"
                                            name="endingTime"
                                            value={item.endingTime}
                                            className="form_input"
                                            onChange={e=>handleTimeslotsChange(e,index)}
                                        />
                                    </div>
                                    <div className='flex items-center'>
                                    <button className='bg-red-600 rounded-full p-2 text-white text-[25px] mt-2  mb-[30px]' onClick={e=>deleteTimeSlots(e,index)}><AiOutlineDelete /></button>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                    ))}
                    <button className='bg-[#000] py-2 px-5 rounded text-white h-fit cursor-pointer' onClick={addTimeSlots}>Add TimeSlots</button>
                </div>
                <div className='mb-5'>
                    <p className='form_label'>About</p>
                    <textarea name='about' value={formData.about} placeholder='Write about you' onChange={handleInputChange} className='form_input'></textarea>
                </div>
                <div className='mb-5 flex items-center gap-3'>
                    {formData.photo && 
                        <figure className="w-[60px] h-[60px] rounded-full border-2 border-solid border-primaryColor flex items-center justify-center">
                            <img src={formData.photo} alt="" className="w-full rounded-full" />
                        </figure>
                    }
                    <div className="relative w-[170px] h-[50px] text-[12px]">
                    <input
                        type="file"
                        name="photo"
                        id="customFile"
                        onChange={handleFileInputChange}
                        accept=".jpg, .png"
                        className="absolute top-0 left-0 w-full h-full opacity- cursor-pointer"
                    />
                  <label htmlFor="customFile" className="absolute top-0 left-0 w-full h-full flex items-center px-[0.75rem] py-[0.375rem] text-[15px] leading-6 overflow-hidden bg- [#0066ff46] text-headingColor font-semibold rounded-lg truncate cursor-pointer "></label>
                  </div>
                </div>
                <div className='mt-7'>
                    <button type='submit' onClick={updateProfileHandler} className='bg-primaryColor text-white text-[20px] rounded-lg leading-[30px] w-full py-3'>Update Profile</button>
                </div>
            </form>

        </div>
    )
}

export default Profile