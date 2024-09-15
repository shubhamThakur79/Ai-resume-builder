import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import FormSection from '../../../resume/component/FormSection'
import ResumePreview from '../../../resume/component/ResumePreview'
import { dummyResumeApi } from '../../../../resumeDummyData/dummy'
import { ResumeInfoContext, ToggleExperience, TogglePreview } from '../../../../context/ResumeInfoContext'
import GlobleApi from '../../../../service/GlobleApi'

const EditResume = () => {
    let { resumeId } = useParams()
    const [resumeInfo, setResumeInfo] = useState()
    const [isClicked, setIsClicked] = useState(false)
    const [toggle, setToggle] = useState(false)
    useEffect(() => {
        setResumeInfo(dummyResumeApi)
        GetResumeInfo()
    }, [])

    const GetResumeInfo = () => {
        GlobleApi.GetResumeById(resumeId).then(resp => {
            console.log(resp?.data?.data)
            setResumeInfo(resp?.data?.data?.attributes)
        })
    }
    useEffect(() => {
        localStorage.setItem("toggle", toggle)
    }, [setToggle])

    useEffect(() => {
        let data = localStorage.getItem("toggle")
        setToggle(data.length > 2 && data)
    }, [])

    return (
        <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
            <TogglePreview.Provider value={{ isClicked, setIsClicked }}>
                <ToggleExperience.Provider value={{ toggle, setToggle }}>

                    {/* {console.log(isClicked)} */}
                    <div className='w-full'>
                        <div className={`flex justify-between mb-10 mt-3`}>
                            <div className={`md:w-1/2 w-full ${isClicked && "hidden"}`}>
                                <FormSection resumeId={resumeId} />
                            </div>
                            <div className={`md:w-1/2 w-full ${isClicked ? "absolute left-0" : "static"} md:block`}>
                                <ResumePreview />
                            </div>
                        </div>
                    </div>
                </ToggleExperience.Provider>
            </TogglePreview.Provider>
        </ResumeInfoContext.Provider>
    )
}

export default EditResume
