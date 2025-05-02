import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ToolForm from './ToolForm';

function ToolPage() {
  const { category } = useParams();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []); // Runs once when the component mounts
  return (
    <div className="p-4 pt-[102px]">
      <ToolForm category={category} />
    </div>
  );
}
export default ToolPage;
