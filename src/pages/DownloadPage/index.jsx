import React from 'react';
import { Link } from 'react-router-dom';

function DownloadPage() {
  return (
<div class="Questionnaire">
<div class="Block Headline Centered">Downloads</div>
<div class="Block Subhead Centered" id="PageDescription">Free downloable version of Enoch will be available soon</div>

<div class="Text Centered" id="PageArticle">
<p><Link to="/freeai/Subscribe">Join the waitlist to be the first to know</Link></p>
</div>

</div>
  );
}

export default DownloadPage;
