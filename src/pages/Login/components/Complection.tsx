import React from 'react';

interface CompletionProps {
  onGoToMain: () => void;
  currentStep: number; // 진행 중인 STEP을 받는 props 추가
}

const Completion: React.FC<CompletionProps> = ({ onGoToMain, currentStep }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-gray-50">
      {/* STEP 진행 표시 */}
      <div className="w-full max-w-md mb-6">
        <div className="flex justify-between mb-2">
          {['STEP 1', 'STEP 2', 'STEP 3'].map((step, index) => (
            <div key={index} className="flex flex-col items-center">
              <div
                className={`w-6 h-6 rounded-full ${currentStep === index + 3 ? 'bg-red-500' : 'bg-gray-300'}`} // 현재 STEP 3을 빨간색으로 표시
              ></div>
              <div className={`text-sm mt-2 ${currentStep === index + 3 ? 'text-red-500' : 'text-gray-500'}`}>
                {step}
              </div>
            </div>
          ))}
        </div>
        <div className="h-px bg-gray-300" />
      </div>

      <h1 className="text-2xl font-bold mb-8">회원가입 완료</h1>
      
      {/* 메인 페이지로 가기 버튼 */}
      <button
        className="bg-black text-white w-full max-w-md py-3 rounded mb-2 hover:bg-gray-800"
        onClick={onGoToMain}
      >
        메인 페이지로 가기
      </button>
    </div>
  );
};

export default Completion;
