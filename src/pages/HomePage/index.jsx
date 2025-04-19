import React, { useState } from 'react';
import Modal from '../../components/Modal';
import { useSelector } from 'react-redux';
import ToolItem from '../../components/Toolitem';
import InputChat from '../../components/InputChat';
import { useNavigate } from 'react-router-dom';
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
  const [isOpenUpgrade, setIsOpenUpgrade] = useState(false);
  const [input, setInput] = useState('');
  const navigate = useNavigate();
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

  const handleSendMessage = () => {
    if (!input.trim()) return;
    setInput('');
    navigate(`/Received`, { state: { initialMessage: input } });
  };

  const handleSelect = (option) => {
    setInput((pre) => `${pre} ${option.label}`);
  };

  const handlePress = (prompt) => {
    setInput(prompt.messages);
  };

  return (
    <div className="flex-1 flex flex-col w-full">
      <div className="py-[70px] px-[20px] border-b-1 border-[#e5e5ec] dark:border-[#3E3E42] flex flex-col items-center ">
        <h1 className="text-primary text-center text-[38px] font-[300]">Ask Enoch Anything</h1>
        <div className="w-[60%]">
          <InputChat
            value={input}
            onChange={(e) => setInput(e.target.value)}
            sendMessage={handleSendMessage}
            tokenRemaining={user?.reward || 0}
            handleSelectPrompt={handleSelect}
            handlePressPropmt={handlePress}
          />
        </div>

        <p className="text-center text-[10px] text-[#73737E] mt-2 m-auto max-w-[560px]">
          Enoch AI is experimental. These statements are not intended to diagnose, treat, or cure
          any medical condition. Please verify all important information and always seek advice from
          your doctor, healthcare professional, or naturopath before making any changes to your
          existing medication or health routine.
        </p>
      </div>

      <div className="py-[70px] px-[20px] border-b-1 border-[#e5e5ec] dark:border-[#3E3E42]  flex flex-col items-center ">
        <div className="w-[60%]">
          <h1 className="text-primary text-center text-[38px] font-[300]">What is Enoch?</h1>

          <p className="dark:text-white text-[12px] text-left">
            Enoch is the world's #1 AI language model on reality benchmarks. Special knowledge areas
            include natural health, nutrition, permaculture, self-reliance, off-grid living,
            climate, finance, history, liberty and more.
          </p>

          <p className="dark:text-white text-[12px] text-left">
            Enoch is capable of deep research, generating content, summarizing content, answering
            questions, basic reasoning and more.
          </p>
        </div>
        <div className="text-gray-700  text-[12px] mt-7">
          <a href="#" className="text-[#7765FD] hover:underline">
            Prompting Guide
          </a>{' '}
          •
          <a href="#" className="text-[#7765FD] hover:underline">
            About Enoch
          </a>{' '}
          •
          <a href="#" className="text-[#7765FD] hover:underline">
            Downloadable Versions
          </a>
        </div>
      </div>
      <div
        className="py-[70px] px-[20px] border-b-1 border-[#e5e5ec] dark:border-[#3E3E42]  flex flex-col items-center "
        id="SectionHomeTools"
      >
        <div className="w-[60%]">
          <h1 className="text-primary text-center text-[38px] font-[300]">Prompt Tools</h1>
          <p className="dark:text-white text-center text-[24px] font-[300] mb-4">
            Use these exclusive tools to help construct a detailed prompt:
          </p>

          {renderContentByTier()}
        </div>
      </div>

      <div
        className="py-[70px] px-[20px] border-b-1 border-[#e5e5ec] dark:border-[#3E3E42]  flex flex-col items-center "
        id="SectionHomeTools"
      ></div>

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
