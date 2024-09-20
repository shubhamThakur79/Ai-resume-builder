import React, { useContext, useState, useEffect } from 'react';
import { ResumeInfoContext } from '../context/ResumeInfoContext';
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { LoaderCircleIcon, SaveIcon } from 'lucide-react';
import { useParams } from 'react-router-dom';
import GlobleApi from '../service/GlobleApi';
import { toast } from 'sonner';

const PersonalDetails = ({ setEnableNext }) => {
    let { resumeId } = useParams(); // Destructure resumeId
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const [formData, setFormData] = useState(resumeInfo || {}); // Initialize with resumeInfo
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // Set formData with resumeInfo when the component mounts or refocuses
        setFormData(resumeInfo);
    }, [resumeInfo]);

    const handleInputChange = (e) => {
        setEnableNext(false);
        const { name, value } = e.target;

        // Update both formData and context with new values
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
        setResumeInfo((prevResumeInfo) => ({
            ...prevResumeInfo,
            [name]: value,
        }));
    };

    const onSave = (e) => {
        e.preventDefault();
        setIsLoading(true);

        const data = {
            data: formData, // Wrapping the formData in a 'data' object
        };

        GlobleApi.UpdateResumeDetail(resumeId, data)
            .then((resp) => {
                setIsLoading(false);
                setEnableNext(true);
                toast.success("Details updated successfully");
                setResumeInfo((prevInfo) =>
                    Array.isArray(prevInfo) ? [...prevInfo] : data.data
                );
            })
            .catch((error) => {
                console.error("Error updating resume:", error);
                setIsLoading(false);
                setEnableNext(true);
                toast.error("Error updating resume");
            });
    };

    return (
        <div className='shadow-lg w-[95vw] overflow-hidden md:w-auto md:p-5 p-3 border-t-purple-500 border-t-4 mt-10 rounded-2xl'>
            <h2 className='font-bold text-lg'>Personal Details</h2>
            <h2 className='font-medium'>Get Started with the basic information</h2>

            <form onSubmit={onSave}>
                <div className='grid grid-cols-2 gap-3 mt-5'>
                    <div>
                        <label className='text-sm font-semibold' htmlFor="fName">First Name:</label>
                        <Input
                            onChange={handleInputChange}
                            name="firstName"
                            required
                            value={formData?.firstName || ""}
                            placeholder="Ex: Shubham"
                        />
                    </div>
                    <div>
                        <label className='text-sm font-semibold' htmlFor="lName">Last Name:</label>
                        <Input
                            onChange={handleInputChange}
                            name="lastName"
                            required
                            value={formData?.lastName || ""}
                            placeholder="Ex: Thakur"
                        />
                    </div>
                    <div className='col-span-2'>
                        <label className='text-sm font-semibold' htmlFor="jobTitle">Job Title:</label>
                        <Input
                            onChange={handleInputChange}
                            name="jobTitle"
                            required
                            value={formData?.jobTitle || ""}
                            placeholder="Ex: Front End Developer"
                        />
                    </div>
                    <div className='col-span-2'>
                        <label className='text-sm font-semibold' htmlFor="address">Address:</label>
                        <Input
                            onChange={handleInputChange}
                            name="address"
                            required
                            value={formData?.address || ""}
                            placeholder="Ex: Himachal Pradesh, Sirmour, India"
                        />
                    </div>
                    <div>
                        <label className='text-sm font-semibold' htmlFor="phone">Phone No:</label>
                        <Input
                            onChange={handleInputChange}
                            name="phone"
                            required
                            type="phone"
                            maxLength={10}
                            value={formData?.phone || ""}
                            placeholder="Ex: 78XXXXXXXX"
                        />
                    </div>
                    <div>
                        <label className='text-sm font-semibold' htmlFor="email">Email:</label>
                        <Input
                            onChange={handleInputChange}
                            name="email"
                            required
                            type="email"
                            value={formData?.email || ""}
                            placeholder="example@gmail.com"
                        />
                    </div>

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
                </div>
            </form>
        </div>
    );
};

export default PersonalDetails;
