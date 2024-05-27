import {useState} from "react";
import {AiOutlineMinus, AiOutlinePlus} from "react-icons/ai"; 
const FaqItem =({ item})=> {
    const [isopen, setIsOpen] =useState(false);
    const toggleAccordion= () =>{ setIsOpen(!isopen); }
    return(
    <div className="p-3 lg:p-5 rounded-[12px] border border-solid border-(00003) mb-5 cursor-pointer w-full">
        <div className="flex items-center justify-between gap-5 w-full" onClick={toggleAccordion}> 
        <h4 className="text-[16px] leading-7 lg:text-[22px] lg:leading-8 text-headingColor w-full">
            {item.question}
        </h4>
        <div className={`${isopen && "bg-primaryColor"} w-7 h-7 lg:w-8 lg:h-8 border-solid border-[#141F21] rounded flex items-center justify-center`}> {isopen? <AiOutlineMinus />: <AiOutlinePlus />}
        </div>
</div>
{isopen && <div className="mt-4">
    <p className="text-[14px] leading-6 lg:text-[16px] lg:leading-7 font-[400] text-textColor">{item.content}</p>
    </div>}

</div>

)};

export default FaqItem