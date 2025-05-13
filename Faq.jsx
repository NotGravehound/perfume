import React, { useState } from "react";
import "./css/Faq.css";

const faqs = [
  {
    question: "How long does shipping take?",
    answer: "Orders are processed within 1–2 business days and shipping takes 3–5 business days."
  },
  {
    question: "Do you offer international shipping?",
    answer: "Yes, we ship to most countries worldwide. Shipping rates vary by location."
  },
  {
    question: "Can I return a product?",
    answer: "We offer a 14-day return policy for unopened products. Please review our return policy for more info."
  },
  {
    question: "How do I track my order?",
    answer: "You will receive a tracking link via email once your order ships."
  }
];

function Faq() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleIndex = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="faq-container">
      <h2>Frequently Asked Questions</h2>
      {faqs.map((item, index) => (
        <div className="faq-item" key={index}>
          <div className="faq-question" onClick={() => toggleIndex(index)}>
            <span className="arrow">{activeIndex === index ? "▾" : "▸"}</span>
            {item.question}
          </div>
          {activeIndex === index && <div className="faq-answer">{item.answer}</div>}
        </div>
      ))}
    </div>
  );
}

export default Faq;
