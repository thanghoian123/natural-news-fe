import React, { useLayoutEffect, useState } from 'react';
import Modal from '../../components/Modal';
import { useSelector } from 'react-redux';
import ToolItem from '../../components/ToolItem';
import { Link } from 'react-router-dom';

const mockList = [
  {
    title: 'Chat with Enoch AI',
    imageSrc: 'src\\assets\\Tool-Chat.jpg',
    link: `/chat?_=${Date.now()}`,
    tierAllow: ['Gold', 'Platinum', 'Silver', 'Bronze'],
    toolName: 'chat-with-enoch',
  },
  {
    title: 'Enoch Text Summarizer',
    imageSrc: 'src\\assets\\Tool-Summary.jpg',
    link: '/tools/summarizer',
    tierAllow: ['Gold', 'Platinum', 'Silver', 'Bronze'],
    toolName: 'text-summarizer',
  },
  {
    title: 'Daily Meal Planner',
    imageSrc: 'src\\assets\\Tool-Daily-Meal-Planner.jpg',
    link: '/tools/planner',
    tierAllow: ['Gold', 'Platinum', 'Silver'],
    toolName: 'daily-meal-planner',
  },
  {
    title: 'Natural Supplements & Ingredients Finder',
    imageSrc: 'src\\assets\\Tool-Supplements-and-Ingredients.jpg',
    link: '/tools/finder',
    tierAllow: ['Gold', 'Platinum', 'Silver'],
    toolName: 'natural-supplements-ingredients-finder',
  },
  {
    title: 'Simplify Scientific Journals',
    imageSrc: 'src\\assets\\Tool-Simplify-Scientific-Journals.jpg',
    link: '/tools/journals',
    tierAllow: ['Gold', 'Platinum', 'Silver'],
    toolName: 'journals',
  },
  {
    title: 'Grocery Shopping Coach',
    imageSrc: 'src\\assets\\Tool-Grocery-Shopping-Coach.jpg',
    link: '/tools/grocery',
    tierAllow: ['Gold', 'Platinum'],
    toolName: 'grocery-shopping-coach',
  },
  {
    title: 'Personalized Wellness Plan',
    imageSrc: 'src\\assets\\Tool-Personalized-Wellness-Plan.jpg',
    link: '/tools/wellness',
    tierAllow: ['Gold', 'Platinum'],
    toolName: 'personalized-wellness-plan',
  },
  {
    title: 'Longevity Roadmap',
    imageSrc: 'src\\assets\\Tool-Longevity-Roadmap.jpg',
    link: '/tools/longevity',
    tierAllow: ['Gold', 'Platinum'],
    toolName: 'longevity-roadmap',
  },
  {
    title: 'Master Gardener',
    imageSrc: 'src\\assets\\Tool-Master-Gardener.jpg',
    link: '/tools/gardener',
    tierAllow: ['Gold', 'Platinum'],
    toolName: 'master-gardener',
  },
  {
    title: 'Ingredient Checker',
    imageSrc: 'src\\assets\\Tool-Ingredient-Checker.jpg',
    link: '/chat?type=ingredient',
    tierAllow: ['Gold', 'Platinum'],
    toolName: 'ingredients-checker',
  },
];
function HomePage() {
  const { user } = useSelector((state) => state.user);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenUpgrade, setIsOpenUpgrade] = useState(false);
  useLayoutEffect(() => {
    const hasSeenModal = localStorage.getItem('hasSeenModal');
    if (!hasSeenModal) {
      setIsOpen(true);
      localStorage.setItem('hasSeenModal', 'true');
    }
  }, []);

  const handleUpgrade = () => {
    setIsOpenUpgrade(true);
  };

  return (
    <div>
      <div class="VIPTools">
        <div class="Headline USN">Enoch AI VIP Tools</div>
        <div class="Block Text USN">
          Use the power of Enoch AI to enhance your health and wellness
        </div>
        <div class="Collection USN">
          {mockList.map((post, index) => (
            <ToolItem
              key={index}
              post={post}
              index={index}
              userTier={user?.tier}
              onUpgrade={handleUpgrade}
            />
          ))}
        </div>
      </div>
      <Modal isOpen={isOpenUpgrade} onClose={() => setIsOpenUpgrade(false)}>
        <div className="Content NoClose">
          <div className="Card">
            <div className="Block Headline Centered">Upgrade to Unlock Access</div>
            <div className="Block Text Centered">
              This exclusive tool is available to Gold and Platinum members.
              <Link to="/Support/home">Please visit our support area</Link>
              for more information.
            </div>
            <div className="Block">
              <div className="ButtonBox ButtonBoxCenter">
                <button
                  className="Button ButtonPrimary ButtonClose"
                  onClick={() => setIsOpenUpgrade(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      <Modal isOpen={isOpen && user} onClose={() => setIsOpen(false)}>
        {user && <div className="Content NoClose">
          <div className="Card">
            {user?.tier === 'Platinum' ? (
              <>
                <div className="Block Headline Centered">
                  You have unlimited questions remaining
                </div>
                <div className="Block Text Centered">
                  As a Platinum member, you have unlimited questions to use with Enoch AI tools and
                  chat.{' '}<Link to="/Support/home">Learn More</Link>
                </div>
                <div className="Block">
                  <div className="ButtonBox ButtonBoxCenter">
                    <button
                      className="Button ButtonPrimary ButtonClose"
                      onClick={() => setIsOpen(false)}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="Block Headline Centered">You have {user?.reward} questions remaining</div>
                <div className="Block Text Centered">
                  More questions are added to your account each day.{' '}
                  <Link to="/Support/home">Learn More</Link>
                </div>
                <div className="Block">
                  <div className="ButtonBox ButtonBoxCenter">
                    <button
                      className="Button ButtonPrimary ButtonClose"
                      onClick={() => setIsOpen(false)}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>}
      </Modal>
    </div>
  );
}

export default HomePage;
