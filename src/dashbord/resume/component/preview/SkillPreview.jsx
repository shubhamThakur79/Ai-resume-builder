import React from 'react';

const SkillPreview = ({ resumeInfo }) => {
    return (
        <div>
            <h1 style={{ color: resumeInfo?.themeColor }} className="font-semibold text-xl mt-3">Skills</h1>
            <hr style={{ borderColor: resumeInfo?.themeColor }} className="border mt-2 mb-2" />

            <div id="skill" className="flex flex-wrap justify-center items-center text-start w-[90%] mx-auto gap-x-6 gap-y-3">
                {
                    resumeInfo?.skills?.map((skill, i) => (
                        <div id="data" className="w-[30%] mx-auto flex flex-col items-start gap-2" key={i}>
                            {/* Skill Name */}
                            <h2 className="font-medium">{skill?.name}</h2>
                            
                            {/* Rating Bar */}
                            <div className="w-full bg-gray-300 h-[4px] rounded-full">
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
