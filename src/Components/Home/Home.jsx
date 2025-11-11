import React from 'react'
import Heropage from '../../Page/Heropage'
import MissionSection from '../../Page/Mission'
import HowWeWorks from '../../Page/HowWeWorks'
import FeaturedFoods from '../../Page/FeatureFood'

const Home = () => {
  return (
    <div>
      <Heropage/>
      <FeaturedFoods/>
      <HowWeWorks/>
      <MissionSection/>
    </div>
  )
}

export default Home
