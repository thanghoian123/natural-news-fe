import { Link } from 'react-router-dom';
import React from 'react';
import { Lock } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setToolName } from '../../redux/chatSlice';

const ToolItem = ({ post, index, userTier, onUpgrade }) => {
  const { tierAllow } = post;
  const isDisabled = !tierAllow.includes(userTier);
  const dispatch = useDispatch();
  const handleUpgradeClick = () => {
    if (isDisabled && onUpgrade) {
      onUpgrade(); // Call the upgrade action passed from the parent
    }
  };

  return (
    <Link
      to={isDisabled ? '#' : post.link}
      className={`Post relative ${
        index >= 3 && index <= 6
          ? 'lg:basis-[calc(25%-1rem)] basis-[calc(50%-1rem)]'
          : 'lg:basis-[calc(33.333%-1rem)] basis-[calc(50%-1rem)]'
      } overflow-hidden group block rounded-lg ${isDisabled ? 'cursor-not-allowed' : ''}`}
      key={index}
      onClick={(e) => {
        isDisabled ? e.preventDefault() : dispatch(setToolName(post.toolName));
      }}
    >
      {/* Lock Icon for Disabled Items */}
      {isDisabled && (
        <div className="absolute top-2 left-2 bg-black p-2 rounded-sm z-40">
          <Lock className="text-white w-3 h-3" />
        </div>
      )}

      {/* Image with hover scaling (grayscale applied only to image) */}
      <div className={`PostThumb relative overflow-hidden ${isDisabled ? 'opacity-60' : ''}`}>
        <img
          src={post.imageSrc}
          alt={post.title}
          className={`w-full transition-transform duration-300 ease-in-out group-hover:scale-110 ${isDisabled ? 'filter grayscale' : ''}`}
        />
        {/* Overlay effect */}
        <div
          className={`absolute inset-0 ${!isDisabled && `bg-[linear-gradient(to_bottom,rgba(92,107,78,0)_25%,rgba(92,107,78,0.8)_75%)]`}`}
        ></div>
      </div>

      {/* Title (visible by default, moves up slightly on hover) */}
      <div className="PostTitle absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-lg font-light transition-all duration-300 group-hover:bottom-6 w-full text-center">
        {post.title}
      </div>

      {/* "Begin" Button (hidden by default, appears on hover) */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button
          className={` px-4 py-2 rounded bg-black text-white ${isDisabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
          //   disabled={isDisabled}
          onClick={handleUpgradeClick} // Handle upgrade action
        >
          {isDisabled ? 'Upgrade' : 'Begin'}
        </button>
      </div>
    </Link>
  );
};

export default ToolItem;
