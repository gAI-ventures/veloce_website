import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import Marquee from '@/components/Marquee'
import Problem from '@/components/Problem'
import ProductPeek from '@/components/ProductPeek'
import ValueProp from '@/components/ValueProp'
import Pipeline from '@/components/Pipeline'
import Agents from '@/components/Agents'
import AskSection from '@/components/AskSection'
import CTA from '@/components/CTA'
import Footer from '@/components/Footer'

export default function Page() {
  return (
    <>
      <Nav />
      <span id="top" />
      <Hero />
      <Marquee />
      <Problem />
      <ProductPeek />
      <ValueProp />
      <Pipeline />
      <Agents />
      <AskSection />
      <CTA />
      <Footer />
    </>
  )
}
