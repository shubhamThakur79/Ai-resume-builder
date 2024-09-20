import React, { useContext, useEffect, useState } from 'react';
import AddResume from './AddResume';
import GlobleApi from './../service/GlobleApi';
import { useUser } from '@clerk/clerk-react';
import ResumeCardItem from './resume/ResumeCardItem';
import { ResumeIdContext, ResumeInfoContext } from '../context/ResumeInfoContext';
// import { get } from 'https';

const Dashbord = () => {
  const { user } = useUser();
  const [resumeList, setResumeList] = useState([]);
  const {resumeInfo,setResumeInfo} = useContext(ResumeInfoContext);
  const {resumeId,setResumeId} = useContext(ResumeIdContext);

  useEffect(() => {
    if (user) {
      getResumeList();
     
    }
  }, [user]);
  useEffect(() => {
    if (user) {
      setResumeId(getResumeList.resumeId);
      console.log(getResumeList.id)
     
    }
  }, [resumeList]);

  const getResumeList = async () => {
    try {
      const response = await GlobleApi.GetUserResume(user?.primaryEmailAddress?.emailAddress);
      // Ensure response is in the expected format
      if (Array.isArray(response)) {
        setResumeList(response);
      } else {
        console.error('Unexpected response format:', response);
      }
    } catch (error) {
      console.error('Error fetching resume list:', error);
    }
  };


  const handleResumeAdded = () => {
    getResumeList(); // Refresh resume list after adding a new resume
  };

  return (
    <div>
      <h1 className='text-center text-2xl text-black/80 md:text-3xl font-bold mt-7 mb-2 '>My Resume</h1>
      <p className='text-center font-semibold text-lg md:text-xl text-zinc-950/70'>Start Creating AI resume to your next job role</p>
      <div className='grid mt-10 place-items-center grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 md:gap-y-9 gap-y-4 md:gap-x-6 gap-x-3 md:w-[90%] mx-auto w-full justify-center px-3'>
        <AddResume onResumeAdded={handleResumeAdded}  />
        {resumeList?.map((resume, index) => {
          console.log(resume)
          // setResumeInfo(resume)
          return <div key={index}>
            <ResumeCardItem resume={resume} index={index} refreshData={getResumeList} />
          </div>
        })}
      </div>
    </div>
  );
};

export default Dashbord;
