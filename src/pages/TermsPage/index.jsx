import React, {useState} from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import logo from '../../assets/Logo-Color.svg';

function TermsPage() {
  const { docType } = useParams();
  const [openIndex, setOpenIndex] = useState(null);
  const [tab, setTab] = useState('FAQs');
  const getTitle = () => {
    switch (docType) {
      case 'Privacy':
        return 'Privacy Policy';
      case 'Terms':
        return 'Terms of Service';
      case 'Home':
        return 'Enoch AI Support';
    }
  };
  const faqs = [
    {
      question: 'How do I create an account?',
      answer: (
        <p>
          If you're a Health Ranger Store newsletter subscriber, then you already have an account.
          Just use the email address you subscribe with to log in. If you're not a subscriber, you
          can{' '}
          <a
            href="https://www.healthrangerstore.com"
            className="text-[#577836] underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            subscribe for free at the Health Ranger Store
          </a>
          .
        </p>
      ),
    },
    {
      question: 'How do I get an Access Code?',
      answer: (
        <p>
          During the log in process, we'll send you an access code to enter as the final step. If
          you do not get this email within a few minutes, try checking your junk/spam folder as it
          might have been redirected there.
        </p>
      ),
    },
    {
      question: 'What are "Questions?"',
      answer: (
        <p>
          "Questions" are like tokens or credits you can use with Enoch AI. Each time you ask a
          question or tell Enoch to do something for you, it uses a credit. The more of these you
          have in your account, the more you can ask Enoch.
        </p>
      ),
    },
    {
      question: 'How do I get more "Questions?"',
      answer: (
        <p>
          As long as you are an active Health Ranger Store newsletter subscriber, we'll add more to
          your account each day.
        </p>
      ),
    },
    {
      question: 'What are the membership tiers?',
      answer: (
        <p>
          Enoch AI membership tiers are divided into four different tiers: Bronze, Silver, Gold, and
          Platinum. The higher the tier you are in, the more VIP Tools are accessible to you.
          <a
            href="https://www.healthrangerstore.com"
            className="text-[#577836] underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Click here for more information.
          </a>
        </p>
      ),
    },
    {
      question: 'How do I upgrade my membership tier?',
      answer: (
        <p>
          The more you spend at the Health Ranger Store on quality lab-tested health products, the
          higher you can upgrade.{' '}
          <a
            href="https://www.healthrangerstore.com"
            className="text-[#577836] underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Click here for more information.
          </a>
        </p>
      ),
    },
    {
      question: 'How do I change my email address?',
      answer: (
        <p>
          Unfortunately, you cannot change your email address with the Enoch AI system. You can
          however subscribe to the
          <a
            href="https://www.healthrangerstore.com"
            className="text-[#577836] underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Health Ranger Store newsletter
          </a>{' '}
          with a different email address and then log into Enoch AI using this new address. You can
          also log into your Health Ranger Store account (if you have one) and update your email
          address there. Just make sure it's the same email address you use to subscribe to the
          newsletter.
        </p>
      ),
    },
    {
      question: 'What if I unsubscribe from the Health Ranger Store newsletter?',
      answer: (
        <p>
          If you unsubscribe then you will no longer be able to access Enoch AI VIP Tools. But
          there's good news,{' '}
          <a
            href="https://www.healthrangerstore.com"
            className="text-[#577836] underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            you can always re-subscribe at any time!
          </a>
        </p>
      ),
    },
  ];

  const usingEnoch = [
    {
      question: 'How Do I ask Enoch a question?',
      answer: (
        <p>
          You can ask Enoch a question like you would a human being... and just like a human being, the more details you provide, the better the answer will be.
        </p>
      ),
    },
    {
      question: 'How can I ask Enoch to summarize something for me?',
      answer: (
        <p>
          The easiest way is to type something like: " Please summarize the following text:" and the copy/paste the text of what you want summarized. You can also provide more detailed instructions like telling Enoch to summarize it in less than three paragraphs, or in one sentence if you want a shorter summary.
        </p>
      ),
    },
    {
      question: 'How to do I ask Enoch to show a relation between multiple topics?',
      answer: (
        <p>
          The best way to connect multiple topics is to ask how the topics relate to each other in regards to something. For example, you could ask "How are dehydration and potassium related to good health and wellness in the human body."
        </p>
      ),
    },
  ];

  const contentMap = {
    'Terms of Service': (
      <>
        <p>
          These Terms of Service ("Terms") govern your access to and use of the Brighteon.AI website
          and apps ("Brighteon.AI" or the "Service"). Please read these Terms carefully, and contact
          us if you have any questions. By accessing or using Brighteon.AI, you agree to be bound by
          these Terms, our Privacy Policy, our Cookies Policy and our Community Guidelines.
        </p>
        <p>
          You may use Brighteon.AI only if you can legally form a binding contract with
          Brighteon.AI, and only in compliance with these Terms and all applicable laws. When you
          create your Brighteon.AI account, you must provide us with accurate and complete
          information. Any use or access by anyone under the age of 13 is not allowed.
        </p>
        <p>
          Subject to these Terms and our policies (including our Community Guidelines), we grant you
          a limited, non-exclusive, non-transferable, and revocable license to use our Service.
        </p>
        <p>
          If you use Brighteon.AI for commercial purposes, and if you do open an account for a
          company, organization, or other entity, then "you" includes you and that entity, and you
          promise that you are authorized to grant all permissions and licenses provided in these
          Terms and bind the entity to these Terms, and that you agree to these Terms on the
          entity's behalf.
        </p>
        <p>
          Brighteon.AI allows you to post content, including videos, comments, descriptions, and
          other materials. Anything that you post or otherwise make available on Brighteon.AI is
          referred to as "User Content." You retain all rights in, and are solely responsible for,
          the User Content you post to Brighteon.AI.
        </p>
        <p>
          You grant Brighteon.AI and our users a non-exclusive, royalty-free, transferable,
          sublicensable, worldwide license to use, store, display, reproduce, save, modify, create
          derivative works, perform, and distribute your User Content on Brighteon.AI solely for the
          purposes of operating, developing, providing, and using Brighteon.AI. Nothing in these
          Terms restricts other legal rights Brighteon.AI may have to User Content, for example
          under other licenses. We reserve the right to remove or modify User Content, or change the
          way it's used on Brighteon.AI, for any reason. This includes User Content that we believe
          violates these Terms, our Community Guidelines, or any other policies.
        </p>
        <p>
          Following termination or deactivation of your account, or if you remove any User Content
          from Brighteon.AI, we may keep your User Content for a reasonable period of time for
          backup, archival, or audit purposes.
        </p>
        <p>
          If you submit comments, ideas or feedback to Brighteon.AI, you agree that we are free to
          use them without any restriction or compensation to you. By accepting your submission,
          Brighteon.AI doesn't waive any rights to use similar or related feedback previously known
          to Brighteon.AI, or developed by its employees, or obtained from sources other than you.
        </p>
        <p>
          While we work to protect the security of your content and account, Brighteon.AI can't
          guarantee that unauthorized third parties won't be able to defeat our security measures.
          We ask that you keep your password secure. Please notify us immediately of any compromise
          or unauthorized use of your account.
        </p>
        <p>
          Brighteon.AI may contain links to third party websites, advertisers, services, special
          offers, or other events or activities that are not owned or controlled by Brighteon.AI. We
          don't endorse or assume any responsibility for any such third party sites, information,
          materials, products, or services. If you access any third party website, service, or
          content from Brighteon.AI, you do so at your own risk and you agree that Brighteon.AI has
          no liability arising from your use of or access to any third party website, service, or
          content.
        </p>
        <p>
          Brighteon.AI may terminate or suspend your right to access or use Brighteon.AI for any
          reason, without notice. We may terminate or suspend your access immediately and without
          notice if we have a good reason, including any violation of our Community Guidelines. Upon
          termination, you continue to be bound by the rest of these Terms.
        </p>
        <p>
          If you use Brighteon.AI for commercial purposes, you agree to indemnify and hold harmless
          Brighteon.AI, their affiliates and their respective officers, directors, employees and
          agents, from and against any claims, suits, proceedings, disputes, demands, liabilities,
          damages, losses, costs and expenses, including, without limitation, reasonable legal and
          accounting fees (including costs of defense of claims, suits or proceedings brought by
          third parties), in any way related to your access to or use of our Service, your User
          Content, or your breach of any of these Terms.
        </p>
        <p>
          Our Service and all content on Brighteon.AI is provided on an "as is" basis without
          warranty of any kind, whether express or implied.
        </p>
        <p>
          Brighteon.AI specifically disclaims any and all warranties and conditions of
          merchantability, fitness for a particular purpose, and non-infringement, and any
          warranties arising out of course of dealing or usage of trade.
        </p>
        <p>
          Brighteon.AI takes no responsibility and assumes no liability for any User Content that
          you or any other person or third party posts or sends using our Service. You understand
          and agree that you may be exposed to User Content that's inaccurate, objectionable,
          inappropriate for children, or otherwise unsuited to your purpose.
        </p>
        <p>
          TO THE MAXIMUM EXTENT PERMITTED BY LAW, Brighteon.AI SHALL NOT BE LIABLE FOR ANY INDIRECT,
          INCIDENTAL, SPECIAL, CONSEQUENTIAL OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR
          REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, OR
          OTHER INTANGIBLE LOSSES, RESULTING FROM (A) YOUR ACCESS TO OR USE OF OR INABILITY TO
          ACCESS OR USE THE SERVICE; (B) ANY CONDUCT OR CONTENT OF ANY THIRD PARTY ON THE SERVICE,
          INCLUDING WITHOUT LIMITATION, ANY DEFAMATORY, OFFENSIVE OR ILLEGAL CONDUCT OF OTHER USERS
          OR THIRD PARTIES; OR (C) UNAUTHORIZED ACCESS, USE OR ALTERATION OF YOUR TRANSMISSIONS OR
          CONTENT. IN NO EVENT SHALL Brighteon.AI'S AGGREGATE LIABILITY FOR ALL CLAIMS RELATING TO
          THE SERVICE EXCEED ONE HUNDRED U.S. DOLLARS (U.S. $100.00).
        </p>
        <p>
          For any dispute you have with Brighteon.AI, you agree to first contact us and try to
          resolve the dispute with us informally. If we need to contact you, we will do so at the
          email address on your Brighteon.AI account. If Brighteon.AI hasn't been able to resolve
          the dispute with you informally, we each agree to resolve any claim, dispute, or
          controversy (excluding claims for injunctive or other equitable relief) arising out of or
          in connection with or relating to these Terms through binding arbitration or (for
          qualifying claims) in small claims court.
        </p>
        <p>
          You agree that, by agreeing to these Terms of Service, the U.S. Federal Arbitration Act
          governs the interpretation and enforcement of this provision, and that you and
          Brighteon.AI are each waiving the right to a trial by jury or to participate in a class
          action. The arbitrator has exclusive authority to resolve any dispute relating to the
          interpretation, applicability, or enforceability of this binding arbitration agreement.
          This arbitration provision shall survive termination of this Agreement and the termination
          of your Brighteon.AI account.
        </p>
        <p>
          Any arbitration will be administered by the American Arbitration Association ("AAA") under
          the Consumer Arbitration Rules then in effect for the AAA, except as provided herein. You
          can find their forms at www.adr.org. Unless you and Brighteon.AI agree otherwise, the
          arbitration will be conducted in the county (or parish) where you reside. Each party will
          be responsible for paying any AAA filing, administrative and arbitrator fees in accordance
          with AAA Rules, except that Brighteon.AI will pay for your reasonable filing,
          administrative, and arbitrator fees if your claim for damages does not exceed $75,000 and
          is non-frivolous (as measured by the standards set forth in Federal Rule of Civil
          Procedure 11(b)). If your claim is for $10,000 or less, we agree that you may choose
          whether the arbitration will be conducted solely on the basis of documents submitted to
          the arbitrator, through a telephonic hearing, or by an in-person hearing as established by
          the AAA Rules. If your claim exceeds $10,000, the right to a hearing will be determined by
          the AAA Rules. Regardless of the manner in which the arbitration is conducted, the
          arbitrator shall issue a reasoned written decision explaining the essential findings and
          conclusions on which the award is based, and any judgment on the award rendered by the
          arbitrator may be entered in any court of competent jurisdiction. Nothing in this Section
          shall prevent either party from seeking injunctive or other equitable relief from the
          courts, including for matters related to data security, intellectual property or
          unauthorized access to the Service. ALL CLAIMS MUST BE BROUGHT IN THE PARTIES' INDIVIDUAL
          CAPACITY, AND NOT AS A PLAINTIFF OR CLASS MEMBER IN ANY PURPORTED CLASS OR REPRESENTATIVE
          PROCEEDING, AND, UNLESS WE AGREE OTHERWISE, THE ARBITRATOR MAY NOT CONSOLIDATE MORE THAN
          ONE PERSON'S CLAIMS. YOU AGREE THAT, BY ENTERING INTO THESE TERMS, YOU AND Brighteon.AI
          ARE EACH WAIVING THE RIGHT TO A TRIAL BY JURY OR TO PARTICIPATE IN A CLASS ACTION.
        </p>
        <p>
          NOTHING IN THESE TERMS OF SERVICE SHALL AFFECT ANY NON-WAIVABLE STATUTORY RIGHTS THAT
          APPLY TO YOU. To the extent any claim, dispute or controversy regarding Brighteon.AI or
          our Service isn't arbitrable under applicable laws or otherwise: you and Brighteon.AI both
          agree that any claim or dispute regarding Brighteon.AI will be resolved exclusively in
          accordance with the "governing law" section of these Terms.
        </p>
        <p>
          Governing law: These Terms shall be governed by the laws of the State of Texas, without
          respect to its conflict of laws principles.
        </p>
        <p>
          We reserve the right to determine the form and means of providing notifications to you,
          and you agree to receive legal notices electronically if that's what we decide. We may
          revise these Terms from time to time and the most current version will always be posted on
          our website. If a revision, in our discretion, is material, we will notify you. By
          continuing to access or use Brighteon.AI after revisions become effective, you agree to be
          bound by the new Terms. If you don't agree to the new terms, please stop using
          Brighteon.AI.
        </p>
        <p>
          These Terms, and any rights and licenses granted hereunder, may not be transferred or
          assigned by you, but may be assigned by Brighteon.AI without restriction. Any attempted
          transfer or assignment in violation hereof shall be null and void.
        </p>
        <p>
          These Terms, together with the Privacy Policy and any amendments and any additional
          agreements you may enter into with Brighteon.AI shall constitute the entire agreement
          between you and Brighteon.AI concerning the Service. If any provision of these Terms is
          deemed invalid, then that provision will be limited or eliminated to the minimum extent
          necessary, and the remaining provisions of these Terms will remain in full force and
          effect.
        </p>
        <p>
          No waiver of any term of these Terms shall be deemed a further or continuing waiver of
          such term or any other term, and Brighteon.AI's failure to assert any right or provision
          under these Terms shall not constitute a waiver of such right or provision.
        </p>
      </>
    ),
    'Privacy Policy': (
      <>
        <p>
          Generally speaking, Brighteon.AI tracks the minimal amount of information necessary to
          perform its intended functions. This means that for "content creators," Brighteon.AI
          tracks user logins, user emails and other information necessary to operate and maintain
          that account. For end users who are watching videos but not uploading videos, very little
          information is tracked: Mostly just web server log information such as IP address, session
          cookies (which expire quickly) and a list of the videos which were access. This
          information, however, is not maintained across multiple sessions, and because end users
          never log in, we do not possess any persistent record of the videos a particular end user
          watches, nor the search terms they are entering.
        </p>
        <p>
          Brighteon.AI strives to avoid all Google components and does not intentionally use any
          tracking technology from Google such as Adwords, Adsense, Analytics or other similar
          technologies. Because Google's technology has infiltrated so much of the code base used in
          delivering internet services, it is possible there may be small Google components lurking
          in software components used by Brighteon.AI, but our intention is to identify and remove
          or replace all such components as they are discovered in order to provide a 100%
          Google-free experience. (If you find a Google component anywhere in our code, please alert
          us via support.Brighteon.AI so that we may work to remove that code.)
        </p>
        <p>
          Brighteon.AI (Brighteon Media, Inc.) does not, under any conditions, sell any information
          about its users to any third party entity of any kind. Furthermore, Brighteon.AI does not
          share any information about its users with any deep state / intelligence community
          operations unless ordered to do so by a legally valid court order. Because we are located
          in the United States, we must comply with U.S. court orders. Where permissible by law, we
          will make reasonable efforts to alert individual users when a law enforcement / court
          order request is made for their information.
        </p>
        <p>
          When you sign up for or use Brighteon.AI as a content creator (a video uploader), you give
          us certain information voluntarily. This includes your name, email address, profile photo,
          comments, and any other information you give us. You can also choose to share videos with
          us. If you buy something on BrighteonStore.com, we collect payment information, contact
          information (address and phone number) and details of what you bought. If you buy
          something for someone else on Brighteon.AI, we collect their delivery details and contact
          information.
        </p>
        <p>
          Whenever you use any website, mobile application or other internet service, certain
          information gets created and logged automatically. The same is true when you use
          Brighteon.AI. Here are some of the types of information we collect:
        </p>
        <p>
          Log data. When you use Brighteon.AI, our servers record information ("log data"),
          including information that your browser automatically sends whenever you visit a website,
          or that your mobile app automatically sends when you're using it. This log data includes
          your Internet Protocol address, the address of and activity on websites you visit that
          incorporate Brighteon.AI features (such as video embed code), searches, browser type and
          settings, the date and time of your request, cookie data and device data. Cookie data. We
          use "cookies" (small text files sent by your computer each time you visit our website,
          unique to your Brighteon.AI account or your browser) or similar technologies to capture
          session data. When we use cookies or other similar technologies, we use session cookies
          (that last until you close your browser) or persistent cookies (that last until you or
          your browser delete them). For example, we may use cookies to store your user experience
          preferences or other settings so you don't have to set them up every time you visit
          Brighteon.AI. Some of the cookies we use are associated with your Brighteon.AI account
          (including information about you, such as the email address you gave us) and other cookies
          are not. The purpose of using cookies is to enhance your user experience on Brighteon.AI.
          If you wish, you may access Brighteon.AI using "incognito" browsers that do not share
          cookie information. You may also access Brighteon.AI through VPN services that conceal
          your originating IP address. Device information. In addition to log data, we collect
          information about the device you're using Brighteon.AI on, including type of device,
          operating system, settings, unique device identifiers and other information. We also get
          information about your activity outside Brighteon.AI from other websites that embed
          Brighteon.AI video players. This information is limited to the server log information
          passed by the Brighteon.AI player itself, which includes the IP address of the requesting
          device or computer. We use the information we collect to provide the Service to you. Our
          aim is to provide you access to video content, comment content and other content of
          interest to you, without engaging in the kind of "psychological profile" tracking often
          pursued by more prominent video websites. In order to provide a quality user experience,
          we use your information to:
        </p>
        <p>
          Identify content creators when you use Brighteon.AI to upload, edit or modify your videos.
          Recommend videos you might like based on your activity on Brighteon.AI. Because end users
          do not log in, this "related content" algorithm is limited to the current browser session.
          Respond to your questions or comments. In addition and for similar reasons, we have a
          legitimate interest in using your information in these ways. It is also fundamental to the
          nature of the Service we provide. In short, it's necessary for us to do these things in
          order to make the Service relevant, interesting and personal to you, and it is in both of
          our interests for us to do that.
        </p>
        <p>
          We also have a legitimate interest to improve Brighteon.AI, maintain our relationship with
          you, and protect users. We both benefit when we use your information to:
        </p>
        <p>
          Suggest other related videos on Brighteon.AI. Conduct analytics on who is using
          Brighteon.AI and what they are doing. For example, by analyzing the geographic location of
          Brighteon.AI users, we can gain insight into the levels of interest in different countries
          or U.S. states. Improve Brighteon.AI and offer new features. Send you updates (such as
          when certain activity, like video approvals, happens on Brighteon.AI) and news by email or
          push notification, depending on your settings. For example, we send email newsletters with
          updates on the Brighteon.AI system. Work with law enforcement and keep Brighteon.AI safe.
          We may get requests for account information from law enforcement authorities via court
          order. To find out more about how we respond to law enforcement requests, please see our
          Law Enforcement Guidelines. We have a legitimate interest in delivering ads that are
          relevant, interesting and personal to you in order to generate revenue to fund this
          Service. To further these interests we use the information we collect to: Decide which ads
          to show you. For example, if you show an interest in survival gear on Brighteon.AI, we may
          show you ads for other survival products. We customize the ad content we show you by
          identifying your interests based on your onsite and offsite activities. Where we use
          cookies to identify your offsite interests, we will obtain consent where required. Where
          ad partners or other third parties share information with us about you, we rely on the
          consent they have obtained. Tell our ad partners how their Brighteon.AI ads are doing, and
          how to make them better. Some of this information is aggregated. For example, we would
          report to an advertiser that a certain percentage of people who viewed a particular video
          went on to visit that advertiser's site. In addition to the specific circumstances above,
          we'll only use your information with your consent in order to:
        </p>
        <p>
          Send you marketing materials by email, text or push notification, depending on your
          account or operating system settings. Each time we send you marketing materials, we give
          you the option to unsubscribe. Identify your location and customize the content we show
          you. For example, if we know from your IP address that you are based in Austin, Texas, we
          could show you ads from local businesses. Tell our ad partners how their ads are doing
          using a Brighteon.AI ad tag. The Brighteon.AI ad tag (a piece of code) delivers insights
          to us and our ad partners about actions that a person takes on their website after viewing
          an ad on Brighteon.AI. We'll also rely on your consent where we use cookies to:
        </p>
        <p>
          Identify you across different browser sessions. This means if you log into Brighteon.AI
          from your phone (or any device), we'll remember that you're you and you won't need to
          enter your login details each time you visit Brighteon.AI from the same device. Show you
          ads you might be interested in. We use cookies to identify your interests based on your
          video viewing, although this is limited because we do not record these content preferences
          across more than one browser session. Brighteon.AI is a worldwide service. By using our
          products or services, you authorize us to transfer and store your information outside your
          home country, including in the United States, for the purposes described in this policy.
          The privacy protections and the rights of authorities to access your personal information
          in such countries may not be equivalent to those of your home country.
        </p>
        <p>
          Our goal is to give you simple and meaningful choices regarding your information. If you
          have a Brighteon.AI account, many of the choices you have on Brighteon.AI are built
          directly into Brighteon.AI or your settings. For example, you can:
        </p>
        <p>
          Edit information in your profile at any time, or delete your profile entirely. Close your
          account at any time. When you close your account, we'll deactivate it and remove your
          video content from Brighteon.AI. Also, we support the Do Not Track browser setting and you
          can learn more about how it affects our collection and use of offsite data. You also have
          choices available to you through the device or software you use to access Brighteon.AI.
          For example:
        </p>
        <p>
          The browser you use lets you control cookies or other types of local data storage. Your
          mobile device lets you choose how and whether your location and other data is shared with
          us. To learn more about these choices, please see the information provided by your device
          or software provider.
        </p>
        <p>Anyone can see the public videos you create and the profile information you give us.</p>
        <p>
          When you buy something on BrighteonStore.com using your payment card, we share information
          necessary for you to make your purchase, such as your payment card information, contact
          information, and other information about the transaction with the e-commerce processor
          used by BrighteonStore.com.
        </p>
        <p>
          Under narrow circumstances such as being ordered to do so by a court of law, we may share
          information with law enforcement agencies or government agencies. We only share
          information if we believe that disclosure is reasonably necessary to comply with a law,
          regulation or legal request; to protect the safety, rights, or property of the public, any
          person, or Brighteon.AI; or to detect, prevent, or otherwise address fraud, security or
          technical issues.
        </p>
        <p>
          If we were to engage in a merger, acquisition, bankruptcy, dissolution, reorganisation, or
          similar transaction or proceeding that involves the transfer of the information described
          in this Policy, we would share your information with a party involved in such a process
          (for example, a potential purchaser).
        </p>
        <p>
          We keep your information only so long as we need it to provide Brighteon.AI to you and
          fulfill the purposes described in this policy. This is also the case for anyone that we
          share your information with and who carries out services on our behalf. When we no longer
          need to use your information and there is no need for us to keep it to comply with our
          legal or regulatory obligations, we'll either remove it from our systems or depersonalize
          it so that we can't identify you.
        </p>
        <p>Children under 13 are not allowed to use Brighteon.AI.</p>
        <p>
          We may change this policy from time to time and if we do, we'll post any changes on this
          page. If you continue to use Brighteon.AI after those changes are in effect, you agree to
          the new policy. If the changes are significant, we may provide a more prominent notice or
          get your consent, as required by law.
        </p>
        <p>The best way to get in touch is through support.Brighteon.AI.</p>
        <p>Effective Date July 1, 2018</p>
      </>
    ),
    'Enoch AI Support': (
      <>
        <div className="w-full">
          {/* Tabs */}
          <div className="border-b border-gray-300 flex gap-6 mb-6">
            <button
              onClick={() => setTab('FAQs')}
              className={`px-2 pb-1 font-semibold ${
                tab === 'FAQs'
                  ? 'text-[#577836] border-b-2 border-[#577836]'
                  : 'text-[#6D6E71]'
              }`}
            >
              FAQs
            </button>
            <button
              onClick={() => setTab('Using Enoch')}
              className={`px-2 pb-1 font-semibold ${
                tab === 'Using Enoch'
                  ? 'text-[#577836] border-b-2 border-[#577836]'
                  : 'text-[#6D6E71]'
              }`}
            >
              Using Enoch
            </button>
          </div>

          {/* Content */}
          {tab === 'FAQs' && (
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b border-gray-200 pb-3">
                  <button
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    className="w-full text-left text-lg font-medium flex justify-between items-center"
                  >
                    <span className={openIndex === index ? 'text-[#577836]' : 'text-black'}>
                      {faq.question}
                    </span>
                    <span className="text-2xl">{openIndex === index ? '−' : '+'}</span>
                  </button>
                  {openIndex === index && (
                    <div className="mt-2 text-[#2D2D30] text-[15px]">{faq.answer}</div>
                  )}
                </div>
              ))}
            </div>
          )}

          {tab === 'Using Enoch' && (
            <div className="space-y-6">
              {usingEnoch.map((usingEnoch, idx) => (
                <div key={idx} className="border-b border-gray-200 pb-3">
                  <button
                    onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                    className="w-full text-left text-lg font-medium flex justify-between items-center"
                  >
                    <span className={openIndex === idx ? 'text-[#577836]' : 'text-black'}>
                      {usingEnoch.question}
                    </span>
                    <span className="text-2xl">{openIndex === idx ? '−' : '+'}</span>
                  </button>
                  {openIndex === idx && (
                    <div className="mt-2 text-[#2D2D30] text-[15px]">{usingEnoch.answer}</div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </>
    ),
  };
  return (
    <div className="min-h-screen bg-[#ffffff] text-white flex flex-col items-center justify-start px-4 py-10">
      <div className="logo-wrapper flex justify-center mb-5">
        <Link to="/home">
          <img
            src={logo}
            alt="Logo"
            className="w-40 hover:opacity-80 transition-opacity duration-200"
          />
        </Link>
      </div>

      <div className="text-center mb-6">
        <h1 className="text-[38px] font-bold text-[#000000] mb-2">{getTitle()}</h1>
        <p className="text-[14px] text-[#2d2d30]">
          {getTitle() === 'Enoch AI Support'
            ? 'FAQs and useful information for getting the most out of Enoch AI'
            : `Please review our ${getTitle().toLowerCase()} for music.brighteon.com in the text below`}
        </p>
      </div>

      <div className="space-y-4 text-[16px] leading-relaxed text-[#2d2d30] max-w-3xl w-full">
        {contentMap[getTitle()] || <p>Content not found.</p>}
      </div>

      <div className="text-center text-xs text-[#2d2d30] mt-8">
        <p>
          <Link to="/Support/Terms" className="text-[#577836]">
            Terms of Service
          </Link>{' '}
          •{' '}
          <Link to="/Support/Privacy" className="text-[#577836]">
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  );
}

export default TermsPage;
