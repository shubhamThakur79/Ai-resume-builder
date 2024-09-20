import React, { useContext, useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { WiStars } from 'react-icons/wi';
import { Textarea } from "@/components/ui/textarea";
import { ResumeInfoContext } from '../context/ResumeInfoContext';
import { LoaderCircleIcon, SaveIcon } from 'lucide-react';
import GlobleApi from '../service/GlobleApi';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { AIChatSession } from './../service/AiModel';

let prompt = `job Title:{jobTitle}, based on job title, give me a summary for my resume within 4 to 5 lines, no extra text`;

const Summery = ({ setEnableNext }) => {
    let { resumeId } = useParams();
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const [formData, setFormData] = useState({ summary: resumeInfo?.summary || "" });
    const [isLoading, setIsLoading] = useState(false);

    // Update formData and context
    const updateFormData = (name, value) => {
        setEnableNext(false); // Disable the next button until save
        setFormData((prev) => ({ ...prev, [name]: value }));
        setResumeInfo((prevResumeInfo) => ({ ...prevResumeInfo, [name]: value }));
    };

    const GenerateSummeryFromAI = async () => {
        setIsLoading(true);
        const PROMPT = prompt.replace("{jobTitle}", resumeInfo?.jobTitle);
        const result = await AIChatSession.sendMessage(PROMPT);
        const aiText = await result?.response?.text() || ""; // Get AI-generated text
        updateFormData('summary', aiText); // Update both formData and context
        setIsLoading(false);
    };

    const onSave = (e) => {
        e.preventDefault();
        setIsLoading(true);
        const data = { data: { summary: formData.summary } }; // Wrap summary in 'data' object

        GlobleApi.UpdateResumeDetail(resumeId, data)
            .then(() => {
                setIsLoading(false);
                setEnableNext(true); // Enable the next button
                toast("✅ Details updated");
            })
            .catch((error) => {
                setIsLoading(false);
                console.error("Error updating resume:", error);
                toast("👽 Error updating resume");
            });
    };

    return (
        <div className='w-[95vw] md:w-auto'>
            <div className='shadow-lg p-3 w-[100%] mx-1 md:p-5 border-t-purple-500 border-t-4 mt-10 rounded-2xl'>
                <h2 className='font-bold text-lg'>Summary</h2>
                <h2 className='font-medium'>Add Summary for your job title</h2>

                <form onSubmit={onSave}>
                    <div className='flex justify-between mt-5 items-center md:items-end'>
                        <label className='font-semibold text-[15px] md:text-[19px]'>Add Summary</label>
                        <Button
                            onClick={(e) => {
                                e.preventDefault();
                                GenerateSummeryFromAI();
                            }}
                            variant={'secondary'}
                            className="text-[#8e2de9] border-[1px] border-[#a955f762] font-semibold text-[15px] md:text-[16px] flex items-center justify-center"
                        >
                            <WiStars size={"32px"} className='text-yellow-600 font-bold md:mr-1 ml-[-5px] h-10 w-8 md:w-10' /> Generate From AI
                        </Button>
                    </div>

                    <Textarea
                        onChange={(e) => updateFormData('summary', e.target.value)}
                        value={formData.summary}
                        // defaultValue={resumeInfo?.summary}
                        name="summary"
                        placeholder="Add Summary for your job title"
                        className="outline-none mt-5 h-max"
                        rows={5}
                    />

                    <div className='flex justify-end col-span-2 mt-3'>
                        <Button
                            type="submit"
                            className="bg-purple-500 flex items-center gap-1"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <LoaderCircleIcon className='animate-spin' />
                            ) : (
                                <SaveIcon size={"20px"} />
                            )}
                            Save
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Summery;
