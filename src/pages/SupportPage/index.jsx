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
      answer: (
        <>
          If you're a Health Ranger Store newsletter subscriber, then you already have an account.
          Just use the email address you subscribe with to log in. If you're not a subscriber,
          you can <a href="https://www.healthrangerstore.com/enoch" target="_blank" rel="noopener noreferrer">subscribe for free at the Health Ranger Store</a>.
        </>
      ),
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
      answer: (
        <>
        Bronze, Silver, Gold, and Platinum. Higher tiers unlock more VIP Tools.{' '}<a href="https://www.healthrangerstore.com/enoch" target="_blank" rel="noopener noreferrer">Click here for more information.</a>.
        </>
      )
    },
    {
      question: 'How do I upgrade my membership tier?',
      answer: (
        <>
        The more you spend at the Health Ranger Store on quality lab-tested health products, the higher you can upgrade. <a href="https://www.healthrangerstore.com/enoch" target="_blank" rel="noopener noreferrer">Click here for more information.</a>
        </>
      )
    },
    {
      question: 'How do I change my email address?',
      answer:(
        <>
        Unfortunately, you cannot change your email address with the Enoch AI system. You can however subscribe to the <a href="https://www.healthrangerstore.com/enoch" target="_blank" rel="noopener noreferrer">Health Ranger Store newsletter</a> with a different email address and then log into Enoch AI using this new address. You can also log into your Health Ranger Store account (if you have one) and update your email address there. Just make sure it's the same email address you use to subscribe to the newsletter.
        </>
      )
    },
    {
      question: 'What if I unsubscribe from the newsletter?',
      answer: (
        <>
        If you unsubscribe then you will no longer be able to access Enoch AI VIP Tools. But there's good news, <a href="https://www.healthrangerstore.com/enoch" target="_blank" rel="noopener noreferrer">you can always re-subscribe at any time!</a>
        </>
      )
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
        'The easiest way is to type something like: " Please summarize the following text:" and the copy/paste the text of what you want summarized. You can also provide more detailed instructions like telling Enoch to summarize it in less than three paragraphs, or in one sentence if you want a shorter summary.',
    },
    {
      question: 'How do I ask Enoch to show a relation between multiple topics?',
      answer:
        'The best way to connect multiple topics is to ask how the topics relate to each other in regards to something. For example, you could ask "How are dehydration and potassium related to good health and wellness in the human body."',
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
