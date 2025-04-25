import React, { useLayoutEffect, useState } from 'react';
import Modal from '../../components/Modal';
import { useSelector } from 'react-redux';
import ToolItem from '../../components/ToolItem';
import { Link } from 'react-router-dom';
import ToolChatImg from '../../assets/Tool-Chat.jpg';
import ToolSummaryImg from '../../assets/Tool-Summary.jpg';
import DailyMealPlannerImg from '../../assets/Tool-Daily-Meal-Planner.jpg';
import SupplementsImg from '../../assets/Tool-Supplements-and-Ingredients.jpg';
import SimplifyJournalsImg from '../../assets/Tool-Simplify-Scientific-Journals.jpg';
import GroceryCoachImg from '../../assets/Tool-Grocery-Shopping-Coach.jpg';
import WellnessPlanImg from '../../assets/Tool-Personalized-Wellness-Plan.jpg';
import LongevityRoadmapImg from '../../assets/Tool-Longevity-Roadmap.jpg';
import MasterGardenerImg from '../../assets/Tool-Master-Gardener.jpg';
import IngredientCheckerImg from '../../assets/Tool-Ingredient-Checker.jpg';
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
    imageSrc: ToolSummaryImg,
    link: '/tools/summarizer',
    tierAllow: ['Gold', 'Platinum', 'Silver', 'Bronze'],
    toolName: 'text-summarizer',
  },
  {
    title: 'Daily Meal Planner',
    imageSrc: DailyMealPlannerImg,
    link: '/tools/planner',
    tierAllow: ['Gold', 'Platinum', 'Silver'],
    toolName: 'daily-meal-planner',
  },
  {
    title: 'Natural Supplements & Ingredients Finder',
    imageSrc: SupplementsImg,
    link: '/tools/finder',
    tierAllow: ['Gold', 'Platinum', 'Silver'],
    toolName: 'natural-supplements-ingredients-finder',
  },
  {
    title: 'Simplify Scientific Journals',
    imageSrc: SimplifyJournalsImg,
    link: '/tools/journals',
    tierAllow: ['Gold', 'Platinum', 'Silver'],
    toolName: 'journals',
  },
  {
    title: 'Grocery Shopping Coach',
    imageSrc: GroceryCoachImg,
    link: '/tools/grocery',
    tierAllow: ['Gold', 'Platinum'],
    toolName: 'grocery-shopping-coach',
  },
  {
    title: 'Personalized Wellness Plan',
    imageSrc: WellnessPlanImg,
    link: '/tools/wellness',
    tierAllow: ['Gold', 'Platinum'],
    toolName: 'personalized-wellness-plan',
  },
  {
    title: 'Longevity Roadmap',
    imageSrc: LongevityRoadmapImg,
    link: '/tools/longevity',
    tierAllow: ['Gold', 'Platinum'],
    toolName: 'longevity-roadmap',
  },
  {
    title: 'Master Gardener',
    imageSrc: MasterGardenerImg,
    link: '/tools/gardener',
    tierAllow: ['Gold', 'Platinum'],
    toolName: 'master-gardener',
  },
  {
    title: 'Ingredient Checker',
    imageSrc: IngredientCheckerImg,
    link: '/tools/Ingredient',
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
        {user && (
          <div className="Content NoClose">
            <div className="Card">
              {user?.tier === 'Platinum' ? (
                <>
                  <div className="Block Headline Centered">
                    You have unlimited questions remaining
                  </div>
                  <div className="Block Text Centered">
                    As a Platinum member, you have unlimited questions to use with Enoch AI tools
                    and chat. <Link to="/Support/home">Learn More</Link>
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
                  <div className="Block Headline Centered">
                    You have {user?.reward} questions remaining
                  </div>
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
          </div>
        )}
      </Modal>
    </div>
  );
}

export default HomePage;
