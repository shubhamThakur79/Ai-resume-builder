import React, { useContext, useEffect, useState } from 'react';
import { ResumeInfoContext } from '../context/ResumeInfoContext';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { Loader, LoaderCircleIcon, PlusIcon, SaveIcon } from 'lucide-react';
import { FiDelete } from 'react-icons/fi';
import GlobleApi from '../service/GlobleApi';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';

const Education = ({ setEnableNext }) => {
    const defaultEducation = {
        universityName: "",
        degree: "",
        city: "",
        state: "",
        startDate: "",
        endDate: "",
        summary: ""
    };

    const [educationDetails, setEducationDetails] = useState([defaultEducation]);
    const [isLoading, setIsLoading] = useState(false);
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    let { resumeId } = useParams();

    // Handle input change
    function handleChange(event, index) {
        setEnableNext(false);
        const { name, value } = event.target;
        const updatedEntries = [...educationDetails];
        updatedEntries[index] = {
            ...updatedEntries[index],
            [name]: value
        };
        setEducationDetails(updatedEntries);
    }

    // Add new education entry
    function AddNewEducation() {
        setEducationDetails([...educationDetails, defaultEducation]);
    }

    // Remove education entry
    function RemoveEducation(i) {
        if (educationDetails.length === 1) return;
        const updatedEntries = educationDetails.filter((_, index) => index !== i);
        setEducationDetails(updatedEntries);
    }

    // Save education details
    function onSave() {
        setIsLoading(true);
        const data = {
            data: {
                education: educationDetails
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
                toast(`👽 Error updating resume: ${error.message}`);
            });
    }

    // Update resume info whenever educationDetails change
    useEffect(() => {
        setResumeInfo({ ...resumeInfo, education: educationDetails });
    }, [educationDetails]);

    // Initialize the education form with resumeInfo if available, or use default for new users
    useEffect(() => {
        if (resumeInfo?.education?.length) {
            setEducationDetails(resumeInfo.education);
        } else {
            setEducationDetails([defaultEducation]);
        }
    }, []);

    return (
        <div className='w-[100vw] md:w-auto'>
            <div className='shadow-lg p-5 border-t-purple-500 border-t-4 mt-10 rounded-2xl'>
                <h2 className='font-bold text-lg'>Education</h2>
                <h2 className='font-medium'>Add Your Educational details</h2>

                <div>
                    {educationDetails.map((item, index) => (
                        <div key={index} className='grid grid-cols-2 my-5 p-3 border gap-3 rounded-lg'>
                            <div>
                                <label htmlFor="universityName">University Name:</label>
                                <Input
                                    defaultValue={item.universityName || ""}
                                    placeholder="Ex: hgpi"
                                    type="text"
                                    name="universityName"
                                    onChange={(e) => handleChange(e, index)}
                                />
                            </div>
                            <div>
                                <label htmlFor="degree">Degree:</label>
                                <Input
                                    defaultValue={item.degree || ""}
                                    placeholder="Ex: BCA"
                                    type="text"
                                    name="degree"
                                    onChange={(e) => handleChange(e, index)}
                                />
                            </div>
                            <div>
                                <label htmlFor="city">City:</label>
                                <Input
                                    defaultValue={item.city || ""}
                                    placeholder="Ex: Kala Amb"
                                    type="text"
                                    name="city"
                                    onChange={(e) => handleChange(e, index)}
                                />
                            </div>
                            <div>
                                <label htmlFor="state">State:</label>
                                <Input
                                    defaultValue={item.state || ""}
                                    placeholder="Ex: Himachal Pradesh"
                                    type="text"
                                    name="state"
                                    onChange={(e) => handleChange(e, index)}
                                />
                            </div>
                            <div>
                                <label htmlFor="startDate">Start Date:</label>
                                <Input
                                    defaultValue={item.startDate || ""}
                                    type="date"
                                    name="startDate"
                                    placeholder="Ex: 2022"
                                    onChange={(e) => handleChange(e, index)}
                                />
                            </div>
                            <div>
                                <label htmlFor="endDate">End Date:</label>
                                <Input
                                    defaultValue={item.endDate || ""}
                                    type="date"
                                    name="endDate"
                                    placeholder="Ex: 2025"
                                    onChange={(e) => handleChange(e, index)}
                                />
                            </div>
                            <div className='col-span-2'>
                                <label htmlFor="summary">Description:</label>
                                <Textarea
                                    onChange={(e) => handleChange(e, index)}
                                    name="summary"
                                    placeholder="Add Summary related to degree"
                                    rows={5}
                                    defaultValue={item.summary || ""}
                                />
                            </div>
                            <div className='flex md:justify-end gap-3 justify-end col-span-2 mt-3'>
                                <Button onClick={() => RemoveEducation(index)} className="flex bg-red-800 items-center">
                                    <FiDelete className='mr-1' size={"20px"} /> Remove
                                </Button>
                                <Button onClick={AddNewEducation} className="flex items-center">
                                    <PlusIcon size={"20px"} className='mr-1' /> Add New Education
                                </Button>
                                <Button type="submit" onClick={onSave} className="bg-purple-600 flex items-center gap-1" disabled={isLoading}>
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

export default Education;
