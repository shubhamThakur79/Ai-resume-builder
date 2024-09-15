import React from 'react'
import SummeryPreview from './SummeryPreview'
import { LocateIcon, MailIcon, PhoneCallIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import { MdLocationPin, MdMarkEmailUnread } from "react-icons/md";
import { FaPhoneVolume } from 'react-icons/fa6';
const PersonalDetailPreview = ({ resumeInfo }) => {
  // Get the first 10 characters


  return (
    <div>
      <h5 style={{ color: resumeInfo?.themeColor }} className='text-xl font-semibold -tracking-tight'>{resumeInfo?.firstName} {resumeInfo?.lastName}
        <br />
        <p className={`text-lg font-medium `}>{resumeInfo?.jobTitle}</p>

      </h5>
      <div style={{ color: resumeInfo?.themeColor }} className='flex flex-wrap  items-center font-semibold justify-between md:justify-evenly mt-2 text-sm'>
        <h1 className={"flex line-clam-1 items-center gap-[1px] md:gap-[2px]"}><MdLocationPin size={"20px"} className='text-xs' style={{ color: resumeInfo?.themeColor }} /><span className='block md:hidden'>{resumeInfo?.address} </span><span className='hidden md:block'>{resumeInfo?.address} </span></h1>
        <Link to={`tel:${resumeInfo?.phone}`}>
          <h1 className={"flex items-center gap-1 "}><FaPhoneVolume size={"14px"} className='text-xs' style={{ color: resumeInfo?.themeColor }} />{resumeInfo?.phone}</h1>

        </Link>
        <Link to={`mailto:${resumeInfo?.email}`}>

          <h1 className={"flex items-center gap-1 "}><MdMarkEmailUnread size={"17px"} className='text-xs' style={{ color: resumeInfo?.themeColor }} />{resumeInfo?.email}</h1>
        </Link>

      </div>
      <hr style={{ borderColor: resumeInfo?.themeColor }} className='mt-3 border-[1.5px]' />



    </div>
  )
}

export default PersonalDetailPreview