import { useState, type FormEvent } from "react";
import { ArrowRight } from "lucide-react";
import { useLocation } from "wouter";
import { ExperienceFaqList } from "../components/ExperienceFaqList";
import { PageShell, SectionLabel } from "../components/SiteChrome";
import { experienceFaqs } from "../data/experienceFaqs";

export default function Experience() {
  const [question, setQuestion] = useState("");
  const [, setLocation] = useLocation();

  const askQuestion = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const typedQuestion = question.trim();
    if (typedQuestion) setLocation(`/contact?question=${encodeURIComponent(typedQuestion)}`);
  };

  return <PageShell>
    <section className="experience-faq-section">
      <div className="container experience-faq-layout">
        <div className="experience-faq-intro">
          <SectionLabel>The TYA experience</SectionLabel>
          <h1>Good questions deserve <span>proper</span> answers.</h1>
          <p>Not marketing promises. The practical details that help you decide if TYA is right for your young adult.</p>
          <form className="experience-question-form" onSubmit={askQuestion}>
            <label className="sr-only" htmlFor="experience-question">Type a question for TYA Club</label>
            <input
              id="experience-question"
              type="text"
              maxLength={500}
              required
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
              placeholder="Type your question"
            />
            <button type="submit" aria-label="Ask us anything">
              <span>Ask us anything</span>
              <ArrowRight size={15} aria-hidden="true" />
            </button>
          </form>
        </div>
        <ExperienceFaqList items={experienceFaqs} />
      </div>
    </section>
  </PageShell>;
}
