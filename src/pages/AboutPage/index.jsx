import React from 'react';
import { Link } from 'react-router-dom';

function AboutPage() {
  return (
    <div class="Questionnaire">
      <div class="Block Headline Centered">About Brighteon AI</div>
      <div class="Block Subhead Centered" id="PageDescription">
        Learn more about Brighteon.AI knowledge models
      </div>

      <div class="Text" id="PageArticle">
        <p>
          Our Knowledge Models are built by the non-profit Consumer Wellness Center using donations
          from Brighteon. Mike Adams is the chief project operations executive and data pipeline
          engineer. Our models are gifted to the world to help achieve decentralization of human
          knowledge and empowerment of individuals while bypassing Big Tech's deliberate suppression
          of knowledge on health, wellness, disease treatments and personal liberty.
        </p>

        <h2>What is Enoch AI? </h2>
        <p>
          Enoch AI, is our latest &quot;Knowledge Model&quot; (LLM) trained on the world's largest
          curated collection of content that's typically censored or missing from search engines and
          other LLMs. Enoch AI is especially well trained on:
        </p>

        <ul>
          <li>Food, diets, food ingredients and cosmetic / personal care ingredients</li>
          <li>Nutrition, nutritional supplements and phytochemistry</li>
          <li>
            Herbs, Traditional Chinese Medicine and numerous alt medicine arts including homeopathy
          </li>
          <li>Wellness, natural health and fitness</li>
          <li>Alternative medicine protocols, light therapy, detoxification and more</li>
          <li>Pollution, pesticides, heavy metals and chemical exposure</li>
          <li>Modern medicine, hospitals, Big Pharma, COVID and vaccines</li>
          <li>
            Disease reversal knowledge covering cancer, diabetes, heart disease, depression and
            numerous other health conditions
          </li>
          <li>Survival, preparedness and off-grid living</li>
          <li>Gardening, permaculture, food production and diagnosing plant diseases</li>
          <li>DIY skills, homesteading and repair skills, including for firearms</li>
          <li>Economics, finance, banks and currency</li>
          <li>Cryptocurrency and decentralized finance</li>
          <li>Climate reality, energy and alternative energy including cold fusion</li>
          <li>UFOs and UAPs, previously declassified government documents on many subjects</li>
          <li>Government, true history, geopolitics, globalism, censorship and psyops</li>
          <li>Philosophy, spirituality and consciousness</li>
          <li>
            Breakthrough science such as cold fusion, morphic resonance, quantum computing and AI
          </li>
        </ul>

        <p>
          <b>Security Truth:</b> Enoch AI is not an app. It does not consist of executable code. It
          has no ability to connect to the internet or to spy on users. It contains no DLLs, no
          computer code, no scripts, nothing. It is merely a large hyperdimensional database of
          token vectors representing words and ideas. To use Enoch, you load it into other software
          such as{' '}
          <a href="//lmstudio.ai" target="_blank">
            LM Studio
          </a>{' '}
          or{' '}
          <a href="//ollama.com" target="_blank">
            Ollama
          </a>
          , which then provides &quot;inference&quot; of Enoch AI (so that you can chat with it and
          ask questions).
        </p>

        <h2>Training Data </h2>
        <p>
          Enoch AI is trained on an extensive set of curated content. While this list is not
          complete, the training data includes:
        </p>

        <ul>
          <li>All articles from ANH-USA and ANH Intl</li>
          <li>All articles from Childrens' Health Defense (CHD)</li>
          <li>All articles from Green Med Info</li>
          <li>All content from The Truth About Cancer (TTAC)</li>
          <li>All articles from Dr. Joseph Mercola's website</li>
          <li>All articles from Natural News</li>
          <li>All interviews ever conducted by Mike Adams</li>
          <li>All episodes of Decentralize TV</li>
          <li>All videos from David Morgan, the Silver Guru</li>
          <li>Over 1 million pages of documents from the Arlington Institute</li>
          <li>All lectures coordinated by liberty advocate Cory Endrulat</li>
          <li>
            Over 2 million pages of additional text on natural medicine, nutrition, preparedness and
            practical skills
          </li>
          <li>
            100,000+ hours of curated video lectures, interviews and presentations on a multitude of
            subjects
          </li>
        </ul>
      </div>
    </div>
  );
}

export default AboutPage;
