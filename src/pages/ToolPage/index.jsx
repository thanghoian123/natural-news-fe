import React from 'react';
import { useParams } from 'react-router-dom';
import ToolForm from './ToolForm';

function ToolPage() {
  const { category } = useParams();
  return (
    <div className="p-4">
      <ToolForm category={category} />
    </div>
  );
}
export default ToolPage;
