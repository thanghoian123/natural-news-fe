import React from 'react';

const getRandomWidth = () => `${Math.floor(Math.random() * (50 - 20 + 1) + 200)}px`;

const ChatSkeleton = ({ numOfLine = 1 }) => {
  return (
    <div className="space-y-2 w-full max-w-md mx-auto">
      {Array.from({ length: numOfLine }).map((_, index) => (
        <React.Fragment key={index}>
          {/* Skeleton for user message */}
          <div className="flex justify-end">
            <div
              className="bg-gray-300 animate-pulse rounded-lg p-2 h-4"
              style={{ width: getRandomWidth() }}
            ></div>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

export default ChatSkeleton;
