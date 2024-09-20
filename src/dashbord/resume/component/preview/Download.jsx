import React, { useContext, useEffect, useState } from 'react'
import Header from '../../../custom/Header'
import { Button } from "@/components/ui/Button";
import { DownloadCloud, Loader, LoaderCircle } from 'lucide-react';
import { BsShare } from 'react-icons/bs';
import { BiShare } from 'react-icons/bi';
import { FaShare } from 'react-icons/fa6';
import ResumePreview from '../../../dashbord/resume/component/ResumePreview';
import { ResumeInfoContext } from '../../../context/ResumeInfoContext';
import { useParams } from 'react-router-dom';
import GlobleApi from '../../../service/GlobleApi';
import { RWebShare } from 'react-web-share';

const ViewResume = () => {
    const [resumeInfo, setResumeInfo] = useState()
    // const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext)
    const { resumeId } = useParams()
    const [isLoading, setIsLoading] = useState(false)
    console.log(resumeInfo)
    const GetResumeInfo = () => {
        GlobleApi.GetResumeById(resumeId).then(resp => {
            setResumeInfo(resp?.data)
        })
    }
    useEffect(() => {
        GetResumeInfo()
    }, [])

    function download() {
        setIsLoading(true)
        window.print()

        setIsLoading(false)
    }

    return (
        <>
        <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
            <div id="no-print">


                {/* <Header /> */}
                <div className='mx-auto flex justify-center relative'>

                    <div className='w-[100%] m-auto md:w-[90%] lg:w-[80%] xl:w-[70%] mt-5  md:mx-20 lg:mx-36 text-wrap'>
                        <h2 className='md:text-center text-center text-xl md:text-2xl font-medium mb-2'>Congrats! Your Ultimate AI generates resume is ready !</h2>
                        <p className='text-gray-600 text-center'>Now you are ready to download your resume and you can share your resume Url with your friends and family</p>
                        <div className={`w-full fixed md:sticky mb-4  md:top-0 bottom-0 py-2  md:py-3 rounded   mt-3 flex md:justify-between justify-evenly gap-4 bg-[#f8f8f8b0]`}>
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
            </div>
            <div id="print-area" className='my-4 md:my-0 md:w-[70%] m-auto mt-3 rounded pb-10'>

                <ResumePreview />
            </div>


        // </ResumeInfoContext.Provider>
        </>
    )
}

export default ViewResume