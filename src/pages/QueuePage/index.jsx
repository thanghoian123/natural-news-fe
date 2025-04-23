import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ToolItem from '../../components/Toolitem';
import Modal from '../../components/Modal';
const mockList = [
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
function QueuePage() {
  const placeholder = 'src\\assets\\images\\Tool-Placeholder.png';
  const [isOpenUpgrade, setIsOpenUpgrade] = useState(false); // Toggle menu

  return (
    <div>
      <div class="Section Narrow" id="SectionQueue">
        <div class="Content">
          <div class="PageBox">
            <div class="Block BigHeadline Centered">Your Question is in the Queue!</div>
            <div class="Block Text Centered">
              <b class="Alert">Check your email in approximately [x] minutes for the response.</b>
            </div>
            <div class="Block Disclaimer Centered" id="HomeDisclaimer">
              <p>
                Enoch AI is experimental. These statements are not intended to diagnose, treat, or
                cure any medical condition. Please verify all important information and always seek
                advice from your doctor, healthcare professional, or naturopath before making any
                changes to your existing medication or health routine.
              </p>
              <p>
                Enoch is a non-commercial, non-profit project for sharing human knowledge, funded
                and developed by the non-profit Consumer Wellness Center 501(C)3.
              </p>
              <p>
                Brighteon has donated the funds to host the infrastructure for Enoch, and is
                covering all data center costs in order to keep this model available to humanity at
                no cost, on a non-commercial basis.
              </p>
            </div>
            <div class="Block ButtonBox ButtonBoxCenter">
              <Link to="/Home">
                <button class="Button ButtonPrimary ButtonLarge">Ask Another Question</button>
              </Link>
            </div>

            <div class="Text Centered">
              <b>Don't want to wait?</b>{' '}
              <a href="Upgrade" target="_blank">
                Become an Enoch AI VIP Member
              </a>
            </div>
          </div>
        </div>
      </div>

      <div class="Section Narrow" id="SectionSites">
        <div class="Content">
          <div class="Block BigHeadline Centered">Explore the World of Brighteon</div>
          <div class="Block Text Centered">
            Consider these other Brighteon properties that support freedom, knowledge and human
            empowerment:
          </div>

          <div class="VIPTools USN">
            <div class="Collection">
              <a href="//www.brighteon.com" target="_blank" class="Post" id="SiteBrighteon">
                <div class="PostInfo">
                  <div class="PostBox">
                    <div class="PostThumb">
                      <img src={placeholder} />
                    </div>
                  </div>
                </div>
              </a>

              <a
                href="//www.brighteon.social"
                target="_blank"
                class="Post"
                id="SiteBrighteonSocial"
              >
                <div class="PostInfo">
                  <div class="PostBox">
                    <div class="PostThumb">
                      <img src={placeholder} />
                    </div>
                  </div>
                </div>
              </a>

              <a href="//www.brighteon.io" target="_blank" class="Post" id="SiteBrighteonIO">
                <div class="PostInfo">
                  <div class="PostBox">
                    <div class="PostThumb">
                      <img src={placeholder} />
                    </div>
                  </div>
                </div>
              </a>

              <a
                href="//www.brighteonstore.com"
                target="_blank"
                class="Post"
                id="SiteBrighteonStore"
              >
                <div class="PostInfo">
                  <div class="PostBox">
                    <div class="PostThumb">
                      <img src={placeholder} />
                    </div>
                  </div>
                </div>
              </a>

              <a href="//www.brighteon.news" target="_blank" class="Post" id="SiteBrighteonNews">
                <div class="PostInfo">
                  <div class="PostBox">
                    <div class="PostThumb">
                      <img src={placeholder} />
                    </div>
                  </div>
                </div>
              </a>

              <a
                href="//www.brighteonuniversity.com"
                target="_blank"
                class="Post"
                id="SiteBrighteonUniversity"
              >
                <div class="PostInfo">
                  <div class="PostBox">
                    <div class="PostThumb">
                      <img src={placeholder} />
                    </div>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      <section className="Section Narrow" id="SectionHomeTools">
        <div className="Content">
          <div className="Block BigHeadline Centered">Prompt Tools</div>
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
                  // userTier={user?.tier}
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

export default QueuePage;
