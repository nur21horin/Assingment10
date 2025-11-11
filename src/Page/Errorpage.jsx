import React from 'react'
import { Link } from 'react-router-dom'

const Errorpage = () => {
  return (
    <div>
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100 px-4 text-center">
      <img
        src="https://media.giphy.com/media/14uQ3cOFteDaU/giphy.gif"
        alt="404 Not Found"
        className="w-80 h-80 mb-6"
      />
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Oops! Page not found</h1>
      <p className="text-gray-600 mb-6">
        The page you are looking for doesn't exist or has been moved.
      </p>
      
    </div>
    </div>
  )
}

export default Errorpage
