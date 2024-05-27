import {useEffect,useState} from 'react';
import axios from 'axios'
import { toast } from 'react-toastify';

const useFetchData = (url) => {
    const token=JSON.parse(localStorage.getItem('token'))
    const [data,setData]=useState([]);
    const [loading,setLoading]=useState(false);
    const [error,setError]=useState(false);
    useEffect(()=>{
        const fetchData= async()=>{
            setLoading(true)
            try{
                console.log(url);
                console.log(token,"fetch")
                const res=await axios.get(url,{
                    headers: {authorization: `Bearer ${token}`}
                })
                console.log(res.data)
                if(!res.data.success){
                    return toast.error(res.data.message)
                }
                setData(res.data.data)
                setLoading(false);
            }catch(err){
                setLoading(false);
                setError(err.message);
            }
        }
        fetchData()
    },[url])
    return {
        data,
        loading,
        error
    }
}

export default useFetchData;