import React from 'react'
import Heropage from '../../Page/Heropage'
import MissionSection from '../../Page/Mission'
import HowWeWorks from '../../Page/HowWeWorks'
import FeaturedFoods from '../../Page/FeatureFood'

const Home = () => {
  return (
    <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition-colors duration-300">
      <Heropage />
      <FeaturedFoods />
      <HowWeWorks />
      <MissionSection />
    </div>
  )
}

export default Home
