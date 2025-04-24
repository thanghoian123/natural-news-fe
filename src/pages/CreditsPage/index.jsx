import React from 'react';
import { Link } from 'react-router-dom';

function CreditsPage() {
  return (
<div class="Questionnaire">
<div class="Block Headline Centered">Credits</div>
<div class="Block Subhead Centered" id="PageDescription">A special thanks to everyone that helped train our models</div>

<div class="Text" id="PageArticle">
<p>Most of our models stem from the base model work achieved by the outstanding team at <a href="https://Mistral.ai" target="_blank">Mistral.ai</a>. We wish to thank the Mistral team for their commitment to open source LLMs and for advancing the state of the art of generative text, upon which organizations like ours can build models with specialized knowledge that empowers humanity while bypassing Big Tech censorship on topics that are critically important to human survival and prosperity.</p>
<p>Our models, however, are not sponsored by Mistral, and the Mistral organization may or may not approve of the specific use cases to which we apply their base models. Such is the nature of open source projects. Regardless, our organization operates in good faith for humanity, with the purpose of empowering, uplifting and helping educate human beings with core knowledge that can enhance their health, abundance and personal liberty. We believe that knowledge should be decentralized, and access to knowledge should not be censored. We are contributing our models to the open source community and engineering enhanced data pipelines in order to substantially expand the fine-tuning of future base models.</p>
<p>Models containing the names &quot;Mistral&quot; or &quot;Mixtral&quot; are built upon base models credited to Mistral.ai and the team: Albert Jiang, Alexandre Sablayrolles, Arthur Mensch, Blanche Savary, Chris Bamford, Devendra Singh Chaplot, Diego de las Casas, Emma Bou Hanna, Florian Bressand, Gianna Lengyel, Guillaume Bour, Guillaume Lample, L&eacute;lio Renard Lavaud, Louis Ternon, Lucile Saulnier, Marie-Anne Lachaux, Pierre Stock, Teven Le Scao, Th&eacute;ophile Gervet, Thibaut Lavril, Thomas Wang, Timoth&eacute;e Lacroix, William El Sayed.</p>
<p>Models containing the name &quot;Dolphin&quot; are built upon base models which have been modified to &quot;uncensored&quot; status by Eric Hartford: <a href="https://EricHartford.com" target="_blank">EricHartford.com</a> and which are generally distributed under username &quot;TheBloke.&quot; Patreon page at <a href="https://www.patreon.com/TheBlokeAI" target="_blank">https://www.patreon.com/TheBlokeAI</a> &ndash; computational support provided by A16Z as well as Convai.</p>
<p>We wish to thank the engineers at <a href="https://LMstudio.ai" target="_blank">LMstudio.ai</a> for creating end user applications that allow for free, non-commercial use of their LLM inference technology.</p>
<p>Models containing &quot;Phi-2&quot; are credited to Microsoft, which has contributed to the open source community by making base model parameters for Phi-2 available to the public under the MIT license.</p>
<p>Self-executing versions of Neo are built using llamafile from Mozilla, credit goes to&nbsp;<a href="https://github.com/Mozilla-Ocho/llamafile" target="_blank">https://github.com/Mozilla-Ocho/llamafile</a></p>
<p>Special thanks to Ty and Charlene Bollinger for The Truth About Cancer (TTAC) content, which contributed to the training of Neo models.</p>
</div>

</div>
  );
}

export default CreditsPage;
