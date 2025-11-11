import React from 'react'

const Skeleton = ({count=4}) => {
  return (
    <div className='space-y-4'>
    {
        Array(count).fill(0)
        .map((_,idx)=>(
            <div
            key={idx}
            className='h-20 bg-gray-300 rounded-md animate-pulse'></div>
        ))
    }
      
    </div>
  )
}

export default Skeleton
