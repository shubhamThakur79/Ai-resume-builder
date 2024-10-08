import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import FormSection from '../../../resume/component/FormSection';
import ResumePreview from '../../../resume/component/ResumePreview';
import GlobleApi from '../../../../service/GlobleApi';
import { ResumeIdContext, ResumeInfoContext, TogglePreview } from '../../../../context/ResumeInfoContext';

const EditResume = () => {
    const { resumeId } = useParams();  // Fetch the resumeId from the URL
    const { setResumeId } = useContext(ResumeIdContext);
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const { isClicked, setIsClicked } = useContext(TogglePreview)

    useEffect(() => {
        if (resumeId) {
            setResumeId(resumeId);  // Store the resumeId in context
            GetResumeInfo(resumeId);  // Fetch resume info using the ID
        }
    }, [resumeId]);

    const GetResumeInfo = async (id) => {
        try {
            const response = await GlobleApi.GetResumeById(id);
            setResumeInfo(response.data);  // Update resume info in context
        } catch (error) {
            console.error("Error fetching resume data:", error.message);
        }
    };

    return (
        <div className='w-full'>
            <div className={`flex justify-between mb-10 mt-3`}>
                <div id="no-print" className={`md:w-1/2 w-[100vw] overflow-hidden md:block ${isClicked ? "hidden " : "block"} `}>
                    <FormSection resumeId={resumeId} />
                </div>
                <div className={`md:w-1/2 w-full  md:block ${isClicked ? "block " : "hidden"}`}>
                    <ResumePreview />
                </div>
            </div>
        </div>
    );
};

export default EditResume;
