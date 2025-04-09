export const TYPE = {
  input: 'input',
  checkbox: 'checkbox',
  textarea: 'textarea',
};

export const dataFormStructure = [
  {
    key: 'planner',
    id: 1,
    title: 'Daily Meal Planner',
    subTitle:
      'Fill out the form below and Enoch AI will create a meal plan based the provided information.',
    fields: [
      {
        label: 'Dietary Preferences',
        key: 'Dietary Preferences',
        default: 'N/A',
        questionLabel: 'List any preferences you have for the types of meals you prefer.',
        helperText:
          'Example: Vegan, vegetarian, keto, pescatarian, gluten-free, low sodium, high protein, paleo, organic.',
        type: TYPE.input,
      },
      {
        label: 'Weight Goals',
        key: 'Weight Goals',
        default: 'N/A',
        questionLabel: 'List any weight loss goals you have or a target calorie range.',
        helperText: 'Example: Maintain weight, lose weight, gain weight, 1800 calories per day.',
        type: TYPE.input,
      },
      {
        label: 'Height & Weight',
        key: 'Height & Weight',
        default: 'N/A',
        questionLabel:
          'List your current height and weight so Enoch can calculate accurate calorie needs.',
        helperText: 'Example: 5\'8", 160 lbs',
        type: TYPE.input,
      },
      {
        label: 'Allergies/Restrictions',
        key: 'Allergies/Restrictions',
        default: 'N/A',
        questionLabel: 'List any allergies or any food restrictions you must avoid.',
        helperText: 'Example: Nuts, dairy, shellfish, soy, lactose',
        type: TYPE.input,
      },
      {
        label: 'Preferred Meal Frequency',
        key: 'Preferred Meal Frequency',
        default: 'N/A',
        questionLabel: 'List how often you prefer to eat each day (24-hours).',
        helperText: 'Example: 3 meals + 2 snacks, intermittent fasting windows',
        type: TYPE.input,
      },
      {
        label: 'Cooking Time/Effort',
        key: 'Cooking Time/Effort',
        default: 'N/A',
        questionLabel: 'List the type of effort and time you prefer to put into cooking.',
        helperText: 'Example: Quick 15-minute meals, meal prep-friendly, no-cook options',
        type: TYPE.input,
      },
      {
        label: 'Favorite Cuisines or Ingredients',
        key: 'Favorite Cuisines or Ingredients',
        default: 'N/A',
        questionLabel: 'List some of your favorite types of meals, ingredients, etc.',
        helperText: 'Example: Mediterranean, Asian, comfort food, avocado, quinoa',
        type: TYPE.input,
      },
      {
        label: 'Dislikes/Avoidances',
        key: 'Dislikes/Avoidances',
        default: 'N/A',
        questionLabel: 'List any types of foods or ingredients you prefer not to consume.',
        helperText: 'Example: Mushrooms, spicy food, processed sugars',
        type: TYPE.input,
      },
    ],
  },
  {
    key: 'grocery',

    id: 2,
    title: 'Grocery Shopping Coach',
    subTitle:
      'Fill out the form below and Enoch AI will create a tailored shopping list that supports your health goals, dietary needs, budget, and lifestyle.',
    fields: [
      {
        label: 'Primary Health Goals',
        key: 'Primary Health Goals',
        default: 'N/A',
        questionLabel: 'Select a few health goals from the list below.',
        helperText: '',
        listCheckBoxes: [
          'Cardiovascular Health',
          'Brain Health',
          'Joint Health',
          'Digestive Health',
          'Immune System Support',
          'Bone Density Improvement',
          'Skin Health',
          'Lung Function Enhancement',
          'Vision Care',
          'Blood Sugar Regulation',
          'Weight Management',
          'Stress Reduction',
          'Sleep Improvement',
          'Hormonal Balance',
          'Muscle Strength Development',
          'Endurance Building',
          'Hydration Habits',
          'Nutritional Balance',
          'Cholesterol Management',
          'Blood Pressure Control',
          'Dental Health',
          'Hair & Scalp Care',
          'Mental Resilience',
          'Flexibility & Mobility',
          'Energy Level Optimization',
          'Kidney Health',
          'Liver Function Support',
          'Heart Rate Maintenance',
          'Metabolism Improvement',
          'Emotional Well-being',
        ],
        type: TYPE.checkbox,
      },
      {
        label: 'Allergies/Restrictions',
        key: 'Allergies/Restrictions',
        default: 'N/A',
        questionLabel: 'List any allergies or any food restrictions you must avoid.',
        helperText: 'Example: Nuts, dairy, shellfish, soy, lactose.',
        type: TYPE.input,
      },
      {
        label: 'Budget Range',
        key: 'Budget Range',
        default: 'N/A',
        questionLabel: 'List a budget you can apply towards groceries.',
        helperText: 'Example: $50/week, mid-range, splurge on staples.',
        type: TYPE.input,
      },
      {
        label: 'Shopping Constraints',
        key: 'Shopping Constraints',
        default: 'N/A',
        questionLabel:
          'List any possible constraints you have on the type of foods you have access to.',
        helperText:
          'Example: Small refrigerator, shops primarily at Costco, prefers 15-minute trips.',
        type: TYPE.input,
      },
      {
        label: 'Cooking Habits',
        key: 'Cooking Habits',
        default: 'N/A',
        questionLabel: 'List the type of effort and time you prefer to put into cooking.',
        helperText: 'Example: No oven, 20-minute meals, hate chopping veggies.',
        type: TYPE.input,
      },
      {
        label: 'Current Supplements/Medications',
        key: 'Current Supplements/Medications',
        default: 'N/A',
        questionLabel:
          'List any medications or supplements you are currently taking to avoid any possible interactions.',
        helperText: 'Example: Blood thinners, iron supplements.',
        type: TYPE.input,
      },
      {
        label: 'Foods to Avoid or Crave Less',
        key: 'Foods to Avoid or Crave Less',
        default: 'N/A',
        questionLabel: 'List any types of foods, or ingredients you prefer not to consume.',
        helperText: 'Example: Sugar, Mushrooms, potatoes, spicy foods.',
        type: TYPE.input,
      },
    ],
  },
  {
    key: 'finder',
    id: 3,
    title: 'Natural Supplements & Ingredients Finder',
    subTitle:
      'Fill out the form below and Enoch AI will create a personalized ingredient and supplement recommendations tailored towards your health goals.',
    fields: [
      {
        label: 'Primary Health Goals',
        key: 'Primary Health Goals',
        default: 'N/A',
        questionLabel: 'Select a few health goals from the list below.',
        helperText: '',
        listCheckBoxes: [
          'Cardiovascular Health',
          'Brain Health',
          'Joint Health',
          'Digestive Health',
          'Immune System Support',
          'Bone Density Improvement',
          'Skin Health',
          'Lung Function Enhancement',
          'Vision Care',
          'Blood Sugar Regulation',
          'Weight Management',
          'Stress Reduction',
          'Sleep Improvement',
          'Hormonal Balance',
          'Muscle Strength Development',
          'Endurance Building',
          'Hydration Habits',
          'Nutritional Balance',
          'Cholesterol Management',
          'Blood Pressure Control',
          'Dental Health',
          'Hair & Scalp Care',
          'Mental Resilience',
          'Flexibility & Mobility',
          'Energy Level Optimization',
          'Kidney Health',
          'Liver Function Support',
          'Heart Rate Maintenance',
          'Metabolism Improvement',
          'Emotional Well-being',
        ],
        type: TYPE.checkbox,
      },
      {
        label: 'Allergies/Restrictions',
        key: 'Allergies/Restrictions',
        default: 'N/A',
        questionLabel: 'List any allergies or any food restrictions you must avoid.',
        helperText: 'Example: Nuts, dairy, shellfish, soy, lactose.',
        type: TYPE.input,
      },
      {
        label: 'Current Supplements/Medications',
        key: 'Current Supplements/Medications',
        default: 'N/A',
        questionLabel:
          'List any medications or supplements you are currently taking to avoid any possible interactions.',
        helperText: 'Example: Blood thinners, iron supplements.',
        type: TYPE.input,
      },
      {
        label: 'Lifestyle Factors',
        key: 'Lifestyle Factors',
        default: 'N/A',
        questionLabel: 'Describe below your current lifestyle.',
        helperText:
          'Example: Sedentary, frequently exercise, rarely exercise, smoker, frequent traveler.',
        type: TYPE.input,
      },
    ],
  },
  {
    key: 'wellness',
    id: 4,
    title: 'Personalized Wellness Plan',
    subTitle:
      'Fill out the form below and Enoch AI will design a holistic, tailored wellness strategy that aligns with your goals, lifestyle, and unique needs.',
    fields: [
      {
        label: 'Primary Wellness Goals',
        key: 'Primary Wellness Goals',
        default: 'N/A',
        questionLabel: 'Select a few wellness goals from the list below.',
        helperText: '',
        listCheckBoxes: [
          'Weight Management',
          'Stress Reduction',
          'Improved Sleep Quality',
          'Muscle Strength/Endurance',
          'Mental Resilience',
          'Cardiovascular Health',
          'Flexibility/Mobility',
          'Nutritional Balance',
          'Chronic Condition Management',
          'Energy Optimization',
          'Hormonal Balance',
          'Other',
        ],
        type: TYPE.checkbox,
      },
      {
        label: 'Other Goals',
        key: 'Other Goals',
        default: 'N/A',
        questionLabel: "If you checked 'Other' in the previous step, describe it here.",
        helperText: 'Example: Clear skin, improve vision.',
        type: TYPE.input,
      },
      {
        label: 'Age Range',
        key: 'Age Range',
        default: 'N/A',
        questionLabel: 'What age range do you currently fall into?',
        helperText: 'Example: 20-30, 30-40, 40-50, 55+, 65+.',
        type: TYPE.input,
      },
      {
        label: 'Height & Weight',
        key: 'Height & Weight',
        default: 'N/A',
        questionLabel:
          'List your current height and weight so Enoch can calculate accurate calorie needs.',
        helperText: 'Example: 5\'8", 160 lbs.',
        type: TYPE.input,
      },
      {
        label: 'Allergies/Restrictions',
        key: 'Allergies/Restrictions',
        default: 'N/A',
        questionLabel: 'List any allergies or any food restrictions you must avoid.',
        helperText: 'Example: Nuts, dairy, shellfish, soy, lactose.',
        type: TYPE.input,
      },
      {
        label: 'Current Health Challenges',
        key: 'Current Health Challenges',
        default: 'N/A',
        questionLabel: 'List below any health challenges you are currently experiencing.',
        helperText: 'Example: Arthritis, high blood pressure, menopause, prediabetes.',
        type: TYPE.input,
      },
      {
        label: 'Current Supplements/Medications',
        key: 'Current Supplements/Medications',
        default: 'N/A',
        questionLabel:
          'List any medications or supplements you are currently taking to avoid any possible interactions.',
        helperText: 'Example: Blood thinners, iron supplements.',
        type: TYPE.input,
      },
      {
        label: 'Physical Limitations',
        key: 'Physical Limitations',
        default: 'N/A',
        questionLabel: 'List any physical limitations that impact your wellness routine.',
        helperText: 'Example: Knee pain, asthma, osteoporosis.',
        type: TYPE.input,
      },
      {
        label: 'Dietary Preferences',
        key: 'Dietary Preferences',
        default: 'N/A',
        questionLabel: 'List any preferences you have for the types of meals you prefer.',
        helperText:
          'Example: Vegan, vegetarian, keto, pescatarian, gluten-free, low sodium, high protein, paleo, organic.',
        type: TYPE.input,
      },
      {
        label: 'Exercise Routine',
        key: 'Exercise Routine',
        default: 'N/A',
        questionLabel:
          'Describe below your current exercise routine and any physical limitations you may have.',
        helperText: 'Example: Walking, yoga, tennis, bike riding.',
        type: TYPE.input,
      },
      {
        label: 'Sleep Routine',
        key: 'Sleep Routine',
        default: 'N/A',
        questionLabel: 'Describe your average hours of sleep a night and any current challenges.',
        helperText: 'Example: 7 hours, Insomnia, wake up multiple times a night.',
        type: TYPE.input,
      },
      {
        label: 'Stress',
        key: 'Stress',
        default: 'N/A',
        questionLabel: 'Describe any major stressors and current coping strategies.',
        helperText: 'Example: Exercise, meditation, journaling.',
        type: TYPE.input,
      },
      {
        label: 'Social Routine',
        key: 'Social Routine',
        default: 'N/A',
        questionLabel:
          'Describe how many hours you spend with family/friends, on hobbies, or having fun.',
        helperText: 'Example: 1 hour a day, 8 hours a week, 2-3 hours every day.',
        type: TYPE.input,
      },
      {
        label: 'Wellness Time',
        key: 'Wellness Time',
        default: 'N/A',
        questionLabel: 'Describe your current daily time available for wellness activities.',
        helperText: 'Example: 15 minutes, 1 hour, 3 hours.',
        type: TYPE.input,
      },
      {
        label: 'Budget',
        key: 'Budget',
        default: 'N/A',
        questionLabel:
          'Enter a budget you can apply towards gym memberships, wellness products, and services.',
        helperText: 'Example: $50/week, $200/month.',
        type: TYPE.input,
      },
      {
        label: 'Work Type/Schedule',
        key: 'Work Type/Schedule',
        default: 'N/A',
        questionLabel: 'Describe your current job and the hours you work during the day or night.',
        helperText: 'Example: Desk job, 9-5.',
        type: TYPE.input,
      },
      {
        label: 'Preferred Wellness Tracking',
        key: 'Preferred Wellness Tracking',
        default: 'N/A',
        questionLabel: 'Describe your preferred way to track your wellness progress.',
        helperText: 'Example: Phone app, journal, wearable device.',
        type: TYPE.input,
      },
      {
        label: 'Accountability',
        key: 'Accountability',
        default: 'N/A',
        questionLabel:
          'Describe your preferred way to hold yourself accountable for wellness progress.',
        helperText: 'Example: Solo, coach, friends, online community.',
        type: TYPE.input,
      },
      {
        label: 'Obstacles',
        key: 'Obstacles',
        default: 'N/A',
        questionLabel:
          'Describe your biggest obstacles that have or could prevent you from reaching your wellness goals.',
        helperText: 'Example: Lack of time, motivation slumps, injuries.',
        type: TYPE.input,
      },
    ],
  },
  {
    id: 5,
    key: 'gardener',
    title: 'Master Gardener',
    subTitle:
      'Fill out the form below and Enoch AI will provide advice/techniques for sustainable gardening practices.',
    fields: [
      {
        label: 'Gardening Goals',
        key: 'Gardening Goals',
        default: 'N/A',
        questionLabel: 'Select a few gardening goals from the list below.',
        helperText: '',
        listCheckBoxes: [
          'Seed Planting',
          'Plant Care',
          'Soil Health',
          'Weed/Pest Control',
          'Growing Vegetables',
          'Growing Fruit',
          'Water Harvesting',
          'Water Conservation',
        ],
        type: TYPE.checkbox,
      },
      {
        label: 'Gardening Experience',
        key: 'Gardening Experience',
        default: 'N/A',
        questionLabel: 'Describe your skill level as it applies to your goals.',
        helperText: 'Example: Beginner, novice, expert.',
        type: TYPE.input,
      },
      {
        label: 'Region & Climate',
        key: 'Region & Climate',
        default: 'N/A',
        questionLabel: 'What region do you live in?',
        helperText: 'Example: Southwest Arizona, USA, hot, desert climate.',
        type: TYPE.input,
      },
      {
        label: 'Sunlight Exposure',
        key: 'Sunlight Exposure',
        default: 'N/A',
        questionLabel: 'How much sunlight does your gardening area get per day?',
        helperText: 'Example: 3 hours, more than 8.',
        type: TYPE.input,
      },
      {
        label: 'Rainfall Levels',
        key: 'Rainfall Levels',
        default: 'N/A',
        questionLabel: 'How much rainfall do you get?',
        helperText: 'Example: Frequent, normal, rare.',
        type: TYPE.input,
      },
    ],
  },
  {
    id: 6,
    key: 'longevity',
    title: 'Longevity Roadmap',
    subTitle:
      'Fill out the form below and Enoch AI will provide a 12-month plan with age-specific tips to help you reach your longevity goals.',
    fields: [
      {
        label: 'Age Range',
        key: 'Age Range',
        default: 'N/A',
        questionLabel: 'What age range do you currently fall into?',
        helperText: 'Example: 20-30, 30-40, 40-50, 55+, 65+.',
        type: TYPE.input,
      },
      {
        label: 'Current Health Challenges',
        key: 'Current Health Challenges',
        default: 'N/A',
        questionLabel: 'List below any health challenges you are currently experiencing.',
        helperText: 'Example: Arthritis, high blood pressure, menopause, prediabetes.',
        type: TYPE.input,
      },
      {
        label: 'Primary Aging-Related Goals',
        key: 'Primary Aging-Related Goals',
        default: 'N/A',
        questionLabel: 'Select a few goals from the list below.',
        helperText: '',
        listCheckBoxes: [
          'Joint/Mobility Health',
          'Cognitive Sharpness',
          'Heart Health',
          'Bone Density',
          'Skin Elasticity',
          'Energy/Stamina',
          'Vision/Hearing Care',
          'Hormonal Balance',
          'Sleep Quality',
          'Stress Resilience',
        ],
        type: TYPE.checkbox,
      },
      {
        label: 'Longevity Priorities',
        key: 'Longevity Priorities',
        default: 'N/A',
        questionLabel: 'Describe what you are hoping to achieve with your longevity.',
        helperText:
          'Example: "Stay active with grandkids," "Prevent cognitive decline," "Maintain independence."',
        type: TYPE.input,
      },
      {
        label: 'Allergies/Restrictions',
        key: 'Allergies/Restrictions',
        default: 'N/A',
        questionLabel: 'List any allergies or any food restrictions you must avoid.',
        helperText: 'Example: Nuts, dairy, shellfish, soy, lactose.',
        type: TYPE.input,
      },
      {
        label: 'Exercise',
        key: 'Exercise',
        default: 'N/A',
        questionLabel:
          'Describe below your current exercise routine and any physical limitations you may have.',
        helperText: 'Example: Walking, yoga, tennis, bike riding.',
        type: TYPE.input,
      },
      {
        label: 'Current Supplements/Medications',
        key: 'Current Supplements/Medications',
        default: 'N/A',
        questionLabel:
          'List any medications or supplements you are currently taking to avoid any possible interactions.',
        helperText: 'Example: Blood thinners, iron supplements.',
        type: TYPE.input,
      },
      {
        label: 'Budget',
        key: 'Budget',
        default: 'N/A',
        questionLabel: 'Enter a budget you can apply towards supplements and wellness products.',
        helperText: 'Example: $50/week, mid-range, splurge on premium.',
        type: TYPE.input,
      },
    ],
  },
  {
    id: 7,
    key: 'journals',
    title: 'Simplify Scientific Journals',
    subTitle:
      'Supply the text of a science journal/paper and Enoch AI will break it down into clear, accessible language for non-experts.',
    fields: [
      {
        label: 'Journal Text',
        key: 'Journal Text',
        default: 'N/A',
        questionLabel: 'Type or copy/paste the text of the journal in the text box below.',
        helperText: '',
        type: TYPE.textarea,
      },
    ],
  },
  {
    id: 8,
    key: 'summarizer',
    title: 'Enoch Text Summarizer',
    subTitle: 'Type or copy/paste the text to summarize in the text box below.',
    fields: [
      {
        label: 'Summary Length',
        key: 'Summary Length',
        default: 'N/A',
        questionLabel:
          'Select how long the final summary should be. or copy/paste the text of the journal in the text box below.',
        helperText: '',
        type: TYPE.dropdown,
      },
      {
        label: 'What would you like to summarize?',
        key: 'What would you like to summarize?',
        default: 'N/A',
        questionLabel: '',
        helperText: 'Note: The longer the text, the longer it may take to complete a summary.',
        type: TYPE.textarea,
      },
    ],
  },
];
