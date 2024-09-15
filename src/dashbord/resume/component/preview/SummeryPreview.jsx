import React from 'react'

const SummeryPreview = ({resumeInfo}) => {
  return (
    <div>
    <p className='text-start font-semibold  md:p-2 py-3 text-md'>{resumeInfo?.summary}</p>
  </div>
  )
}

export default SummeryPreview