// src/pages/Profile/components/BackHeader.tsx

import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface BackHeaderProps {
  title: string;
}

export default function BackHeader({ title }: BackHeaderProps) {
  const navigate = useNavigate();
  return (
    // ml-4 → left margin: 16px
    // h-14  → height: 56px (= 14 * 4px)
    <div className="flex space-x-2 pb-6 ml-4 h-14">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-800 hover:text-gray-600"
      >
        <ChevronLeft size={24} />
        <span className="ml-1 text-lg font-medium">{title}</span>
      </button>
    </div>
  );
}
