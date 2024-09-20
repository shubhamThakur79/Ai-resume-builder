import React, { useContext, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Link, Navigate, Outlet, useParams } from 'react-router-dom'
import { UserButton, useUser } from '@clerk/clerk-react'
import { FaShare } from 'react-icons/fa6'
import { RWebShare } from 'react-web-share'
import { DownloadCloud } from 'lucide-react'
import { ResumeInfoContext } from '../context/ResumeInfoContext'

const Header = () => {
    const { user, isLoaded, isSignedIn } = useUser()
const [isLoading,setIsLoading] =useState(false)
const { resumeId } = useParams()
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext)


    function download() {
        setIsLoading(true)
        window.print()

        setIsLoading(false)
    }
    return (
        <div id='no-print' className='flex w-[100vw] justify-between shadow-md md:py-4 py-3 px-4 md:px-8'>
            <Link to="/" className=''>
                <img className='w-[35px] object-fill md:w-[40px]' src="src/assets/logo.svg" alt="" />
            </Link>
            <div className='mx-auto md:block hidden flex justify-end w-full mr-10 relative'>

<div className='flex justify-end    ml-3 '>
    {/* <h2 className='md:text-center text-center text-xl md:text-2xl font-medium mb-2'>Congrats! Your Ultimate AI generates resume is ready !</h2>
    <p className='text-gray-600 text-center'>Now you are ready to download your resume and you can share your resume Url with your friends and family</p> */}
    <div className={"flex gap-5"}>
        <Button onClick={download} disabled={isLoading} className="flex gap-[6px] items-center bg-[#BE185D]">{isLoading ? <LoaderCircle className='animate-spin' /> : <DownloadCloud />} Download</Button>

        {/* share logic */}
        <RWebShare
            data={{
                text: "Hey there This is my resume You Can check it out from this URL",
                url: import.meta.env.VITE_BASE_URL + "/my-resume/" +resumeId + "/view",
                title: resumeInfo?.firstName + "" + resumeInfo?.lastName + "resume",
            }}
            onClick={() => console.log("shared successfully!")}
        >
            <Button className="flex bg-[#4B40CC] gap-[6px] items-center" >  <FaShare /> Share</Button>
        </RWebShare>
      
    </div>
</div>
</div>
            {
                isSignedIn ? <div className='flex items-center gap-3'>
                    <Link to="/dashbord">
                        <Button className="" variant="outline">Dashboard</Button>
                    </Link>
                    <UserButton className="h-[500px] w-[200px]" />
                </div>
                    :
                    <Link to={"/auth/sign-in"}>
                        <Button className="bg-[#5417D7]">Get Started</Button>

                    </Link>
            }
            

        </div>
    )
}

export default Header