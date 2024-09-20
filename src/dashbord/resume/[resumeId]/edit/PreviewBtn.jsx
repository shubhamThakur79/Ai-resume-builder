import React, { useContext, useState } from 'react'
import { Button } from "../../../../components/ui/button"
import { Backpack, DownloadCloud, Loader, LoaderCircle, View } from 'lucide-react'
import { ResumeInfoContext, TogglePreview } from '../../../../context/ResumeInfoContext'
import { BsBack } from 'react-icons/bs'
import { RWebShare } from 'react-web-share'
import { FaShare } from 'react-icons/fa6'
import { useParams } from 'react-router-dom'
// import { Button } from "@/components/ui/Button";

const PreviewBtn = () => {
    const { isClicked, setIsClicked } = useContext(TogglePreview)

    
    return (
        <div className='block md:hidden text-end'>
            <Button onClick={() => {
                setIsClicked(!isClicked)
            }} className="gap-1 ">
                <View size="17px" /> Preview
            </Button>

        </div>
    )
}
export default PreviewBtn

const Back = () => {
    const { isClicked, setIsClicked } = useContext(TogglePreview)
    const [isLoading, setIsLoading] = useState(false)
    const { resumeId } = useParams()
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext)



    function download() {
        setIsLoading(true)
        window.print()

        setIsLoading(false)
    }
    return (
<>


        
           {isClicked &&<div className='block md:hidden  ' id="no-print">



   <div className='flex justify-start w-full  relative'>

        <div className={"w-full flex justify-start gap-4 mr-5"}>
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
  

           
                <Button onClick={() => {
                    setIsClicked(!isClicked)
                }} className="gap-1 ">
                    <BsBack size="17px" /> Back
                </Button>
            

       
        </div>
        </div>
}
        
        </>
        
    )
}

export { Back }
