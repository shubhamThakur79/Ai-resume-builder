
import React, { useContext, useEffect, useState } from 'react';
import { Input } from "@/components/ui/input";
import { ResumeInfoContext, ToggleExperience } from '../context/ResumeInfoContext';
import { Button } from "@/components/ui/button";
import { Loader, LoaderCircleIcon, PlusIcon, SaveIcon } from 'lucide-react';
import RichTextEditor from '../dashbord/resume/component/RichTextEditor';
import { FiDelete } from 'react-icons/fi';
import GlobleApi from '../service/GlobleApi';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';

const formField = {
    title: "",
    companyName: "",
    city: "",
    state: "",
    startDate: "",
    endDate: "",
    workSummery: "",
};

const Experience = ({ setEnableNext }) => {
    const [experienceList, setExperienceList] = useState([formField]);  // Default to one formField entry
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const [isLoading, setIsLoading] = useState(false);
    let { resumeId } = useParams();
    const { toggle } = useContext(ToggleExperience);

    // Synchronize experienceList with resumeInfo when it becomes available
    useEffect(() => {
        if (resumeInfo && resumeInfo.experience) {
            setExperienceList(resumeInfo.experience.length ? resumeInfo.experience : [formField]);
        }
    }, []);
    useEffect(() => {
        // setIsLoading(true)
        setResumeInfo({ ...resumeInfo, experience: experienceList })
    }, [experienceList]);


    function handleChange(index, e) {
        setEnableNext(false);
        let newEntries = [...experienceList];
        let { name, value } = e.target;
        newEntries[index] = {
            ...newEntries[index],
            [name]: value
        };
        setExperienceList(newEntries);
    }

    function AddNewExperience() {
        setExperienceList([...experienceList, formField]);
    }

    function RemoveExperience(i) {
        if (i === 0) {
            return;
        }
        else {
            let updatedExperience = experienceList.filter((_, index) => index !== i);
            setExperienceList(updatedExperience);
        }
    }

    const handleRichTextEditor = (html, index) => {
        let newEntries = [...experienceList];
        newEntries[index] = {
            ...newEntries[index],
            workSummery: html.target.value    // Set workSummery as a string containing HTML
        };
        setExperienceList(newEntries);
    };

    const formatDate = (dateString) => {
        if (!dateString) return "";  // Return empty string if no date is available
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];  // Convert to yyyy-MM-dd
    };

    const onSave = (e) => {
        e.preventDefault();
        setIsLoading(true);

        const formattedExperienceList = experienceList.map(exp => ({
            ...exp,
            startDate: formatDate(exp.startDate),
            endDate: formatDate(exp.endDate)
        }));

        setResumeInfo((prevInfo) => ({ ...prevInfo, experience: formattedExperienceList }));

        const data = {
            data: {
                experience: formattedExperienceList
            }
        };

        GlobleApi.UpdateResumeDetail(resumeId, data)
            .then(
                () => {
                    setIsLoading(false);
                    toast("✅ Details updated");
                    setEnableNext(true);
                },
                (error) => {
                    setIsLoading(false);
                    console.error("Error updating resume:", error.response ? error.response.data : error.message);
                    toast(`👽 Error updating resume: ${error.message}`);
                }
            );
    };

    return (

        <div className='w-[95vw] md:w-auto'>
            {!toggle &&
                <div className='shadow-lg p-3 md:p-5  border-t-purple-500 border-t-4 mt-10 rounded-2xl'>
                    <h2 className='font-bold text-lg'>Professional Experience</h2>
                    <h2 className='font-medium'>Add Your Previous job experience</h2>
                    <div>
                        {experienceList?.map((item, index) => (
                            <div key={index}>
                                <div className='grid grid-cols-2 my-5 p-3 border gap-3 rounded-lg'>
                                    <div>
                                        <label className='text-sm font-semibold' htmlFor="title">Position Title:</label>
                                        <Input
                                            defaultValue={item?.title}
                                            placeholder={`Ex: Software Developer`}
                                            name={"title"}
                                            onChange={(event) => handleChange(index, event)}
                                        />
                                    </div>
                                    <div>
                                        <label className='text-sm font-semibold' htmlFor="companyName">Company Name:</label>
                                        <Input
                                            defaultValue={item?.companyName}
                                            placeholder={`Ex: TechCorp Inc.`}
                                            name={"companyName"}
                                            onChange={(event) => handleChange(index, event)}
                                        />
                                    </div>
                                    <div>
                                        <label className='text-sm font-semibold' htmlFor="city">City:</label>
                                        <Input
                                            defaultValue={item?.city}
                                            name={"city"}
                                            placeholder={`Ex: Nahan`}
                                            onChange={(event) => handleChange(index, event)}
                                        />
                                    </div>
                                    <div>
                                        <label className='text-sm font-semibold' htmlFor="state">State:</label>
                                        <Input
                                            defaultValue={item?.state}
                                            name={"state"}
                                            placeholder={`Ex: Himachal Pradesh`}
                                            onChange={(event) => handleChange(index, event)}
                                        />
                                    </div>
                                    <div>
                                        <label className='text-sm font-semibold' htmlFor="startDate">Start Date:</label>
                                        <Input
                                            defaultValue={formatDate(item?.startDate)}
                                            type={"date"}
                                            name={"startDate"}
                                            onChange={(event) => handleChange(index, event)}
                                        />
                                    </div>
                                    <div>
                                        <label className='text-sm font-semibold' htmlFor="endDate">End Date:</label>
                                        <Input
                                            defaultValue={formatDate(item?.endDate)}
                                            type={"date"}
                                            name={"endDate"}
                                            onChange={(event) => handleChange(index, event)}
                                        />
                                    </div>
                                    <div className='col-span-2 text-start'>
                                        <RichTextEditor defaultValue={resumeInfo?.experience[index]?.workSummery} name="workSummery" index={index} onRichTextEditorChange={(value) => handleRichTextEditor(value, index)} />
                                    </div>

                                    <div className='flex md:justify-end md:gap-x-4 gap-3 justify-end col-span-2 mt-3'>
                                        <Button onClick={() => RemoveExperience(index)} className="flex bg-red-800 items-center">
                                            <FiDelete className='mr-1 ml-[-4px]' size={"20px"} /> Remove
                                        </Button>
                                        <Button onClick={AddNewExperience} className="flex items-center">
                                            <PlusIcon size={"20px"} className='mr-1 ml-[-4px]' /> Add New Experience
                                        </Button>
                                        <Button type="submit" onClick={onSave} className="bg-purple-600 flex items-center gap-1" disabled={isLoading}>
                                            {isLoading ? <LoaderCircleIcon className='animate-spin' /> : <SaveIcon size={"20px"} />}
                                            Save
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            }
        </div>
    );
};

export default Experience;
