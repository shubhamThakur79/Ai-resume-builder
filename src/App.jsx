
import { Navigate, Outlet } from "react-router-dom"
import Header from "./custom/Header"
import { Toaster } from "@/components/ui/sonner"
import { ResumeIdContext } from "./context/ResumeInfoContext"
import { useState } from "react"

export default function App() {
  const [resumeId, setResumeId] = useState()
  return (
    <div>
      <ResumeIdContext.Provider value={{ resumeId, setResumeId }} >

        <Header />
        <Toaster />
        <Outlet />
      </ResumeIdContext.Provider>
    </div>
  )

  // }

  // console.log(user)

}
