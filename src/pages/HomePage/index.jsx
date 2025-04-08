import React, { useLayoutEffect, useState } from 'react';
import Modal from '../../components/Modal';
import { useSelector } from 'react-redux';
import ToolItem from '../../components/Toolitem';
const mockList = [
  {
    title: 'Daily Meal Planner',
    imageSrc: 'https://demo.naturalnews.com/vipai/Assets/Images/Tool-Daily-Meal-Planner.jpg',
    link: '/tools/planner',
    tierAllow: ['Gold', 'Platinum', 'Silver', 'Bronze'],
  },
  {
    title: 'Grocery Shopping Coach',
    imageSrc: 'https://demo.naturalnews.com/vipai/Assets/Images/Tool-Grocery-Shopping-Coach.jpg',
    link: '/tools/grocery',
    tierAllow: ['Gold', 'Platinum', 'Silver', 'Bronze'],
  },
  {
    title: 'Natural Supplements & Ingredients Finder',
    imageSrc:
      'https://demo.naturalnews.com/vipai/Assets/Images/Tool-Supplements-and-Ingredients.jpg',
    link: '/tools/finder',
    tierAllow: ['Gold', 'Platinum', 'Silver'],
  },
  {
    title: 'Personalized Wellness Plan',
    imageSrc:
      'https://demo.naturalnews.com/vipai/Assets/Images/Tool-Personalized-Wellness-Plan.jpg',
    link: '/tools/wellness',
    tierAllow: ['Gold', 'Platinum', 'Silver'],
  },
  {
    title: 'Master Gardener',
    imageSrc: 'https://demo.naturalnews.com/vipai/Assets/Images/Tool-Master-Gardener.jpg',
    link: '/tools/gardener',
    tierAllow: ['Gold', 'Platinum', 'Silver'],
  },
  {
    title: 'Longevity Roadmap',
    imageSrc: 'https://demo.naturalnews.com/vipai/Assets/Images/Tool-Longevity-Roadmap.jpg',
    link: '/tools/longevity',
    tierAllow: ['Gold', 'Platinum'],
  },
  {
    title: 'Simplify Scientific Journals',
    imageSrc:
      'https://demo.naturalnews.com/vipai/Assets/Images/Tool-Simplify-Scientific-Journals.jpg',
    link: '/tools/journals',
    tierAllow: ['Gold', 'Platinum'],
  },
  {
    title: 'Ingredient Checker',
    imageSrc: 'https://demo.naturalnews.com/vipai/Assets/Images/Tool-Ingredient-Checker.jpg',
    link: '/chat?type=ingredient',
    tierAllow: ['Gold', 'Platinum'],
  },
  {
    title: 'Chat with Enoch AI',
    imageSrc: 'https://demo.naturalnews.com/vipai/Assets/Images/Tool-Chat.jpg',
    link: '/chat',
    tierAllow: ['Gold', 'Platinum'],
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
      {user?.tier !== 'Bronze' && (
        <>
          <h1 className="text-[46px] dark:text-[#E5E5EC]"> Enoch AI VIP Tools</h1>
          <p className="text-[23px] font-[300] text-primary mb-5">
            Use the power of Enoch AI to enhance your health and wellness
          </p>
        </>
      )}
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
