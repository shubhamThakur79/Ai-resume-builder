import React, { useContext, useState } from 'react'
import { Button } from "../../../../components/ui/button"
import { Backpack, DownloadCloud, Loader, LoaderCircle, View } from 'lucide-react'
import { ResumeInfoContext, TogglePreview } from '../../../../context/ResumeInfoContext'
import { BsBack } from 'react-icons/bs'
import { RWebShare } from 'react-web-share'
import { FaShare } from 'react-icons/fa6'
import { useParams } from 'react-router-dom'
// import { Button } from "@/components/ui/Button";
import html2pdf from 'html2pdf.js'; 

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



    const generatePDF = () => {
        setIsLoading(true);
    
        // Ensure the element exists before generating the PDF
        const resumeElement = document.getElementById("print-area");
        if (!resumeElement) {
            console.error("No element found with the ID 'print-area'");
            setIsLoading(false);
            return;
        }
    
        // CSS for full-page content for PDF
        const originalStyles = document.body.style.cssText; // Save original styles
        document.body.style.cssText = "height: auto !important; width: 100vw !important; margin: auto; padding: auto;"; // Ensure content fits on the page
    
        // Options for html2pdf
        const options = {
            margin: [0, 0, 0, 0],  // Set no margin for full-page coverage
            filename: `${resumeInfo?.firstName || "Unknown"}_${resumeInfo?.lastName || "User"}_Resume.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 3, useCORS: true },  // Increase the scale for higher quality
            jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' } // Set PDF to A4 size
        };
    
        console.log("Generating full-page PDF...");
    
        // Generate PDF
        html2pdf()
            .set(options)
            .from(resumeElement)
            .save()
            .then(() => {
                console.log("PDF generated successfully!");
            })
            .catch((error) => {
                console.error("Error generating PDF:", error);
            })
            .finally(() => {
                // Restore original styles after generating PDF
                document.body.style.cssText = originalStyles;
                setIsLoading(false);
            });
    };
    return (
<>


        
           {isClicked &&<div id={"no-print"} className='block md:hidden  ' >



   <div className='flex justify-start w-full  relative'>

        <div className={"w-full flex justify-start gap-4 mr-5"}>
            <Button onClick={generatePDF} disabled={isLoading} className="flex gap-[6px] items-center bg-[#BE185D]">{isLoading ? <LoaderCircle className='animate-spin' /> : <DownloadCloud />} Download</Button>

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
