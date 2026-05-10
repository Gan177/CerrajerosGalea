import Header from './components/Header'
import HeroSection from './components/HeroSection'
import ServicesSection from './components/ServicesSection'
import DifferentialsSection from './components/DifferentialsSection'
import TestimonialsSection from './components/TestimonialsSection'
import ServiceZonesSection from './components/ServiceZonesSection'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <ServicesSection />
        <DifferentialsSection />
        <TestimonialsSection />
        <ServiceZonesSection />
      </main>
      <Footer />
    </>
  )
}
