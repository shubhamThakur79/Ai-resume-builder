import React, { useContext, useState } from 'react';
import { Button } from "../components/ui/button";
import { Link, useParams } from 'react-router-dom';
import { UserButton, useUser } from '@clerk/clerk-react';
import { FaShare } from 'react-icons/fa6';
import { RWebShare } from 'react-web-share';
import { DownloadCloud } from 'lucide-react';
import { ResumeInfoContext } from '../context/ResumeInfoContext';
import html2pdf from 'html2pdf.js';  // Import the html2pdf library

const Header = () => {
    const { user, isLoaded, isSignedIn } = useUser();
    const [isLoading, setIsLoading] = useState(false);
    const { resumeId } = useParams();
    const { resumeInfo } = useContext(ResumeInfoContext);

    // Function to generate the PDF
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
        <div id='no-print' className='flex w-[100vw] h-[70px] justify-between shadow-md md:py-4 py-3 px-4 md:px-8'>
            <Link to="/" className=''>
                <img className='w-[55px] object-cover md:w-[60px]' src="https://img.freepik.com/premium-photo/colorful-bird-with-colorful-wings-is-shown-white-background_259293-24603.jpg?size=626&ext=jpg&ga=GA1.1.785720697.1706798610&semt=ais_hybrid" alt="" />
            </Link>
            <div className='mx-auto md:block hidden flex justify-end w-full mr-10 relative'>
                <div className='flex justify-end ml-3'>
                    <div className={"flex gap-5"}>
                        <Button onClick={generatePDF} disabled={isLoading} className="flex gap-[6px] items-center bg-[#BE185D]">
                            {isLoading ? "Loading..." : <DownloadCloud />} Download
                        </Button>

                        {/* Share logic */}
                        <RWebShare
                            data={{
                                text: "Hey there! This is my resume. You can check it out from this URL:",
                                url: `${import.meta.env.VITE_BASE_URL}/my-resume/${resumeId}/view`,
                                title: `${resumeInfo?.firstName} ${resumeInfo?.lastName} Resume`,
                            }}
                            onClick={() => console.log("Shared successfully!")}
                        >
                            <Button className="flex bg-[#4B40CC] gap-[6px] items-center">
                                <FaShare /> Share
                            </Button>
                        </RWebShare>
                    </div>
                </div>
            </div>
            {isSignedIn ? (
                <div className='flex items-center gap-3'>
                    <Link to="/dashbord">
                        <Button className="" variant="outline">Dashboard</Button>
                    </Link>
                    <UserButton className="h-[500px] w-[200px]" />
                </div>
            ) : (
                <Link to={"/auth/sign-in"}>
                    <Button className="bg-[#5417D7]">Get Started</Button>
                </Link>
            )}
        </div>
    );
};

export default Header;
