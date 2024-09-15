import React, { useContext } from 'react';
import { ToggleExperience } from '../../../../context/ResumeInfoContext';

const ExperiencePreview = ({ resumeInfo }) => {
    let experience = resumeInfo?.experience;
  const { toggle, setToggle } = useContext(ToggleExperience);

    return (
        
        <div className='w-[95vw] md:w-auto overflow-hidden'>
            <h1 style={{ color: resumeInfo?.themeColor }} className='font-semibold text-xl mt-3'>Professional Experience</h1>
            <hr style={{ borderColor: resumeInfo?.themeColor }} className='border mt-2 mb-2' />
            {

                experience?.map((info, i) => (
                    <ul key={i} className='w-full overflow-hidden '  >
                        <li className='flex text-wrap w-full my-2 flex-col items-start justify-start text-start'>


                            <h3 style={{ color: resumeInfo?.themeColor }} defaultValue={info?.title} className='font-semibold text-[18px] '>{info?.title}</h3>


                            <h3 className='flex  justify-between w-full font-semibold '>{info?.companyName || null}, {info?.city || null}, {info?.state || null}
                                {/* <span className='w-max hidden md:block'>{info?.startDate} - {info?.endDate ? info?.endDate  : null|| "Present" }</span> */}
                                <span id='dates' className='w-max '>
                                    {info?.startDate.substring(0, 4)} - {info?.endDate ? info.endDate.substring(0, 4) : "Present"}
                                </span>

                            </h3>


                            <div dangerouslySetInnerHTML={{ __html: info?.workSummery }} ></div>
                        </li>
                    </ul>
                ))
            }
        </div>
    );
}

export default ExperiencePreview;
