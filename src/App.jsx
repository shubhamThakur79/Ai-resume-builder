
import { Navigate, Outlet } from "react-router-dom"
import Header from "./custom/Header"
import { Toaster } from "./components/ui/sonner"
import { ResumeIdContext, ResumeInfoContext, ToggleExperience, TogglePreview } from "./context/ResumeInfoContext"
import { useState } from "react"


export default function App() {
  const [resumeId, setResumeId] = useState()
  const [resumeInfo, setResumeInfo] = useState()
    const [isClicked, setIsClicked] = useState(false)
    const [toggle, setToggle] = useState(false)


  return (
    <div>
      <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
        <TogglePreview.Provider value={{ isClicked, setIsClicked }}>
          <ToggleExperience.Provider value={{ toggle, setToggle }}>
            <ResumeIdContext.Provider value={{ resumeId, setResumeId }} >

              <Header />
              <Toaster />
              <Outlet />
            </ResumeIdContext.Provider>
          </ToggleExperience.Provider>
        </TogglePreview.Provider>
      </ResumeInfoContext.Provider>
    </div>
  )

  // }

  // console.log(user)

}
