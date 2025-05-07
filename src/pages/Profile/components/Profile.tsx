// src/pages/Profile/components/Profile.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const dummyPosts = [
  { id: 1, text: '20일에 같이 잠실 직관가실 분들 분들 구합니다..!! 티켓있어요', date: '25.02.23' },
  { id: 2, text: '20일에 같이 잠실 직관가실 분들 분들 구합니다..!! 티켓있어요', date: '25.02.23' },
  { id: 3, text: '20일에 같이 잠실 직관가실 분들 분들 구합니다..!! 티켓있어요', date: '25.02.23' },
];

export default function Profile() {
  const navigate = useNavigate();

  return (
    <>
      {/* 헤더 배너 */}
      <section
        className="w-full h-48 bg-blue-900 relative overflow-hidden rounded-xl shadow-sm mb-8"
        style={{
          backgroundImage: "url('/images/banner_bg.png')",
          backgroundSize: 'cover',
        }}
      >
        <div className="absolute inset-0 bg-blue-900 bg-opacity-75" />
        <div className="relative flex items-start h-full px-8 pt-6">
          {/* 프로필 + 소개 */}
          <div className="flex items-start space-x-6">
            <img
              src="/images/user_avatar.png"
              alt="프로필"
              className="w-24 h-24 rounded-full border-4 border-white object-cover"
            />
            <div className="text-white">
              <div className="flex items-center space-x-2">
                <h1 className="text-2xl font-bold">야구조아</h1>
                <span className="px-2 py-0.5 bg-white text-blue-900 text-xs rounded-full font-medium">
                  두산베어스
                </span>
              </div>
              <p className="mt-1 text-sm">
                안녕하세요, 경기도 고양사는 23살 대학생 입니다!
              </p>
              {/* 수정/설정 버튼 */}
              <div className="flex items-center space-x-3 mt-3">
                <button
                  onClick={() => navigate('/mypage/edit')}
                  className="p-2 rounded-full bg-blue bg-opacity-20 hover:bg-opacity-30 transition"
                >
                  <img
                    src="/images/modify_btn.png"
                    alt="Edit"
                    className="w-5 h-5"
                  />
                </button>
                <button
                  onClick={() => navigate('/mypage/info')}
                  className="p-2 rounded-full bg-blue bg-opacity-20 hover:bg-opacity-30 transition"
                >
                  <img
                    src="/images/setting_btn.png"
                    alt="Settings"
                    className="w-5 h-5"
                  />
                </button>
              </div>
            </div>
          </div>

          {/* 우측: 팀 엠블럼 */}
          <div className="ml-auto flex items-center h-full pb-4">
            <img
              src="/images/doosan_emb.png"
              alt="팀 엠블럼"
              className="w-24 h-24 object-contain"
            />
          </div>
        </div>
      </section>

      {/* 직관 온도 */}
      <section className="bg-white rounded-xl p-6 shadow-sm mb-8">
        <div className="flex justify-between items-center mb-4">
          <span className="text-lg font-medium text-gray-800">직관 온도</span>
          <span className="text-lg font-semibold text-red-500">36.5℃</span>
        </div>
        <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="absolute left-0 top-0 h-full bg-red-500"
            style={{ width: '40%' }}
          />
        </div>
      </section>

      {/* 작성한 매칭 글 */}
      <section>
        <h2 className="text-lg font-medium mb-4 text-gray-800">
          작성한 매칭 글
        </h2>
        <div className="space-y-4">
          {dummyPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-xl p-6 shadow-sm flex justify-between items-start"
            >
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-8 h-8 rounded-full bg-gray-200" />
                  <span className="text-sm text-gray-600">
                    야구조아 · 방금
                  </span>
                </div>
                <h3 className="text-base font-semibold mb-1">
                  {post.text}
                </h3>
                <p className="text-sm text-gray-500">
                  안녕하세요 저는 송파구 사는 두산 팬이고…
                </p>
              </div>
              <div className="text-right space-y-2">
                <div className="flex flex-col items-end space-y-1">
                  <span className="px-2 py-1 bg-blue-100 text-blue-600 text-xs rounded-full">
                    두산베어스
                  </span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-600 text-xs rounded-full">
                    티켓있어요
                  </span>
                </div>
                <span className="text-sm text-gray-400">
                  {post.date}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
