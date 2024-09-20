import React, { useContext, useEffect, useState } from 'react';
import { Input } from "@/components/ui/input";
import { ResumeInfoContext } from '../context/ResumeInfoContext';
import { Button } from "@/components/ui/button";
import { LoaderCircleIcon, PlusIcon, SaveIcon } from 'lucide-react';
import { FiDelete } from 'react-icons/fi';
import { Textarea } from "@/components/ui/textarea";
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import GlobleApi from '../service/GlobleApi';

const defaultProject = {
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    liveDemo: ""
};

const Projects = ({ setEnableNext }) => {
    const [projectList, setProjectList] = useState([defaultProject]);
    const [isLoading, setIsLoading] = useState(false);
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    let { resumeId } = useParams();

    // Handle input change for each project field
    const handleChange = (index, e) => {
        setEnableNext(false);
        const { name, value } = e.target;
        const updatedProjects = [...projectList];
        updatedProjects[index] = {
            ...updatedProjects[index],
            [name]: value
        };
        setProjectList(updatedProjects);
    };

    // Add new project entry
    const AddNewProject = () => {
        setProjectList([...projectList, defaultProject]);
    };

    // Remove a project entry
    const RemoveProject = (index) => {
        if (projectList.length === 1) return; // Prevent removing all entries
        const updatedProjects = projectList.filter((_, i) => i !== index);
        setProjectList(updatedProjects);
    };

    // Save project details to API
    const onSave = () => {
        setIsLoading(true);
        const formattedProjectList = projectList.map(project => ({
            ...project,
            startDate: project.startDate ? new Date(project.startDate).toISOString().split('T')[0] : "",
            endDate: project.endDate ? new Date(project.endDate).toISOString().split('T')[0] : "",
        }));

        const data = { data: { projects: formattedProjectList } };
        GlobleApi.UpdateResumeDetail(resumeId, data)
            .then(() => {
                setIsLoading(false);
                toast.success("Project details updated");
                setEnableNext(true);
            })
            .catch((error) => {
                setIsLoading(false);
                console.error("Error updating projects:", error);
                toast.error("Error updating project details");
            });
    };

    // Fetch existing project details once on component mount
    useEffect(() => {
        if (resumeInfo?.projects?.length) {
            setProjectList(resumeInfo.projects);
        }
    }, []);  // Only run when resumeInfo is updated

    // Update resumeInfo context whenever projectList changes
    useEffect(() => {
        if (projectList.length > 0) {
            setResumeInfo(prevInfo => ({ ...prevInfo, projects: projectList }));
        }
    }, [projectList, setResumeInfo]);  // This will trigger only when the projectList changes

    return (
        <div className='w-[95vw] md:w-auto'>
            <div className='shadow-lg p-3 md:p-5 border-t-purple-500 border-t-4 mt-10 rounded-2xl'>
                <h2 className='font-bold text-lg'>Projects</h2>
                <h2 className='font-medium'>Add Your Project Details</h2>

                <div>
                    {projectList.map((item, index) => (
                        <div key={index} className='grid grid-cols-2 my-5 p-3 border gap-3 rounded-lg'>
                            <div>
                                <label htmlFor={`title-${index}`}>Project Title:</label>
                                <Input
                                    id={`title-${index}`}
                                    value={item.title}
                                    placeholder={`Ex: Web App Development`}
                                    name="title"
                                    onChange={(e) => handleChange(index, e)}
                                />
                            </div>
                            <div>
                                <label htmlFor={`startDate-${index}`}>Start Date:</label>
                                <Input
                                    id={`startDate-${index}`}
                                    value={item.startDate || ""}
                                    type="date"
                                    name="startDate"
                                    onChange={(e) => handleChange(index, e)}
                                />
                            </div>
                            <div>
                                <label htmlFor={`endDate-${index}`}>End Date:</label>
                                <Input
                                    id={`endDate-${index}`}
                                    value={item.endDate || ""}
                                    type="date"
                                    name="endDate"
                                    onChange={(e) => handleChange(index, e)}
                                />
                            </div>
                            <div>
                                <label htmlFor={`liveDemo-${index}`}>Live Demo:</label>
                                <Input
                                    id={`liveDemo-${index}`}
                                    value={item.liveDemo}
                                    type="text"
                                    name="liveDemo"
                                    onChange={(e) => handleChange(index, e)}
                                    placeholder="Your project live link"
                                />
                            </div>
                            <div className='col-span-2'>
                                <label htmlFor={`description-${index}`}>Description:</label>
                                <Textarea
                                    id={`description-${index}`}
                                    value={item.description || ""}
                                    name="description"
                                    onChange={(e) => handleChange(index, e)}
                                    placeholder="Describe your project"
                                />
                            </div>
                            <div className='flex justify-end col-span-2 mt-3'>
                                {index > 0 && (
                                    <Button onClick={() => RemoveProject(index)} className="flex bg-red-800 items-center">
                                        <FiDelete className='mr-1' size={"20px"} /> Remove
                                    </Button>
                                )}
                                <Button onClick={AddNewProject} className="flex items-center">
                                    <PlusIcon size={"20px"} className='mr-1' /> Add New Project
                                </Button>
                                <Button onClick={onSave} className="bg-purple-600 flex items-center gap-1" disabled={isLoading}>
                                    {isLoading ? <LoaderCircleIcon className='animate-spin' /> : <SaveIcon size={"20px"} />}
                                    Save
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Projects;
