import { Loader, Loader2, MoreVertical, NotebookPen } from 'lucide-react';
import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import GlobleApi from '../../service/GlobleApi';
import { ResumeIdContext, ResumeInfoContext } from '../../context/ResumeInfoContext';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from 'sonner';

const ResumeCardItem = ({ resume, index, refreshData }) => {
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext) || {};
    const { resumeId, setResumeId } = useContext(ResumeIdContext);
    const [openAlert, setOpenAlert] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const { user } = useUser();
    let navigate = useNavigate();

    // Fetch resume data from the backend when the component mounts or resumeId changes
    useEffect(() => {
        if (resumeId) {
            fetchResumeData(resumeId);
        }
    }, [resumeId]);

    const fetchResumeData = async (id) => {
        setLoading(true);
        try {
            const response = await GlobleApi.GetResumeById(id);
            setResumeInfo(response?.data); // Set the fetched resume data into context
            setLoading(false);
        } catch (error) {
            toast.error('Failed to fetch resume data: ' + error.message);
            setLoading(false);
        }
    };

    const onDelete = async () => {
        setLoading(true);
        try {
            await GlobleApi.DeleteResumeById(resume.id);
            toast.success('Resume deleted successfully!');
            refreshData(); // Refresh data after deletion
            setOpenAlert(false);
        } catch (err) {
            toast.error('Something went wrong: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='' key={index}>
            <Link to={`/dashbord/resume/${resume?.id || 'default'}/edit`}>
                <div className='md:px-24 px-[70px] md:h-[240px] class="h-14 bg-gradient-to-t from-[#a955f7b4] to-[#87A9FF] hover:bg-gray-300 duration-200 border-gray-500 border-black/50 hover:border-black/70 hover:scale-105 transition-all hover:shadow-md bg-slate-400/70 md:py-24 py-[77px] rounded-xl cursor-pointer'>
                    <NotebookPen />
                </div>
            </Link>
            <div className="flex dark:text-white text-white/80 px-2 rounded-bl-lg rounded-br-xl mt-[-6px] justify-between items-center " style={{ backgroundColor: resumeInfo?.themeColor || "#db1b1b" }}>
                <h1 className='text-center font-semibold capitalize '>{resume?.title}</h1>
                <div className='mt-2'>
                    <DropdownMenu>
                        <DropdownMenuTrigger><MoreVertical className='h-4 w-4 cursor-pointer' /></DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem onClick={() => navigate(`/dashbord/resume/${resume.id}/edit`)}>Edit</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => navigate(`/my-resume/${resume.id}/view`)}>Download</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => navigate(`/my-resume/${resume.id}/view`)}>View</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setOpenAlert(true)}>Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            <AlertDialog open={openAlert} onOpenChange={setOpenAlert}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete your resume
                            and remove your data from our servers.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setOpenAlert(false)} className="px-4 py-2 border rounded-lg">Cancel</AlertDialogCancel>
                        {isLoading ? (
                            <div className="bg-red-600 py-2 px-6 font-semibold rounded-lg text-white">
                                <Loader2 className="animate-spin" size={"25px"} />
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
