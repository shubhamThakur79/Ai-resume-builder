import React, { useContext, useState } from 'react'
import PersonalDetails from '../../../forms/PersonalDetails'
import { Button } from "../../../components/ui/button"
import { ArrowLeft, ArrowRight, Flag, Home, LayoutGrid } from 'lucide-react'
import Summery from '../../../forms/Summery'
import Experience from '../../../forms/Experience'
import Education from '../../../forms/Education'
import Skills from '../../../forms/Skills'
import { Link, Navigate, useParams } from 'react-router-dom'
// import ViewResume from '../../../my-Resume/[resumeId]/view'
import PreviewBtn from '../[resumeId]/edit/PreviewBtn'
import ThemeColor from './ThemeColor'
import Projects from '../../../forms/Projects'
import { ToggleExperience } from '../../../context/ResumeInfoContext'

const FormSection = () => {
  const [activeIndex, setActiveIndex] = useState(1)
  const [enableNext, setEnableNext] = useState(false)
  let { resumeId } = useParams()
  const { toggle, setToggle } = useContext(ToggleExperience)

  let Option = '';
  if (toggle) {
    Option = "Add Experience";
  }
  else {
    Option = "Add Project";
  }

  return (

    <div className='md:p-6 p-2'>

      <div className='flex justify-between items-center mt-3 md:mt-2'>
        <div className="flex md:gap-3  gap-2">
          <Link to="/dashbord">

            <Button className="bg-purple-500"><Home /></Button>
          </Link>
          <ThemeColor />
        </div>
        <div className='flex gap-1'>

          {activeIndex > 1 && <Button onClick={() => {
            setActiveIndex(activeIndex - 1)
          }} className="flex gap-1 items-center"><ArrowLeft size={"20px"} /> Prev</Button>}
          <Button onClick={() => {
            setActiveIndex(activeIndex + 1)
          }} className="flex bg-purple-500 text-white items-center gap-1" variant="outline" disabled={!enableNext} > Next <ArrowRight size={"20px"} /></Button>

        </div>

      </div>
      {/* <div className='flex justify-end mb-[-20px]'>
        {activeIndex === 3 && <Button className=" mt-3" onClick={() => setToggle(!toggle )}>{Option}</Button>}
        {console.log(toggle)}


      </div> */}


      <div className=' bg-white relative h-max'>
        {/* personal details  form*/}

        {activeIndex === 1 && <PersonalDetails setEnableNext={(v) => setEnableNext(v)} />}

        {/* Summery for job form */}

        {activeIndex === 2 && <Summery setEnableNext={(v) => setEnableNext(v)} />}

        {/* Professional experience form*/}

        {activeIndex === 3 &&  <Education setEnableNext={(v) => setEnableNext(v)} />  }

        {/* Education  form*/}
        {activeIndex === 4 && <Projects setEnableNext={(v) => setEnableNext(v)} />}

        {/* && <Experience setEnableNext={(v) => setEnableNext(v)} /> */}
        {/* Skill form */}
        {activeIndex === 5 && <Skills setEnableNext={(v) => setEnableNext(v)} />}

        {/* {"view Download page"} */}
        {activeIndex === 6 && <div className='mt-6'>
          <h2 className='md:text-center text-center text-xl md:text-2xl font-medium mb-2'>Congrats! Your Ultimate AI generates resume is ready !</h2>
          <p className='text-gray-600 text-center'>Now you are ready to download your resume and you can share your resume Url with your friends and family</p>
          <h1 className='text-center mt-3'>Click On Preview TO Check Your Resume</h1>
          <div className='flex justify-center items-center mt-4'>

          <PreviewBtn />
          </div>
        </div>  }

      {activeIndex === 6 ?   null  :   <div className="fixed bottom-2 left-1 z-40">
          <PreviewBtn />
        </div>
}
      </div>
    </div>
  )
}

export default FormSection