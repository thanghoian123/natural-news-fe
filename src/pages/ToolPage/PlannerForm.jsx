import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { startNewSession } from '../../redux/chatSlice';
import CustomInput from '../../components/Input';
import { Sparkles } from 'lucide-react';

function PlannerForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  const mocks = [
    {
      label: 'Dietary Preferences',
      key: 'dietaryPreferences',
      default: 'High Protein',
      questionLabel: 'List any preferences you have for the types of meals you prefer.',
      helperText:
        'Example: Vegan, vegetarian, keto, pescatarian, gluten-free, low sodium, high protein, paleo, organic.',
    },
    {
      label: 'Weight Goals',
      key: 'weightGoals',
      default: 'Gain Weight',
      questionLabel: 'List any weight loss goals you have or a target calorie range.',
      helperText: 'Example: Maintain weight, lose weight, gain weight, 1800 calories per day.',
    },
    {
      label: 'Height & Weight',
      key: 'heightWeight',
      default: '200 lbs, 6\'4"',
      questionLabel:
        'List your current height and weight so Enoch can calculate accurate calorie needs.',
      helperText: 'Example: 5\'8", 160 lbs.',
    },
    {
      label: 'Allergies/Restrictions',
      key: 'allergies',
      default: 'None',
      questionLabel: 'List any allergies or any food restrictions you must avoid.',
      helperText: 'Example: Nuts, dairy, shellfish, soy, lactose.',
    },
    {
      label: 'Preferred Meal Frequency',
      key: 'mealFrequency',
      default: 'Morning snack, lunch, dinner, after dinner snack',
      questionLabel: 'List how often you prefer to eat each day (24-hours).',
      helperText: 'Example: 3 meals + 2 snacks, intermittent fasting windows.',
    },
    {
      label: 'Cooking Time/Effort',
      key: 'cookingEffort',
      default: 'Quick and no-cook options',
      questionLabel: 'List the type of effort and time you prefer to put into cooking.',
      helperText: 'Example: Quick 15-minute meals, meal prep-friendly, no-cook options.',
    },
    {
      label: 'Favorite Cuisines or Ingredients',
      key: 'favoriteCuisines',
      default: 'Asian, rice, chicken',
      questionLabel: 'List some of your favorite types of meals, ingredients, etc.',
      helperText: 'Example: Mediterranean, Asian, comfort food, avocado, quinoa.',
    },
    {
      label: 'Dislikes/Avoidances',
      key: 'dislikes',
      default: 'Potatoes, Yams',
      questionLabel: 'List any types of foods or ingredients you prefer not to consume.',
      helperText: 'Example: Mushrooms, spicy food, processed sugars.',
    },
  ];

  const [formData, setFormData] = useState(() =>
    mocks.reduce((acc, item) => ({ ...acc, [item.key]: '' }), {})
  );

  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = mocks
      .map(({ label, key, default: defaultValue }) => `${label}: ${formData[key] || defaultValue}`)
      .join('\n\n');

    console.log(result);

    dispatch(startNewSession(user?.id)).then(({ payload }) => {
      const chatID = payload?.id;
      if (chatID) {
        navigate(`/chat?id=${chatID}`, { state: { initialMessage: result } });
      }
    });
  };

  return (
    <div className="p-[40px]">
      <h1 className="text-2xl font-bold text-primary text-center text-[38px] font-[700] mb-[20px]">
        Daily Meal Planner
      </h1>
      <p className="text-gray-600 dark:text-[#E5E5EC] text-center text-[14px]">
        Fill out the form below and Enoch AI will create a meal plan based on the provided
        information.
      </p>
      <form className="mt-[20px] space-y-4" onSubmit={handleSubmit}>
        {mocks.map(({ label, key, helperText, questionLabel }, index) => (
          <CustomInput
            key={key}
            label={`${index + 1}. ${label}`}
            helperText={helperText}
            questionLabel={questionLabel}
            value={formData[key]}
            onChange={(e) => handleChange(key, e.target.value)}
          />
        ))}
        <button type="submit" className="bg-primary text-white px-8 py-3 mt-4 rounded flex m-auto">
          <Sparkles className="mr-4" />
          <span className="text-[14px] font-[600]">Generate (1 question)</span>
        </button>
      </form>
    </div>
  );
}

export default PlannerForm;
