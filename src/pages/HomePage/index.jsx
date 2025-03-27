import React, { useLayoutEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from '../../components/Modal';
import { useSelector } from 'react-redux';

function HomePage() {
  const postList = [
    {
      title: 'Daily Meal Planner',
      imageSrc: 'https://demo.naturalnews.com/vipai/Assets/Images/Tool-Daily-Meal-Planner.jpg',
      link: '/tools/planner',
    },
    {
      title: 'Grocery Shopping Coach',
      imageSrc: 'https://demo.naturalnews.com/vipai/Assets/Images/Tool-Grocery-Shopping-Coach.jpg',
      link: '/tools/grocery',
    },
    {
      title: 'Natural Supplements & Ingredients Finder',
      imageSrc:
        'https://demo.naturalnews.com/vipai/Assets/Images/Tool-Supplements-and-Ingredients.jpg',
      link: '/tools/finder',
    },
    {
      title: 'Personalized Wellness Plan',
      imageSrc:
        'https://demo.naturalnews.com/vipai/Assets/Images/Tool-Personalized-Wellness-Plan.jpg',
      link: '/tools/wellness',
    },
    {
      title: 'Master Gardener',
      imageSrc: 'https://demo.naturalnews.com/vipai/Assets/Images/Tool-Master-Gardener.jpg',
      link: '/tools/gardener',
    },
    {
      title: 'Longevity Roadmap',
      imageSrc: 'https://demo.naturalnews.com/vipai/Assets/Images/Tool-Longevity-Roadmap.jpg',
      link: '/tools/longevity',
    },
    {
      title: 'Simplify Scientific Journals',
      imageSrc:
        'https://demo.naturalnews.com/vipai/Assets/Images/Tool-Simplify-Scientific-Journals.jpg',
      link: '/tools/journals',
    },
    {
      title: 'Ingredient Checker',
      imageSrc: 'https://demo.naturalnews.com/vipai/Assets/Images/Tool-Ingredient-Checker.jpg',
      link: '/chat?type=ingredient',
    },
    {
      title: 'Chat with Enoch AI',
      imageSrc: 'https://demo.naturalnews.com/vipai/Assets/Images/Tool-Chat.jpg',
      link: '/chat',
    },
  ];
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useSelector((state) => state.user);

  useLayoutEffect(() => {
    setIsOpen(true);
  }, []);

  return (
    <div className="mt-20 mb-20">
      <h1 className="text-[46px] dark:text-[#E5E5EC]"> Enoch AI VIP Tools</h1>
      <p className="text-[23px] font-[300] text-primary mb-5">
        Use the power of Enoch AI to enhance your health and wellness
      </p>
      <div className="Collection flex flex-wrap gap-4">
        {postList.map((post, index) => (
          <Link
            to={post.link}
            className={`Post relative ${
              index >= 3 && index <= 6
                ? 'lg:basis-[calc(25%-1rem)] basis-[calc(50%-1rem)]'
                : 'lg:basis-[calc(33.333%-1rem)] basis-[calc(50%-1rem)]'
            } overflow-hidden group block rounded-lg `}
            key={index}
          >
            {/* Image with hover scaling */}
            <div className="PostThumb relative overflow-hidden">
              <img
                src={post.imageSrc}
                alt={post.title}
                className="w-full transition-transform duration-300 ease-in-out group-hover:scale-110"
              />
              {/* Overlay effect */}
              <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(92,107,78,0)_25%,rgba(92,107,78,0.8)_75%)]"></div>

              {/* <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(92,107,78,0)_25%,rgba(92,107,78,0.8)_75%)]"></div> */}
            </div>

            {/* Title (visible by default, moves up slightly on hover) */}
            <div className="PostTitle absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-lg font-light transition-all duration-300 group-hover:bottom-6 w-full text-center">
              {post.title}
            </div>

            {/* "Begin" Button (hidden by default, appears on hover) */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button className="px-4 py-2 bg-black text-white rounded">Begin</button>
            </div>
          </Link>
        ))}
      </div>

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
    </div>
  );
}

export default HomePage;
