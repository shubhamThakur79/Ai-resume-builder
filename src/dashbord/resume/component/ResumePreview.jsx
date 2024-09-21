import React, { useContext, useState } from 'react';
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
import { Button } from "../../../components/ui/button";
import { useParams } from 'react-router-dom';
import { RWebShare } from 'react-web-share';


const ResumePreview = () => {
  const { resumeInfo } = useContext(ResumeInfoContext);
  const { toggle } = useContext(ToggleExperience);
  const { resumeId } = useParams()
  const [isLoading, setIsLoading] = useState(false)

  function download() {
    setIsLoading(true)
    window.print()

    setIsLoading(false)
}
  return (
    <div id="print-area" 
      style={{
        borderTopWidth: "25px",
        borderTopStyle: "solid",
        borderTopColor: resumeInfo?.themeColor || 'transparent',
      }}
      className="h-full rounded-lg w-full mt-[-10px] m-auto text-center p-3 md:px-8 pb-16 md:pb-12 pt-6 border-t-[20px] shadow-xl"
    >
      
      {/* Personal Information Preview */}
      <PersonalDetailPreview resumeInfo={resumeInfo} />

      {/* Summary Preview */}
      <SummeryPreview resumeInfo={resumeInfo} />

      {/* Experience or Project Preview based on toggle */}

      {/* Education Preview */}
      <EducationPreview resumeInfo={resumeInfo} />

      <div>
        <ProjectPreview resumeInfo={resumeInfo} /> 
      </div>
      {/* Skill Preview */}
      <SkillPreview resumeInfo={resumeInfo} />

      <div className="fixed bottom-2 right-1 z-40">
        <Back />
      </div>
    </div>
  );
};

export default ResumePreview;
