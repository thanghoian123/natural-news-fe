import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import InputChat from '../../components/InputChat';
import ToolItem from '../../components/ToolItem';
import Modal from '../../components/Modal';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
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
    link: '/chat?type=ingredient',
    tierAllow: ['Gold', 'Platinum'],
    toolName: 'ingredients-checker',
  },
];

function HomePage() {
  const { user } = useSelector((state) => state.user);
  const { modelType } = useSelector((state) => state.chat);
  const [input, setInput] = useState('');
  const [isOpenUpgrade, setIsOpenUpgrade] = useState(false); // Toggle menu
  const navigate = useNavigate();
  const handleSendMessage = () => {
    if (!input.trim()) return;
    navigate(`/received`, { state: { initialMessage: input } });
    setInput('');
  };

  return (
    <div>
      <section className="Section Narrow" id="SectionHomeChat">
        <div className="Content">
          <div className="Block BigHeadline UIColor Centered">Ask Enoch Anything</div>
          <InputChat
            value={input}
            onChange={(e) => setInput(e.target.value)}
            sendMessage={handleSendMessage}
            tokenRemaining={user?.reward || 0}
            isNewChat
            handleSelectPrompt={(option) => setInput((pre) => `${pre} ${option.label}`)}
            handlePressPropmt={(prompt) => setInput(prompt.messages)}
            handleChangeModel={(option) => console.log('Model change:', option)}
            modelType={modelType}
          />
        </div>
      </section>

      <section className="Section Narrow" id="SectionHomeDetails">
        <div className="Content">
          <div className="Block BigHeadline UIColor Centered">What is Enoch?</div>
          <div className="Block Text">
            <p>
              Enoch is the world's #1 AI language model on reality benchmarks. Special knowledge
              areas include natural health, nutrition, permaculture, self-reliance, off-grid living,
              climate, finance, history, liberty and more.
            </p>
            <p>
              Enoch is capable of deep research, generating content, summarizing content, answering
              questions, basic reasoning and more.
            </p>
          </div>
          <div className="Text Centered">
            <Link to="/freeai/Guide" id="MastheadAbout">
              Prompting Guide
            </Link>{' '}
            • <Link to="/freeai/About">About Enoch</Link> •{' '}
            <a href="Downloads">Downloadable Versions</a>
          </div>
        </div>
      </section>

      <section className="Section Narrow" id="SectionHomeTools">
        <div className="Content">
          <div className="Block BigHeadline UIColor Centered">Prompt Tools</div>
          <div className="Block Text Centered">
            Use these exclusive tools to help construct a detailed prompt:
          </div>
          <div className="VIPTools USN">
            <div className="Collection">
              {mockList.map((post, index) => (
                <ToolItem
                  key={index}
                  post={post}
                  index={index}
                  userTier={user?.tier}
                  onUpgrade={() => setIsOpenUpgrade(true)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <Modal isOpen={isOpenUpgrade} onClose={() => setIsOpenUpgrade(false)}>
        <div class="Content NoClose">
          <div class="Card">
            <div class="Headline Centered">Upgrade to Unlock Access</div>
            <div class="Block Text Centered">These tools are available for our VIP members.</div>
            <div class="Block">
              <div class="ButtonBox ButtonBoxCenter">
                <a href="https://www.healthrangerstore.com/enoch" target="_blank">
                  <button class="Button ButtonPrimary ButtonClose">Upgrade Today</button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default HomePage;
