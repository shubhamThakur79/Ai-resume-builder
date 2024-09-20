import { Loader, PlusSquare } from 'lucide-react';
import React, { useContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { nanoid } from 'nanoid'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "../components/ui/dialog";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { useUser } from '@clerk/clerk-react';
import { createNewResume } from './../service/GlobleApi'; // Import createNewResume function
import { useNavigate } from 'react-router-dom';
import { ResumeIdContext } from '../context/ResumeInfoContext';
import nextId from 'react-id-generator';

const AddResume = ({ onResumeAdded, resume }) => {
    const { user } = useUser();
    const [openDialog, setOpenDialog] = useState(false);
    const [resumeTitle, setResumeTitle] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { resumeId, setResumeId } = useContext(ResumeIdContext);
    const navigate = useNavigate();

    // Function to handle resume creation
    const handleCreateResume = async (resumeData) => {
        try {
            console.log("Creating resume with data:", resumeData);
            setIsLoading(true);
            await createNewResume(resumeData);
            console.log("Resume created successfully");
            setIsLoading(false);
            setOpenDialog(false);
            if (onResumeAdded) onResumeAdded();
        } catch (error) {
            console.error("Error creating resume:", error);
            setIsLoading(false);
        }
    };

    // Function called when "Create" button is clicked
    const onCreate = () => {
        if (!resumeTitle || !user?.primaryEmailAddress?.emailAddress) return;

        // Generate a new ID
        let newResumeId = nanoid(); // Use uuidv4() if needed
        newResumeId = String(resumeId);

        // Set resumeId in context
        setResumeId(newResumeId);

        // Create resume data using newResumeId directly
        const resumeData = {
            title: resumeTitle,
            resumeId: newResumeId, // Use newResumeId here instead of resumeId from context
            email: user?.primaryEmailAddress?.emailAddress,
        };

        // Handle resume creation
        handleCreateResume(resumeData);

        // Navigate to the edit page using newResumeId
        navigate(`/dashbord/resume/${newResumeId}/edit`);

        console.log(newResumeId); // This will log the correct newResumeId
    };

    return (
        <div className='flex flex-col'>
            <div
                onClick={() => setOpenDialog(true)}
                className='md:px-24 px-[70px] cursor-pointer md:h-[240px] py-[75px] rounded-xl md:mt-[-10px] md:py-24 bg-gray-200/80 hover:bg-gray-300/70 duration-200 border-gray-500 border-dashed hover:border hover:border-black/70 hover:scale-105 transition-all hover:shadow-md border flex items-start justify-center'
            >
                <PlusSquare />
            </div>
            <Dialog open={openDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create New Resume</DialogTitle>
                        <DialogDescription className="">
                            Add a title for your new resume
                        </DialogDescription>
                        <Input
                            onChange={(e) => setResumeTitle(e.target.value)}
                            className="my-2"
                            placeholder="Ex: Full Stack Resume"
                        />
                        <div className='flex justify-end gap-x-5 gap-y-5'>
                            <div onClick={() => setOpenDialog(false)}>
                                <Button variant="outline">Cancel</Button>
                            </div>
                            <div onClick={onCreate}>
                                <Button
                                    disabled={!resumeTitle || isLoading}
                                    className="bg-[#5417D7] px-5 tracking-widest"
                                >
                                    {isLoading ? <Loader className='animate-spin' /> : "Create"}
                                </Button>
                            </div>
                        </div>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
            <div>
                <h1 className='font-semibold text-center mt-1'>Create New</h1>
            </div>
        </div>
    );
};

export default AddResume;
