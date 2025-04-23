import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function SupportPage(props) {
  const [openFAQ, setOpenFAQ] = useState(null);
  const [openUsingFAQ, setOpenUsingFAQ] = useState(null);
  const [activeTab, setActiveTab] = useState('faqs'); // 'faqs' or 'using'
  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const toggleUsingFAQ = (index) => {
    setOpenUsingFAQ(openUsingFAQ === index ? null : index);
  };

  const faqs = [
    {
      question: 'How do I create an account?',
      answer:
        "If you're a Health Ranger Store newsletter subscriber, then you already have an account. Just use the email address you subscribe with to log in. If you're not a subscriber, you can subscribe for free at the Health Ranger Store.",
    },
    {
      question: 'How do I get an Access Code?',
      answer:
        "During the log in process, we'll send you an access code. If you do not get this email within a few minutes, check your junk/spam folder.",
    },
    {
      question: 'What are "Questions?"',
      answer:
        '"Questions" are like credits. Each time you use Enoch AI, it consumes a credit. The more credits you have, the more you can ask.',
    },
    {
      question: 'How do I get more "Questions?"',
      answer:
        'As long as you are an active Health Ranger Store subscriber, we will add more credits daily.',
    },
    {
      question: 'What are the membership tiers?',
      answer:
        'Bronze, Silver, Gold, and Platinum. Higher tiers unlock more VIP Tools. Click here for more info.',
    },
    {
      question: 'How do I upgrade my membership tier?',
      answer: 'The more you spend at the Health Ranger Store, the higher your membership tier.',
    },
    {
      question: 'How do I change my email address?',
      answer:
        'You cannot change your email in Enoch AI, but you can subscribe again using a new email address.',
    },
    {
      question: 'What if I unsubscribe from the newsletter?',
      answer: "You won't have access to VIP Tools, but you can re-subscribe anytime.",
    },
  ];

  const usingFaqs = [
    {
      question: 'How do I ask Enoch a question?',
      answer:
        'You can ask Enoch a question like you would a human being... and just like a human being, the more details you provide, the better the answer will be.',
    },
    {
      question: 'How can I ask Enoch to summarize something for me?',
      answer:
        'The easiest way is to type something like: "Please summarize the following text:" and then copy/paste the text. You can also ask for summaries in one sentence or less than three paragraphs.',
    },
    {
      question: 'How do I ask Enoch to show a relation between multiple topics?',
      answer:
        'Ask how the topics relate to each other. For example: "How are dehydration and potassium related to good health and wellness in the human body?"',
    },
  ];

  return (
    <div>
      <div id="Page">
        <div className="Support">
          <div className="Block Headline Centered">Enoch AI Support</div>
          <div className="Block Text Centered">
            FAQs and useful information for getting the most out of Enoch AI
          </div>

          <div className="Tabs" id="TabsSupport">
            <div
              className={`Tab ${activeTab === 'faqs' ? 'TabActive' : ''}`}
              id="TabFAQs"
              onClick={() => setActiveTab('faqs')}
              style={{ cursor: 'pointer' }}
            >
              FAQs
            </div>
            <div
              className={`Tab ${activeTab === 'using' ? 'TabActive' : ''}`}
              id="TabUsing"
              onClick={() => setActiveTab('using')}
              style={{ cursor: 'pointer' }}
            >
              Using Enoch
            </div>
          </div>

          <div className="Panels" id="PanelsSupport">
            {activeTab === 'faqs' ? (
              <div className="Panel PanelActive">
                <div className="FAQBox">
                  {faqs.map((faq, index) => (
                    <div
                      key={index}
                      className="FAQ"
                      onClick={() => toggleFAQ(index)}
                      style={{ cursor: 'pointer' }}
                    >
                      <div
                        className={`Subhead Question ${openFAQ === index ? 'QuestionOpen' : ''}`}
                      >
                        {faq.question}
                      </div>
                      {openFAQ === index && <div className="Text Answer FAQBox">{faq.answer}</div>}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="Panel PanelActive">
                <div className="FAQBox">
                  {usingFaqs.map((faq, index) => (
                    <div
                      key={index}
                      className="FAQ"
                      onClick={() => toggleUsingFAQ(index)}
                      style={{ cursor: 'pointer' }}
                    >
                      <div
                        className={`Subhead Question ${openUsingFAQ === index ? 'QuestionOpen' : ''}`}
                      >
                        {faq.question}
                      </div>
                      {openUsingFAQ === index && (
                        <div className="Text Answer FAQBox">{faq.answer}</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="Disclaimer Centered">
          <p>
            <Link to="/Support/Terms">Terms of Service</Link> •{' '}
            <Link to="/Support/Privacy">Privacy Policy</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SupportPage;
