import React, { useContext, useState } from 'react';
import { ResumeInfoContext } from '../context/ResumeInfoContext';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LoaderCircleIcon, SaveIcon } from 'lucide-react';
import { useParams } from 'react-router-dom';
import GlobleApi from '../service/GlobleApi';
import { toast, Toaster } from 'sonner';
import PreviewBtn from '../dashbord/resume/[resumeId]/edit/PreviewBtn';

const PersonalDetails = ({ setEnableNext }) => {
    let { resumeId } = useParams(); // Destructure resumeId
    const [formData, setFormData] = useState({});
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const [isLoading, setIsLoading] = useState(false);


    function PersonalDetail(target) {
        setEnableNext(false);
        let { name, value } = target;

        setFormData({ ...formData, [name]: value });
        setResumeInfo({ ...resumeInfo, [name]: value });
    }

    const onSave = (e) => {
        setIsLoading(true);
        e.preventDefault();
        const data = {
            data: formData,  // Wrapping the formData in a 'data' object
        };

        // setResumeInfo({...resumeInfo,...formData })
        GlobleApi.UpdateResumeDetail(resumeId, data)
            .then(
                (resp) => {

                    setIsLoading(false);
                    setEnableNext(true);
                    toast("✅ Details updated");
                    // setResumeInfo(resp.data.attributes)
                    // console.log(resp.data.attributes);
                },
                (error) => {
                    console.log(resp);
                    setIsLoading(false);
                    setEnableNext(true);
                    toast("👽 Error updating resume:", error);

                }
            );
    };
    // console.log("Resume ID:", resumeId);


    return (
        <div className='shadow-lg w-[95vw] overflow-hidden md:w-auto md:p-5 p-3 border-t-purple-500 border-t-4 mt-10 rounded-2xl'>
            
            <h2 className='font-bold text-lg'>Personal Details</h2>
            <h2 className='font-medium'>Get Started with the basic information</h2>
            <div className=''>

            
            </div>
            <form onSubmit={onSave}>
                <div className='grid grid-cols-2 gap-3 mt-5'>
                    <div>
                        <label className='text-sm font-semibold' htmlFor="fName">First Name:</label>
                        <Input
                            onChange={(e) => PersonalDetail(e.target)}
                            name="firstName"
                            required
                            defaultValue={resumeInfo?.firstName}
                            placeholder="Ex : Shubham"
                        />
                    </div>
                    <div>
                        <label className='text-sm font-semibold' htmlFor="lName">Last Name:</label>
                        <Input
                            onChange={(e) => PersonalDetail(e.target)}
                            name="lastName"
                            required
                            defaultValue={resumeInfo?.lastName}
                            placeholder="Ex : Thakur"
                        />
                    </div>
                    <div className='col-span-2'>
                        <label className='text-sm font-semibold' htmlFor="jobTitle">Job Title:</label>
                        <Input
                            onChange={(e) => PersonalDetail(e.target)}
                            name="jobTitle"
                            required
                            defaultValue={resumeInfo?.jobTitle}
                            placeholder="Ex : Front End Developer"
                        />
                    </div>
                    <div className='col-span-2'>
                        <label className='text-sm font-semibold' htmlFor="address">Address:</label>
                        <Input
                            onChange={(e) => PersonalDetail(e.target)}
                            name="address"
                            required
                            defaultValue={resumeInfo?.address}
                            placeholder="Ex : Himachal Pradesh, Sirmour, India"
                        />
                    </div>
                    <div>
                        <label className='text-sm font-semibold' htmlFor="phone">Phone no:</label>
                        <Input
                            onChange={(e) => PersonalDetail(e.target)}
                            name="phone"
                            required
                            type="phone"
                            maxLength={10}
                            placeholder="Ex : 78XXXXXXXX"
                            defaultValue={resumeInfo?.phone}

                        />
                        <input type="text " />
                    </div>
                    <div>
                        <label className='text-sm font-semibold' htmlFor="email">Email:</label>
                        <Input
                            onChange={(e) => PersonalDetail(e.target)}
                            name="email"
                            required
                            type="email"
                            placeholder="example@gmail.com"
                            defaultValue={resumeInfo?.email}
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
