import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import { Operators, Problem, Steps, Housekeeping } from '@/components/Sections';
import Gains from '@/components/Gains';
import { Faq, Contact, Footer } from '@/components/Closing';

export default function Page() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Operators />
        <Problem />
        <Steps />
        <Housekeeping />
        <Gains />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
