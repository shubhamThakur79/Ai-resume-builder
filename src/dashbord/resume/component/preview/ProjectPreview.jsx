import React, { useContext } from 'react';
import { ToggleExperience } from '../../../../context/ResumeInfoContext';

const ProjectPreview = ({ resumeInfo }) => {
    const projects = resumeInfo?.projects || [];  // Access the projects array from resumeInfo
    const { toggle } = useContext(ToggleExperience);

    return (
        <div className={`w-[95vw] md:w-auto overflow-hidden `}>
            <h1 style={{ color: resumeInfo?.themeColor }} className='font-semibold text-xl mt-3'>Projects</h1>
            <hr style={{ borderColor: resumeInfo?.themeColor }} className='border mt-2 mb-2' />
            {projects.length ? (
                projects.map((project, i) => (
                    <ul key={i} className='w-full text-wrap'>
                        <li className='flex text-wrap w-full my-2 flex-col items-start justify-start text-start'>
                            <h3 style={{ color: resumeInfo?.themeColor }} className='font-semibold text-[18px]'>
                                {project.title || 'Untitled Project'}
                            </h3>
                            <h3 className='flex justify-end w-full font-semibold items-center gap-2'>
                               <div className='mt-[-13px] mb-3'> {project.liveDemo ?
                                    <a
                                        className='cursor-pointer underline'
                                        href={project?.liveDemo }
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Live Demo
                                    </a>
                                    : null

                                }</div>

                                <span className='flex justify-end mt-[-13px] mb-3'>
                                    <span>{project.startDate ? project.startDate.substring(0, 4) : 'N/A'}</span> -
                                    <span>{project.endDate ? project.endDate.substring(0, 4) : 'Present'}</span>
                                </span>
                            </h3>
                            <div className='text-sm mt-[-13px] break-words w-full h-max overflow-hidden'>
                                {project.description || null}
                            </div>
                        </li>
                    </ul>
                ))
            ) : (
null
            )}
        </div>
    );
};

export default ProjectPreview;
