import React, { useContext, useEffect, useState } from 'react';
import { Input } from "@/components/ui/input";
import { ResumeInfoContext, ToggleExperience } from '../context/ResumeInfoContext';
import { Button } from "@/components/ui/button";
import { Loader, LoaderCircleIcon, PlusIcon, SaveIcon } from 'lucide-react';
import { FiDelete } from 'react-icons/fi';
import { Textarea } from "@/components/ui/textarea";
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import GlobleApi from '../service/GlobleApi';
import { WiStars } from 'react-icons/wi';
import { AIChatSession } from '../service/AiModel';

const formField = {
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    liveDemo: ""
};

let PROMPT = "Position title: {ProjectTitle}. Based on this title, give 3 to 4 lines of title description  for my resume experience in HTML format.";

const Projects = ({ setEnableNext }) => {
    const [projectList, setProjectList] = useState([formField]); // Default to one formField entry
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const [isLoading, setIsLoading] = useState(false);
    let { resumeId } = useParams();
    const { toggle } = useContext(ToggleExperience);
    const [summery, setSummery] = useState("");

    useEffect(() => {
        if (resumeInfo && resumeInfo?.projects) {
            setProjectList(resumeInfo.projects.length ? resumeInfo.projects : [formField]);
        }
    }, []);

    useEffect(() => {
        setResumeInfo({ ...resumeInfo, projects: projectList });
    }, [projectList, setResumeInfo]);

    function handleChange(index, e) {
        setEnableNext(false);
        let newEntries = [...projectList];
        let { name, value } = e.target;

        newEntries[index] = {
            ...newEntries[index],
            [name]: value
        };
        setProjectList(newEntries);
    }

    function AddNewProject() {
        setProjectList([...projectList, formField]);
    }

    function RemoveProject(i) {
        if (i > 0) {
            let updatedProjects = projectList.filter((_, index) => index !== i);
            setProjectList(updatedProjects);
        }
    }

    const formatDate = (dateString) => {
        if (!dateString) return ""; // Return empty string if no date is available
        const date = new Date(dateString);
        return date.toISOString().split('T')[0]; // Convert to yyyy-MM-dd
    };

    const onSave = (e) => {
        e.preventDefault();
        setIsLoading(true);

        const formattedProjectList = projectList.map(proj => ({
            ...proj,
            startDate: formatDate(proj.startDate),
            endDate: formatDate(proj.endDate)
        }));

        setResumeInfo((prevInfo) => ({ ...prevInfo, projects: formattedProjectList }));

        const data = {
            data: {
                projects: formattedProjectList
            }
        };

        GlobleApi.UpdateResumeDetail(resumeId, data)
            .then(() => {
                setIsLoading(false);
                toast("✅ Details updated");
                setEnableNext(true);
            })
            .catch((error) => {
                setIsLoading(false);
                console.error("Error updating resume:", error.response ? error.response.data : error.message);
                toast(`👽 Error updating resume: ${error.message}`);
            });
    };

    const GenerateSummeryFromAI = async (index) => {
        setIsLoading(true);

        const prompt = PROMPT.replace("{ProjectTitle}", resumeInfo?.projects[index]?.title || ""); // Use title in prompt
        const result = await AIChatSession.sendMessage(prompt);
        const aiText = await result?.response?.text() || "";

        // Update the specific project's description with the AI-generated text
        let updatedProjects = [...projectList];
        updatedProjects[index].description = aiText;

        setProjectList(updatedProjects); // Set the updated projects
        setIsLoading(false);
    };

    return (
        <div className='w-[95vw] md:w-auto'>
            <div className='shadow-lg p-3 md:p-5 border-t-purple-500 border-t-4 mt-10 rounded-2xl'>
                <h2 className='font-bold text-lg'>Projects</h2>
                <h2 className='font-medium'>Add Your Project Details</h2>
                <div>
                    {projectList.map((item, index) => (
                        <div key={index}>
                            <div className='grid grid-cols-2 my-5 p-3 border gap-3 rounded-lg'>
                                <div>
                                    <label className='text-sm font-semibold' htmlFor={`title-${index}`}>Project Title:</label>
                                    <Input
                                        id={`title-${index}`}
                                        value={item?.title}
                                        placeholder={`Ex: Web App Development`}
                                        name={"title"}
                                        onChange={(event) => handleChange(index, event)}
                                    />
                                </div>

                                <div>
                                    <label className='text-sm font-semibold' htmlFor={`startDate-${index}`}>Start Date:</label>
                                    <Input
                                        id={`startDate-${index}`}
                                        value={formatDate(item?.startDate)}
                                        type={"date"}
                                        name={"startDate"}
                                        onChange={(event) => handleChange(index, event)}
                                    />
                                </div>
                                <div>
                                    <label className='text-sm font-semibold' htmlFor={`endDate-${index}`}>End Date:</label>
                                    <Input
                                        id={`endDate-${index}`}
                                        value={formatDate(item?.endDate)}
                                        type={"date"}
                                        name={"endDate"}
                                        onChange={(event) => handleChange(index, event)}
                                    />
                                </div>
                                <div>
                                    <label className='text-sm font-semibold' htmlFor={`liveDemo-${index}`}>
                                        Live Demo:
                                    </label>
                                    <Input
                                        id={`liveDemo-${index}`}
                                        value={item?.liveDemo}
                                        type="text"
                                        name={`liveDemo`}
                                        onChange={(event) => handleChange(index, event)}
                                        placeholder={"Your project live link"}
                                        defaultValue={item?.liveDemo}
                                    />
                                </div>

                                <div className='col-span-2'>
                                    <div className='flex justify-end my-2'>
                                        <Button
                                            onClick={(e) => {
                                                e.preventDefault();
                                                GenerateSummeryFromAI(index);
                                            }}
                                            variant={'secondary'}
                                            className="text-[#8e2de9] border-[1px] border-[#a955f762] font-semibold text-[16px] flex items-center justify-center"
                                        >
                                            {isLoading ? <Loader size={"15px"} className='animate-spin font-bold mr-1 ml-[-5px] h-7 w-10' /> : <WiStars size={"32px"} className='text-yellow-600 font-bold mr-1 ml-[-5px] h-10 w-10' />}   
                                            Generate From AI
                                        </Button>
                                    </div>
                                    <label className='text-sm font-semibold' htmlFor={`description-${index}`}>Description:</label>
                                    <Textarea
                                        id={`description-${index}`}
                                        value={item.description || ""} // Show the AI-generated summary in the description box
                                        name="description"
                                        onChange={(event) => handleChange(index, event)}
                                    />
                                </div>

                                <div className='flex md:justify-end md:gap-x-4 gap-3 justify-end col-span-2 mt-3'>
                                    {index > 0 &&
                                        <Button onClick={() => RemoveProject(index)} className="flex bg-red-800 items-center">
                                            <FiDelete className='mr-1 ml-[-4px]' size={"20px"} /> Remove
                                        </Button>
                                    }
                                    <Button onClick={AddNewProject} className="flex items-center">
                                        <PlusIcon size={"20px"} className='mr-1 ml-[-4px]' /> Add New Project
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
        </div>
    );
};

export default Projects;
