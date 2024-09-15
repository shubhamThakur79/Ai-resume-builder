import { Loader, Loader2, PlusSquare } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { v4 as uuidv4 } from 'uuid';
// import { title } from 'process'
import { useUser } from '@clerk/clerk-react';
import GlobleApi from './../service/GlobleApi'
import { useNavigate } from 'react-router-dom'
import { ResumeIdContext } from '../context/ResumeInfoContext'

const AddResume = () => {
    let navigate = useNavigate()
    // globlwe resume id 
    const { resumeId, setResumeId } = useContext(ResumeIdContext)

    const { user } = useUser()
    const [openDialog, setOpenDialog] = useState(false)
    const [resumeTitle, setResumeTitle] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const [id, setId] = useState()
    


    const onCreate = () => {
        setIsLoading(true);
    
        // Generate a new UUID
        let uuid = uuidv4();
    
        // Immediately use the generated uuid, don't rely on the async state update
        setResumeId(uuid || id);
    
        const data = {
            data: {
                title: resumeTitle || alert("enter title for your resume"),
                resumeId: uuid,  // Use the newly generated UUID here
                userEmail: user?.primaryEmailAddress?.emailAddress,
                userName: user?.fullName,
            }
        };
    
        // Call the API with the generated UUID
        GlobleApi.createNewResume(data).then(res => {
            console.log(res);
            const newResumeId = res?.data?.id || uuid;  // Use the response ID or fallback to uuid
            setId(newResumeId);  // Set the new ID
            
            if (res) {
                setIsLoading(false);
                // Navigate using the newResumeId
                navigate("/dashbord/resume/" + res?.data?.id  + "/edit");
            }
        }, (error) => setIsLoading(false));
    };
    

    return (
        <div className='flex flex-col'>

            <div onClick={() => setOpenDialog(true)} className='md:px-24 px-[70px] cursor-pointer md:h-[240px] py-[75px] rounded-xl md:mt-[-10px] md:py-24 bg-gray-200/80 hover:bg-gray-300/70 duration-200 border-gray-500 border-dashed hover:border hover:border-black/70 hover:scale-105 transition-all hover:shadow-md  border  flex items-start justify-center'>
                <PlusSquare className=' ' />
            </div>
            <Dialog open={openDialog}>

                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create New Resume </DialogTitle>
                        <DialogDescription className="">
                            add title for your new resume
                        </DialogDescription>
                        <Input onChange={(e) => setResumeTitle(e.target.value)} className="my-2" placeholder="Ex : Full Stack Resume" />

                        <div className='flex justify-end gap-x-5 gap-y-5'>
                            <div onClick={() => setOpenDialog(false)}>
                                <Button variant="outline" >Cancle</Button>
                            </div>

                            <div onClick={onCreate}>
                                {
                                    <Button disabled={!resumeTitle || isLoading} className="bg-[#5417D7] px-5 tracking-widest" >{isLoading ? <Loader className='animate-spin'></Loader> : "Create"}</Button>
                                }


                            </div>
                        </div>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
            <div>
                <h1 className='font-semibold text-center mt-1'>Create New</h1>
            </div>

        </div>


    )
}

export default AddResume