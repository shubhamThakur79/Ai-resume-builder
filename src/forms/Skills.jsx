import React, { useContext, useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { ResumeInfoContext } from '../context/ResumeInfoContext';
import { Button } from "@/components/ui/button";
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';
import { LoaderCircleIcon, PlusIcon, SaveIcon } from 'lucide-react';
import { FiDelete } from 'react-icons/fi';
import { useParams } from 'react-router-dom';
import GlobleApi from '../service/GlobleApi';
import { toast } from 'sonner';

const Skills = ({ setEnableNext }) => {
    const [skillList, setSkillList] = useState([{ name: "", rating: 0 }]);
    const [isLoading, setIsLoading] = useState(false);
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const { resumeId } = useParams();

    // Fetch saved data from backend when component mounts
    useEffect(() => {
        if (resumeId) {
            setIsLoading(true);
            GlobleApi.GetResumeById(resumeId).then(
                (response) => {
                    const savedSkills = response.data?.skills || [{ name: "", rating: 0 }];
                    setSkillList(savedSkills);
                    setResumeInfo((prev) => ({ ...prev, skills: savedSkills }));
                    setIsLoading(false);
                },
                (error) => {
                    setIsLoading(false);
                    console.error("Error fetching resume data:", error);
                }
            );
        }
    }, [resumeId, setResumeInfo]);  // Only fetch data when resumeId changes

    // Sync skillList with resumeInfo, but only set state if resumeInfo has changed
    useEffect(() => {
        if (resumeInfo && resumeInfo.skills) {
            setSkillList(resumeInfo.skills.length ? resumeInfo.skills : [{ name: "", rating: 0 }]);
        }
    }, []);  // Update skillList when resumeInfo changes

    // Update resumeInfo when skillList changes
    useEffect(() => {
        setResumeInfo((prev) => ({ ...prev, skills: skillList }));
    }, [skillList, setResumeInfo]);

    function handleChange(index, name, value) {
        setEnableNext(false);
        const newEntries = [...skillList];
        newEntries[index] = { ...newEntries[index], [name]: value };
        setSkillList(newEntries);
    }

    function AddNewSkill() {
        setSkillList([...skillList, { name: "", rating: 0 }]);
    }

    function RemoveSkill(index) {
        if (skillList.length > 1) {
            setSkillList(skillList.filter((_, i) => i !== index));
        }
    }

    function onSave() {
        setIsLoading(true);

        const data = {
            data: {
                skills: skillList
            }
        };

        GlobleApi.UpdateResumeDetail(resumeId, data).then(
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
    }

    return (
        <div className='w-[100vw] md:w-auto'>
            <div className='shadow-lg p-3 md:p-5 border-t-purple-500 border-t-4 mt-10 rounded-2xl'>
                <h2 className='font-bold text-lg'>Skills</h2>
                <h2 className='font-medium'>Add Your Top Professional Skills</h2>
                <div>
                    {skillList.map((skillItem, index) => (
                        <div key={index} className='my-5 flex justify-between items-center p-2 md:p-3 border md:gap-3 rounded-lg'>
                            <div>
                                <label htmlFor="">Name:</label>
                                <Input
                                    placeholder="Ex: React JS"
                                    value={skillItem.name}
                                    onChange={(e) => handleChange(index, "name", e.target.value)}
                                />
                            </div>
                            <div className='mt-3'>
                                <Rating
                                    style={{ maxWidth: 150 }}
                                    value={skillItem.rating}
                                    onChange={(value) => handleChange(index, "rating", value)}
                                />
                            </div>
                        </div>
                    ))}
                    <div className='flex mt-[-5px] justify-end gap-x-4 mb-3'>
                        {skillList.length > 1 && (
                            <Button variant="outline" onClick={() => RemoveSkill(skillList.length - 1)} className="flex text-[#9845eb] items-center">
                                <FiDelete className='mr-1 ml-[-4px]' size={"20px"} /> Remove
                            </Button>
                        )}
                        <div className='hidden md:block'>
                            <Button variant="outline" onClick={AddNewSkill} className="flex items-center text-[#9845ebf1]">
                                <PlusIcon size={"20px"} className='mr-1 ml-[-4px]' /> Add more Skill
                            </Button>
                        </div>
                        <Button variant="outline" onClick={AddNewSkill} className="flex md:hidden items-center text-[#653594]">
                            <PlusIcon size={"20px"} className='mr-1 ml-[-4px]' /> Add
                        </Button>
                        <Button type="submit" onClick={onSave} className="bg-purple-600 flex items-center gap-1" disabled={isLoading}>
                            {isLoading ? <LoaderCircleIcon className='animate-spin' /> : <SaveIcon size={"20px"} />}
                            Save
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Skills;
