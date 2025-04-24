import React from 'react';
import { Link } from 'react-router-dom';

function LicensePage() {
  return (
<div class="Questionnaire">
<div class="Block Headline Centered">License Information</div>
<div class="Block Subhead Centered" id="PageDescription">Please review the following text for all Brighteon.AI models</div>

<div class="Text" id="PageArticle">
<p>Copyright 2024 Consumer Wellness Center (CWClabs.com), 501(3)c non-profit, Data Science Division<br/>
Licensed under the Apache License, Version 2.0 (the &quot;License&quot;);<br/>
you may not use this file except in compliance with the License.<br/>
You may obtain a copy of the License at<br/>
<a href="http://www.apache.org/licenses/LICENSE-2.0" target="_blank">http://www.apache.org/licenses/LICENSE-2.0</a></p>
<p>Unless required by applicable law or agreed to in writing, software<br/>
distributed under the License is distributed on an &quot;AS IS&quot; BASIS,<br/>
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.<br/>
See the License for the specific language governing permissions and<br/>
limitations under the License.</p>
<p>For Neo models based on Phi-2 base models:<br/>
MIT License<br/>
<br/>
Permission is hereby granted, free of charge, to any person obtaining a copy<br/>
of this software and associated documentation files (the "Software"), to deal<br/>
in the Software without restriction, including without limitation the rights<br/>
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell<br/>
copies of the Software, and to permit persons to whom the Software is<br/>
furnished to do so, subject to the following conditions:<br/>
<br/>
The above copyright notice and this permission notice shall be included in all<br/>
copies or substantial portions of the Software.<br/>
<br/>
THE SOFTWARE IS PROVIDED *AS IS*, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR<br/>
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,<br/>
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE<br/>
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER<br/>
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,<br/>
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE<br/>
SOFTWARE.</p>
</div>

</div>
  );
}

export default LicensePage;
