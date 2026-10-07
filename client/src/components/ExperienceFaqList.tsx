import { useState } from "react";
import { ChevronDown } from "lucide-react";

type QuestionAndAnswer = readonly [question: string, answer: string];

const INITIAL_QUESTION_COUNT = 7;

export function ExperienceFaqList({ items }: { items: readonly QuestionAndAnswer[] }) {
  const [openQuestion, setOpenQuestion] = useState<number | null>(null);
  const [showAllQuestions, setShowAllQuestions] = useState(false);
  const initialItems = items.slice(0, INITIAL_QUESTION_COUNT);
  const additionalItems = items.slice(INITIAL_QUESTION_COUNT);

  const renderQuestion = ([question, answer]: QuestionAndAnswer, index: number) => {
    const isOpen = openQuestion === index;
    const answerId = `experience-answer-${index + 1}`;
    return <article className="experience-faq-item" key={question}>
      <h3><button className="experience-faq-trigger" type="button" onClick={() => setOpenQuestion(isOpen ? null : index)} aria-expanded={isOpen} aria-controls={answerId}>
        <span>{question}</span><span className="experience-faq-toggle"><ChevronDown className={isOpen ? "rotate-180" : ""} size={14} aria-hidden="true" /></span>
      </button></h3>
      {isOpen && <p className="experience-faq-answer" id={answerId}>{answer}</p>}
    </article>;
  };

  return <div className="experience-faq-column">
    <div className="experience-faq-list" aria-label="Frequently asked questions">{initialItems.map(renderQuestion)}</div>
    {additionalItems.length > 0 && <>
      <div id="experience-more-questions" className="experience-faq-list experience-faq-list--additional" hidden={!showAllQuestions} aria-label="More frequently asked questions">
        {additionalItems.map((item, index) => renderQuestion(item, index + INITIAL_QUESTION_COUNT))}
      </div>
      <button
        className="experience-faq-more"
        type="button"
        aria-expanded={showAllQuestions}
        aria-controls="experience-more-questions"
        onClick={() => {
          setShowAllQuestions((current) => !current);
          if (showAllQuestions && openQuestion !== null && openQuestion >= INITIAL_QUESTION_COUNT) setOpenQuestion(null);
        }}
      >{showAllQuestions ? "Show fewer questions" : "Read more questions"}<ChevronDown className={showAllQuestions ? "rotate-180" : ""} size={15} aria-hidden="true" /></button>
    </>}
  </div>;
}
