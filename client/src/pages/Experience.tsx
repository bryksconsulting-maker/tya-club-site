import { useState, type FormEvent } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useLocation } from "wouter";
import { PageShell, SectionLabel } from "../components/SiteChrome";

const faqs = [
  ["What happens in a typical TYA session?", "Every session starts with a Mission — a real-feeling challenge that gives young people a reason to use the skill. They work in their Pod, take on roles, make decisions, reflect and try again. It is active, social and structured — not another class where they sit and listen."],
  ["What exactly will Young Adults (YA) learn at TYA?", "TYA goes beyond academics. Young people explore communication, leadership, independent thinking, emotional intelligence, decision-making, creativity, entrepreneurship, teamwork, problem-solving, adaptability and much more. The focus is on skills that help them navigate life, not just exams."],
  ["Is TYA a coaching or tuition program?", "No. TYA is a learning community, not a tuition centre. There are no textbooks, lectures or conventional classrooms. Learning happens through Missions, games, discussions, activities, videos, challenges, experiences and conversations — often without them even realising they're learning."],
  ["As a Young Adult, will I have to speak or perform in front of everyone?", "Not necessarily — and certainly not on day one. TYA is designed to help young people build confidence gradually. They participate in smaller groups, interact with their Pod and take on different roles. Over time, they are encouraged to find their voice and express themselves comfortably."],
  ["What if my child is shy or doesn't participate?", "That's okay. There is no pressure to become an instant extrovert. Our mentors create a supportive environment where every YA can participate at their own pace. We encourage them, understand their comfort levels and gradually help them step beyond them."],
  ["What is a TYA Pod?", "A Pod is the small community within TYA where young people meet, interact and learn together. Pods are created based on factors such as age group and location, allowing members to build familiarity, friendships and a sense of belonging while learning from different personalities and perspectives."],
  ["How does TYA help beyond the sessions?", "The goal is not for learning to end when the session does. Young people are encouraged to take what they discover into their everyday lives — at home, school, college, with friends and eventually into their communities. TYA is about turning learning into action."],
  ["How do you know whether a YA is actually growing?", "TYA isn't about marks or grades. Growth can show up in how a young person communicates, participates, takes responsibility, handles challenges, works with others, makes decisions and reflects on their experiences. We aim to make that growth visible through participation, reflection and a record of their journey."],
  ["What role do parents play in TYA?", "Parents are important partners, but TYA is ultimately the young person's space. We encourage parents to support the journey without taking over it. Where appropriate, parents can be kept informed about participation, experiences and areas of growth, while giving the YA room to discover and express themselves."],
  ["How do I know if TYA is right for my young person?", "TYA is organised into three stages: Class 6 to 9, Class 10 to 12 and Grads. Each stage adapts the Missions and language to where the learner is — from building confidence and communication to career, financial and future planning."],
  ["How do parents see progress?", "You receive a written TYA Growth Card every month. It is not a grade or a certificate — it is a clear snapshot of six behaviours the coach actually observed: confidence, communication, collaboration, decision making, adaptability and ownership."],
  ["How are safety and consistency handled?", "Batches are intentionally structured for 30 young people, with coach-led Pods and clear roles for participation. Coaches are verified, pick-up is named, and every centre follows the same term structure so parents know what week one is building towards."],
  ["What makes TYA different?", "TYA doesn't try to tell young people who they should become. It creates experiences that help them discover who they are, what they can do and what they can become. They meet. They question. They experiment. They fail safely. They try again. They learn from one another. And slowly, they become Transformed Young Adults."],
] as const;

export default function Experience() {
  const [open, setOpen] = useState<number | null>(null);
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
          <p>Not marketing promises. The practical details that help you decide if TYA is right for your young person.</p>
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

        <div className="experience-faq-list">
          {faqs.map(([q, a], index) => {
            const isOpen = open === index;
            const answerId = `experience-answer-${index + 1}`;
            return <article className="experience-faq-item" key={q}>
              <h2>
                <button
                  className="experience-faq-trigger"
                  type="button"
                  onClick={() => setOpen(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  aria-controls={answerId}
                >
                  <span>{q}</span>
                  <span className="experience-faq-toggle"><ChevronDown className={isOpen ? "rotate-180" : ""} size={14} aria-hidden="true" /></span>
                </button>
              </h2>
              {isOpen && <p className="experience-faq-answer" id={answerId}>{a}</p>}
            </article>;
          })}
        </div>
      </div>
    </section>
  </PageShell>;
}
