import React, { useContext } from 'react'
import { Button } from "@/components/ui/button"


import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { LayoutGrid } from 'lucide-react'
import { ResumeInfoContext } from '../../../context/ResumeInfoContext'
import GlobleApi from '../../../service/GlobleApi'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'


const ThemeColor = () => {
    const colors = [
        "#FF6F61", // Coral
        "#6B5B95", // Purple
        "#88B04B", // Green
        "#F7B7A3", // Peach
        "#FFD700", // Gold
        "#FF6347", // Tomato
        "#40E0D0", // Turquoise
        "#8A2BE2", // BlueViolet
        "#FF1493", // DeepPink
        "#C71585", // MediumVioletRed
        "#272626c0", // LightSeaGreen
        "#FF4500", // OrangeRed
        "#00CED1", // DarkTurquoise
        "#FF8C00", // DarkOrange
        "#DA70D6", // Orchid
        "#D2691E", // Chocolate
        "#000", // MediumSpringGreen
        "#FF00FF", // Fuchsia
    ];
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    let { resumeId } = useParams()

    function onSelectTheme(color) {
        setResumeInfo({ ...resumeInfo, themeColor: color });

        const data = {
            data: {
                themeColor: color,
            }
        };

        console.log("Updating theme color with data:", data);  // Debugging

        GlobleApi.UpdateResumeDetail(resumeId, data)
            .then(resp => {
                console.log("API response:", resp);  // Check the API response
                toast("Theme color updated");
            })
            .catch(err => {
                console.error("Error updating theme color:", err);  // Log the error
                toast("Something went wrong! Try again later :)");
            });
    }



    return (
        <div>

            <Popover>
                <PopoverTrigger asChild>
                    <Button variant="outline" className="flex items-center gap-1"><LayoutGrid size={"20px"} /> Theme</Button>

                </PopoverTrigger>

                <PopoverContent>
                    <h2 className='mt-1 mb-1 font-semibold' >Select Theme Color</h2>
                    <div className='flex flex-wrap gap-4 cursor-pointer'>
                        {colors.map((color, i) => {
                            return <div key={i} onClick={() => onSelectTheme(color)} className=' '>
                                <p style={{ backgroundColor: color }} className={`rounded-full  hover:border hover:border-black  h-7 w-7`}>{ }</p>
                            </div>
                        })}
                    </div>
                </PopoverContent>
            </Popover>

        </div>
    )
}

export default ThemeColor