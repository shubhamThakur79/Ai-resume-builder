import React from 'react'

const EducationPreview = ({ resumeInfo }) => {
    return (
        <div>
            <h1 style={{ color: resumeInfo?.themeColor }} className='font-semibold text-xl mt-3'>Education</h1>
            <hr style={{ borderColor: resumeInfo?.themeColor }} className='border mt-2 mb-2' />
            {
                resumeInfo?.education?.map((education, i) => {

                    return <ul key={i} >
                        <li className='flex my-2 flex-col items-start justify-start'>

                            <h3 style={{color:resumeInfo?.themeColor}} className='font-semibold text-[18px]'>{education?.universityName} , {education?.city} , {education?.state}</h3>

                            <h3 className='flex justify-between w-full font-semibold'>{education?.degree}
                                <span className='w-max'>{education?.startDate.substring(0,4)} -  {education?.endDate.length >= 4 ? education?.endDate.substring(0,4) : "Present"}</span>
                            </h3>
                            <p className='mt-1'>{education?.summary}</p>



                        </li>
                    </ul>
                })
            }
        </div>
    )
}

export default EducationPreview