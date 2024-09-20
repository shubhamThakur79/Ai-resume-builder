import React, { useContext } from 'react';
import { ResumeInfoContext, ToggleExperience } from '../../../context/ResumeInfoContext';
import PersonalDetailPreview from './preview/PersonalDetailPreview';
import SummeryPreview from './preview/SummeryPreview';
import ExperiencePreview from './preview/ExperiencePreview';
import EducationPreview from './preview/EducationPreview';
import SkillPreview from './preview/SkillPreview';
import { Back } from '../[resumeId]/edit/PreviewBtn';
import ProjectPreview from './preview/ProjectPreview';
import { FaShare } from 'react-icons/fa6';
import { DownloadCloud, LoaderCircle } from 'lucide-react';
import { Button } from "@/components/ui/Button";


const ResumePreview = () => {
  const { resumeInfo } = useContext(ResumeInfoContext);
  const { toggle } = useContext(ToggleExperience);

  return (
    <div
      style={{
        borderTopWidth: "25px",
        borderTopStyle: "solid",
        borderTopColor: resumeInfo?.themeColor || 'transparent',
      }}
      className="h-full rounded-lg w-full mt-[-10px] m-auto text-center p-3 md:px-8 pb-16 md:pb-12 pt-6 border-t-[20px] shadow-xl"
    >
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
      {/* Personal Information Preview */}
      <PersonalDetailPreview resumeInfo={resumeInfo} />

      {/* Summary Preview */}
      <SummeryPreview resumeInfo={resumeInfo} />

      {/* Experience or Project Preview based on toggle */}
      <div>
        <ProjectPreview resumeInfo={resumeInfo} /> 
      </div>

      {/* Education Preview */}
      <EducationPreview resumeInfo={resumeInfo} />

      {/* Skill Preview */}
      <SkillPreview resumeInfo={resumeInfo} />

      <div className="fixed bottom-2 right-1 z-40">
        <Back />
      </div>
    </div>
  );
};

export default ResumePreview;
