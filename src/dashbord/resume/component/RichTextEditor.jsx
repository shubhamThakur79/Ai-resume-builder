import React, { useContext, useState } from 'react';
import { WiStars } from 'react-icons/wi';
import {
    BtnBold, BtnBulletList, BtnClearFormatting, BtnItalic, BtnLink,
    BtnNumberedList, BtnRedo, BtnStrikeThrough, BtnStyles, BtnUnderline,
    BtnUndo, Editor, EditorProvider, HtmlButton, Separator, Toolbar
} from 'react-simple-wysiwyg';
import { Button } from "../../../components/ui/button"
import { ResumeInfoContext } from '../../../context/ResumeInfoContext';
import { toast } from 'sonner';
import { AIChatSession } from '../../../service/AiModel';
import { CgSpinner } from 'react-icons/cg';
import { Loader } from 'lucide-react';

let PROMPT = "position title : {positionTitle} depends on position title give 3 to 4 bullet points for my resume experience in resume , give me result in HTML format"




const RichTextEditor = ({ onRichTextEditorChange, index,defaultValue}) => {
    const [values, setValues] = useState(defaultValue);
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext)
    const [summery, setSummery] = useState(resumeInfo?.experience[0]?.workSummary || "")
    const [isLoading, setIsLoading] = useState(false)
    const [aiGeneratedSummery, setAiGeneratedSummery] = useState("")


    const GenerateSummeryFromAI = async () => {
        setIsLoading(true)

        // let jobTitle = !resumeInfo?.experience[index]?.title ? toast("Plese enter you job title") : resumeInfo?.experience[index]?.title
        const prompt = PROMPT.replace("{positionTitle}", !resumeInfo?.experience[index]?.title ? toast("Plese enter you job title") : resumeInfo?.experience[index]?.title);
        console.log(prompt)
        const result = await AIChatSession.sendMessage(prompt)

        const aiText = await result?.response?.text() || "" // Get AI-generated text
        console.log(aiText)
        setSummery(aiText)
        // setValues(aiText) // Update the summary state with AI-generated content
        setIsLoading(false)

        setValues(aiGeneratedSummery.replace("[").replace("]"), "")
    }

    const handleEditorChange = (e) => {
        setValues(e.target.value);  // Update the state
        onRichTextEditorChange(e);  // Pass the change to the parent handler
    };

    
    return (
        <div key={index}>

            <div className='flex justify-end  my-2'>

                <Button

                    onClick={(e) => {
                        e.preventDefault()
                        GenerateSummeryFromAI()
                    }}
                    variant={'secondary'}
                    className="text-[#8e2de9] border-[1px] border-[#a955f762] font-semibold text-[16px] flex items-center justify-center"
                >
                    {isLoading ? <Loader size={"15px"} className=' animate-spin font-bold mr-1 ml-[-5px] h-7 w-10' /> : <WiStars size={"32px"} className='text-yellow-600 font-bold mr-1 ml-[-5px] h-10 w-10' />}   Generate From AI
                </Button>
            </div>
            <EditorProvider>
                <Editor
                    value={values}
                    onChange={handleEditorChange}  // Correct onChange function
                >
                    
                    <Toolbar>
                        <BtnBold />
                        <BtnItalic />
                        <BtnUndo />
                        <BtnRedo />
                        <Separator />
                        <BtnBold />
                        <BtnItalic />
                        <BtnUnderline />
                        <BtnStrikeThrough />
                        <Separator />
                        <BtnNumberedList />
                        <BtnBulletList />
                        <Separator />
                        <BtnLink />
                    </Toolbar>
                </Editor>
            </EditorProvider>
        </div>
    );
};

export default RichTextEditor;
