import React from 'react';
import { Link } from 'react-router-dom';

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
    </div>
  );
}

export default HomePage;
