import React, { useEffect, useState } from 'react'
import AddResume from './AddResume'
import GlobleApi from './../service/GlobleApi'
import { useUser } from '@clerk/clerk-react'
import ResumeCardItem from './resume/ResumeCardItem'
const Dashbord = () => {
  const { user } = useUser()

  const [resumeList, SetResumeList] = useState()
  useEffect(() => {
    user && GetResumeList()
  }, [user])

  const GetResumeList = () => {
    GlobleApi.GetUserResume(user?.primaryEmailAddress?.emailAddress).then(res => {
      if (res.data.length != 0) {
        SetResumeList(res?.data)
        console.log(res.data.attributes)
      }

    }, (error) => console.log(error))

  }


  return (
    <div>
      <h1 className='text-center text-2xl text-black/80 md:text-3xl font-bold mt-7 mb-2 '>My Resume</h1>
      <p className='text-center font-semibold text-lg md:text-xl text-zinc-950/70'>Start Creating AI resume to your  next job role</p>
      <div className='grid mt-10 place-items-center grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 md:gap-y-9 gap-y-4 md:gap-x-6 gap-x-3 md:w-[90%] mx-auto w-full justify-center px-3'>

        <AddResume />

        {resumeList && resumeList.map((resume, index) => {
          // console.log(resume.firstName)
          return <div key={index} >
            <ResumeCardItem resume={resume} index={index} refreshData={GetResumeList} />
          </div>
        })}

      </div>

    </div>
  )
}

export default Dashbord