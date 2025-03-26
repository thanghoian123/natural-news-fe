import React from 'react';
import { useParams } from 'react-router-dom';
import CustomInput from '../../components/Input';
import { Sparkle, Sparkles } from 'lucide-react';
import PlannerForm from './PlannerForm';
const TYPE = {
  input: 'input',
  checkbox: 'checkbox',
};

const dataFormStructure = [
  {
    id: 1,
    title: 'Daily Meal Planner',
    subTitle:
      'Fill out the form below and Enoch AI will create a meal plan based the provided information.',
    fields: [
      {
        label: 'Dietary Preferences',
        questionLabel: 'List any preferences you have for the types of meals you prefer.',
        helperText:
          'Example: Vegan, vegetarian, keto, pescatarian, gluten-free, low sodium, high protein, paleo, organic.',
        type: TYPE.input,
      },
      {
        label: 'Dietary Preferences',
        questionLabel: 'List any preferences you have for the types of meals you prefer.',
        helperText:
          'Example: Vegan, vegetarian, keto, pescatarian, gluten-free, low sodium, high protein, paleo, organic.',
        type: TYPE.input,
      },
      {
        label: 'Dietary Preferences',
        questionLabel: 'List any preferences you have for the types of meals you prefer.',
        helperText:
          'Example: Vegan, vegetarian, keto, pescatarian, gluten-free, low sodium, high protein, paleo, organic.',
        type: TYPE.input,
      },
      {
        label: 'Dietary Preferences',
        questionLabel: 'List any preferences you have for the types of meals you prefer.',
        helperText:
          'Example: Vegan, vegetarian, keto, pescatarian, gluten-free, low sodium, high protein, paleo, organic.',
        type: TYPE.input,
      },
    ],
  },
];

function ToolPage() {
  const { category } = useParams();

  // Find the corresponding tool

  return (
    <div className="p-4">
      {/* Render different forms based on category */}
      {category === 'planner' && <PlannerForm />}
      {/* {category === 'grocery' && <GroceryForm />}
      {category === 'finder' && <FinderForm />}
      {category === 'wellness' && <WellnessForm />}
      {category === 'gardener' && <GardenerForm />}
      {category === 'longevity' && <LongevityForm />}
      {category === 'journals' && <JournalsForm />} */}
    </div>
  );
}

// function GroceryForm() {
//   return (
//     <form className="mt-4 space-y-2">
//       <label className="block">
//         Grocery List:
//         <textarea className="border p-2 w-full" rows="3"></textarea>
//       </label>
//       <button className="bg-green-500 text-white px-4 py-2 mt-2">Submit</button>
//     </form>
//   );
// }

// function FinderForm() {
//   return (
//     <form className="mt-4 space-y-2">
//       <label className="block">
//         Search Ingredient:
//         <input type="text" className="border p-2 w-full" />
//       </label>
//       <button className="bg-purple-500 text-white px-4 py-2 mt-2">Find</button>
//     </form>
//   );
// }

// // Other forms...
// function WellnessForm() {
//   return <div>Wellness Plan Form</div>;
// }
// function GardenerForm() {
//   return <div>Gardening Tips Form</div>;
// }
// function LongevityForm() {
//   return <div>Longevity Guide Form</div>;
// }
// function JournalsForm() {
//   return <div>Scientific Journal Summarizer Form</div>;
// }

export default ToolPage;
