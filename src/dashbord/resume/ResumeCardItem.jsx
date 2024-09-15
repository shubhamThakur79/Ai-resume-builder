import { Loader, Loader2, MoreVertical, NotebookPen, Thermometer } from 'lucide-react';
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import GlobleApi from '../../service/GlobleApi';
import { ResumeInfoContext } from '../../context/ResumeInfoContext';
import FormSection from './component/FormSection';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { toast } from 'sonner';



const ResumeCardItem = ({ resume, index, refreshData }) => {
    // Access context values
    const context = useContext(ResumeInfoContext);
    const { resumeInfo, setResumeInfo } = context || {};
    const [openAlert, setOpenAlert] = useState(false)
    const [isLoading, setLoading] = useState(false)
    // Get user information from Clerk
    const { user } = useUser();

    // Handle click to set resume info
    const handleClick = () => {
        setResumeInfo({ ...resumeInfo + resume.attributes })
        console.log(resume?.attributes)
    }

    let navigate = useNavigate()

    function refreshData() {
        window.location.reload();
    }


    function onDelete() {
        setLoading(true)
        GlobleApi.DeleteResumeById(resume?.id).then(resp => {
            // let resumeId = resume?.id;
            console.log(resp)
            setTimeout(() => {
                refreshData()
            }, 2000)





        }, (err) => {
            setLoading(false)
            toast("somthing went wrong?", err)
        })
    }
    return (
        <div className='' key={index}>
            <Link to={`/dashbord/resume/${resume?.id}/edit`}>
                <div className='md:px-24 px-[70px] md:h-[240px] class="h-14 bg-gradient-to-t from-[#a955f7b4] to-[#87A9FF] hover:bg-gray-300 duration-200 border-gray-500 border-black/50  hover:border-black/70 hover:scale-105 transition-all hover:shadow-md   bg-slate-400/70 md:py-24 py-[77px] rounded-xl cursor-pointer'>
                    <NotebookPen />
                    <div>

                    </div>
                </div>
            </Link>
            <div className="flex dark:text-white text-white/80  px-2 rounded-bl-lg rounded-br-xl mt-[-6px] justify-between items-center " style={{ backgroundColor: resumeInfo?.themeColor || "#db1b1b" }}>
                <h1 className='text-center font-semibold capitalize mt-1' >{resume?.attributes?.title}</h1>
                <div className='mt-2'>
                    <DropdownMenu>
                        <DropdownMenuTrigger><MoreVertical className='h-4 w-4 cursor-pointer' /></DropdownMenuTrigger>
                        <DropdownMenuContent>

                            <DropdownMenuItem onClick={() => navigate("/dashbord/resume/" + resume?.id + "/edit")}>Edit </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => navigate("/my-resume/" + resume?.id + "/view")} >Download</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => navigate("/my-resume/" + resume?.id + "/view")}>View</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setOpenAlert(true)} >Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                </div>
            </div>


            <AlertDialog open={openAlert}>

                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete your account
                            and remove your data from our servers.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setOpenAlert(false)} className="px-4 py-2 border rounded-lg">Cancel</AlertDialogCancel>
                        {isLoading ? (
                            <div className="bg-red-600 py-2 px-6 font-semibold rounded-lg text-white">
                                <Loader2 className="animate-spin " size={"25px"} />

                            </div>
                        ) : (
                            <AlertDialogAction
                                disabled={isLoading}
                                onClick={onDelete}
                                className="bg-red-600 py-2 px-4 font-semibold rounded-lg text-white"
                            >
                                Continue
                            </AlertDialogAction>
                        )}

                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>



        </div>
    );
};

export default ResumeCardItem;
