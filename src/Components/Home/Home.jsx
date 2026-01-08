import React from 'react'
import Heropage from '../../Page/Heropage'
import MissionSection from '../../Page/Mission'
import HowWeWorks from '../../Page/HowWeWorks'
import FeaturedFoods from '../../Page/FeatureFood'
import StatisticsSection from '../StatisticSection/StatisticSection'
import CategoriesSection from '../Categories/Categories'
import ServicesSection from '../Service/ServiceSection'
import BlogSection from './BlogSection'
import CTASection from './CTASection'
import FAQSection from './FAQSection'
import NewsletterSection from './NewsletterSection'
import TestimonialsSection from './TestimonialSection'

const Home = () => {
  return (
    <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition-colors duration-300">
      <Heropage />
      <FeaturedFoods />
      <CategoriesSection></CategoriesSection>
      <ServicesSection></ServicesSection>
      <HowWeWorks />
      
      <MissionSection />
      <StatisticsSection></StatisticsSection>
      <BlogSection></BlogSection>
      <CTASection></CTASection>
      <FAQSection></FAQSection>
      <NewsletterSection></NewsletterSection>
      <TestimonialsSection></TestimonialsSection>
    </div>
  )
}

export default Home
