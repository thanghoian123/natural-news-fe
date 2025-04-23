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
    console.log('Upgrade button clicked');
    if (isDisabled && onUpgrade) {
      onUpgrade(); // Call the upgrade action passed from the parent
    }
  };

  return (
    <Link
      to={isDisabled ? '#' : post.link}
      className={`Post` + (isDisabled ? ' PostLocked ButtonUpgrade NoClose' : '')}
      key={index}
      onClick={(e) => {
        isDisabled ? handleUpgradeClick() : dispatch(setToolName(post.toolName));
      }}
    >
      <div className="PostInfo">
        <div className="PostBox">
          {isDisabled && (
            <div className="Icon IconSmall">
              <span className="Mask MaskLocked"></span>
            </div>
          )}

          <div className="PostThumb">
            <img src={post.imageSrc} />
          </div>
          <div className="PostAction">
            <span>
              <button className="ButtonSmall ButtonBlack">
                {isDisabled ? 'Upgrade' : 'Begin'}
              </button>
            </span>
          </div>
          <div className="PostTitle">{post.title}</div>
          <div className="PostFade"></div>
        </div>
      </div>
    </Link>
  );
};

export default ToolItem;
