
const upload_preset = "medi-booking"

const cloud_name ="dgwmfley5"

const uploadCloudinary = async file =>{
    console.log(cloud_name,upload_preset)
    const uploadData = new FormData()
    console.log(uploadData)
    uploadData.append('file',file)
    uploadData.append('upload_preset',upload_preset)
    uploadData.append('cloud_name',cloud_name)

    const res= await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,{
        method: "post",
        body: uploadData
    })
    const data= await res.json();

    return data;
}

export default uploadCloudinary;