import React from 'react';

const SkillPreview = ({ resumeInfo }) => {
    return (
        <div>
            <h1 style={{ color: resumeInfo?.themeColor }} className="font-semibold text-xl mt-3">Skills</h1>
            <hr style={{ borderColor: resumeInfo?.themeColor }} className="border mt-2 mb-2" />

            {/* Grid layout for skills */}
            <div id="skill" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-[90%] mx-auto">
                {
                    resumeInfo?.skills?.map((skill, i) => (
                        <div id="data" className="flex flex-col items-start" key={i}>
                            {/* Skill Name */}
                            <h2 className="font-medium">{skill?.name}</h2>
                            
                            {/* Rating Bar */}
                            <div className="w-full bg-gray-300 h-[4px] rounded-full mt-3">
                                <div
                                    className="h-[4px] rounded-full"
                                    style={{
                                        backgroundColor: resumeInfo?.themeColor || 'black',
                                        width: `${skill?.rating * 20}%`,
                                    }}
                                />
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default SkillPreview;
