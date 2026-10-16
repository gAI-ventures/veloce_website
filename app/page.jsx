import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import Proof from '@/components/Proof';
import Compare from '@/components/Compare';
import { Operators, Problem } from '@/components/Sections';
import { Announce, Loop, Maintenance, Housekeeping, Finance, Platform, Owners } from '@/components/Story';
import Trial from '@/components/Trial';
import Gains from '@/components/Gains';
import { Faq, Contact, Footer } from '@/components/Closing';
import { FAQS } from '@/lib/faq';

// Built from the same list the FAQ section shows.
const faqLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <Announce />
      <Nav />
      <main>
        <Hero />
        <Proof />
        <Operators />
        <Loop />
        <Problem />
        <Maintenance />
        <Housekeeping />
        <Finance />
        <Platform />
        <Owners />
        <Compare />
        <Gains />
        <Trial />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
