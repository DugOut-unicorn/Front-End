import React from 'react';

function MyInfo() {
  return (
    <div className="p-4">
      {/* 프로필 영역 */}
      <section className="flex justify-between items-center mb-5">
        {/* 왼쪽: 프로필 아이콘, 닉네임/소개 */}
        <div className="flex items-center">
          <div className="w-20 h-20 rounded-full bg-gray-400 mr-5 flex items-center justify-center text-3xl text-white">
            <span role="img" aria-label="user">👤</span>
          </div>
          <div>
            <h3 className="m-0">야구광아</h3>
            <p className="mt-1">안녕하세요! 경기도 고양시는 23살 대학생 입니다!</p>
          </div>
        </div>
        {/* 오른쪽: 응원하는 팀 */}
        <div className="text-right">
          <p className="m-0">응원하는 팀</p>
          <img src="/images/lotte_emb.png" alt="GIANTS 로고" className="mt-1" />
        </div>
      </section>

      {/* 직전온도 영역 */}
      <section className="mb-20">
        <div className="flex items-center">
          <strong className="mr-[10px]">직전온도</strong>
          <div className="relative w-[300px] h-[10px] bg-gray-200 rounded-[5px] mr-[10px]">
            <div className="w-[70%] h-full bg-gray-600 rounded-[5px]"></div>
            <div className="absolute top-1/2 left-[70%] -translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-white border-2 border-gray-600 flex items-center justify-center text-xs font-bold text-gray-600">
              정
            </div>
          </div>
          <span className="font-bold">36.5°C</span>
        </div>
      </section>

      {/* 등록한 글 영역 */}
      <section>
        <h4 className="mb-[10px]">등록한 글</h4>
        <div className="border border-gray-300 rounded overflow-hidden">
          <div className="flex justify-between p-[10px] border-b border-gray-300">
            <span>
              20일에 같이 잠실 직관가실 분들 분들 구합니다..!! 티켓있어요
            </span>
            <span>25.02.23</span>
          </div>
          <div className="flex justify-between p-[10px] border-b border-gray-300">
            <span>
              20일에 같이 잠실 직관가실 분들 분들 구합니다..!! 티켓있어요
            </span>
            <span>25.02.23</span>
          </div>
          <div className="flex justify-between p-[10px]">
            <span>
              20일에 같이 잠실 직관가실 분들 분들 구합니다..!! 티켓있어요
            </span>
            <span>25.02.23</span>
          </div>
        </div>
      </section>
    </div>
  );
}

export default MyInfo;
