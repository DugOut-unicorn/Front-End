// src/pages/Login/components/Complection.tsx
import React from 'react';
import { X } from 'lucide-react';

interface CompletionProps {
  onGoToMain: () => void;
}

const Completion: React.FC<CompletionProps> = ({ onGoToMain }) => {
  return (
    // 배경을 연회색 반투명 오버레이로 변경 (흰색보다는 살짝 어두운 느낌)
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-300 bg-opacity-50">
      {/* 모달 박스 */}
      <div className="relative w-full max-w-md rounded-2xl overflow-hidden shadow-lg">
        {/* 닫기(X) 버튼 */}
        <button
          type="button"
          onClick={onGoToMain}
          className="absolute top-4 right-4 z-10 text-white hover:opacity-80"
        >
          <X size={24} />
        </button>

        {/* 배너 영역: 퍼플 그라데이션 */}
        <div className="bg-gradient-to-b from-purple-600 to-purple-400 h-64 flex flex-col justify-center px-6">
          <h1 className="text-white text-2xl font-bold mb-2">
            회원가입이 완료되었어요!
          </h1>
          <p className="text-white text-sm">
            덕아웃에서 즐거운 야구생활을 위한
          </p>
          <p className="text-white text-sm">
            다양한 기능들을 즐겨보세요.
          </p>
        </div>

        {/* 푸터 영역: 검정색 버튼 */}
        <div className="bg-black px-6 py-4">
          <button
            type="button"
            onClick={onGoToMain}
            className="w-full text-white text-center py-3 rounded-lg hover:opacity-90 transition"
          >
            덕아웃 즐기러가기 &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default Completion;
