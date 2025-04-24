import React from 'react';
import { Link } from 'react-router-dom';

function CopyrightsPage() {
  return (
    <div class="Questionnaire">
<div class="Block Headline Centered">Copyrights</div>
<div class="Block Subhead Centered" id="PageDescription">Please review the following text for all Brighteon.AI models</div>

<div class="Text" id="PageArticle">
<p>Our large language models (LLMs) are trained on copyrighted content under Fair Use protections that provide a legal defense against copyright infringement claims if the resulting work meets a number of conditions. </p>
<p>Our LLMs meets and exceed all the necessary conditions. No work upon which our LLMs are trained is copied or archived in the our models. Source material used for training our models merely influences their parameters that describe relationships between existing tokens (words). It is impossible for a user to reproduce a book, article or transcript from our LLMs, even if they were trained on that original source material. Our models learn from a source book in the same way that a human being might learn from the source book. The book influences the reader's knowledge and may alter the reader's explanation of the subjects covered in the book. This is the point of publishing books, to influence the understanding and knowledge of humanity. </p>
<p>Our models are never trained on secret, classified or private documents. Only open source material that is intended to be consumed by the public (videos, articles, books, etc.) is used for training our models. If you are an author or content creator and you do not wish for our models to read your content, then do not publish your content in a form that is readily accessible by the public. </p>
<p>Are models are not trained on NY Times articles because the NY Times is not credible. The training material is chosen for its authenticity in reflecting reality, not intelligence community propaganda pushed through the fake news media.</p>
</div>

</div>

  );
}

export default CopyrightsPage;
