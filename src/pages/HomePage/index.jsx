import React, { useLayoutEffect, useState } from 'react';
import Modal from '../../components/Modal';
import { useSelector } from 'react-redux';
import ToolItem from '../../components/Toolitem';
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
    imageSrc:
      'src\\assets\\Tool-Supplements-and-Ingredients.jpg',
    link: '/tools/finder',
    tierAllow: ['Gold', 'Platinum', 'Silver'],
    toolName: 'natural-supplements-ingredients-finder',
  },
  {
    title: 'Simplify Scientific Journals',
    imageSrc:
      'src\\assets\\Tool-Simplify-Scientific-Journals.jpg',
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
    imageSrc:
      'src\\assets\\Tool-Personalized-Wellness-Plan.jpg',
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
    setIsOpen(true);
  }, []);

  const handleUpgrade = () => {
    setIsOpenUpgrade(true);
  };

  const renderContentByTier = () => {
    return (
      <div className="flex-1 flex flex-col justify-evenly">
        <div className="Collection flex flex-wrap gap-4">
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
    );
  };
  return (
    <div className="mt-20 mb-20 flex-1 flex flex-col">
      <>
        <h1 className="text-[46px] dark:text-[#E5E5EC]"> Enoch AI VIP Tools</h1>
        <p className="text-[23px] font-[300] text-primary mb-5">
          Use the power of Enoch AI to enhance your health and wellness
        </p>
      </>
      {renderContentByTier()}

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div>
          <h1 className="text-[#9D9DAB] dark:text-white text-[38px] font-[700] text-center">
            You have {user?.reward} questions remaining
          </h1>

          <p class="text-[#9D9DAB] text-center">
            You can collect more tokens by clicking the
            <span class="font-semibold">'redeem tokens' </span> link within{' '}
            <span class="font-semibold">Natural News </span> and{' '}
            <span class="font-semibold">Health Ranger Store</span> newsletters and promotions.{' '}
            <a href="#" class="text-primary font-semibold hover:underline">
              Learn More
            </a>
          </p>

          <div className="flex justify-center">
            <button
              className="my-4 p-2 bg-black  rounded-sm text-white flex text-[12px] items-center"
              onClick={() => {
                setIsOpen(false);
              }}
            >
              Close
            </button>
          </div>
        </div>
      </Modal>

      <Modal isOpen={isOpenUpgrade} onClose={() => setIsOpenUpgrade(false)}>
        <div>
          <h1 className="text-[#9D9DAB] dark:text-white text-[38px] font-[700] text-center">
            Upgrade to Unlock Access
          </h1>

          <p class="text-[#9D9DAB] text-center">
            This exclusive tool is available to Gold and Platinum members.{' '}
            <a href="#" class="text-primary font-semibold hover:underline">
              Please visit our support area
            </a>{' '}
            for more infomation
          </p>

          <div className="flex justify-center">
            <button
              className="my-4 p-2 bg-black  rounded-sm text-white flex text-[12px] items-center"
              onClick={() => {
                setIsOpenUpgrade(false);
              }}
            >
              Close
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default HomePage;
