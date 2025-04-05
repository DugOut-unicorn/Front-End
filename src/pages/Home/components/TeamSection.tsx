import { useState } from "react";

export default function TeamSection() {
  const [currentMonth, setCurrentMonth] = useState("2025.03");

  return (
    <section className="bg-gray-50">
      <div className="relative mx-auto h-[900px] max-w-[1080px] px-4 py-16">
        <div className="relative h-full">
          {/* 왼쪽: 팀 순위 */}
          <div className="w-[440px]">
            <h2 className="mb-2 text-2xl font-bold">팀 순위</h2>
            <p className="mb-6 text-gray-600">전체 팀 순위를 확인해보세요!!</p>
            <div className="rounded-2xl bg-white p-4 shadow-lg">
              <table className="w-full">
                <tbody>
                  {[...Array(10)].map((_, index) => (
                    <tr key={index} className="border-b last:border-b-0">
                      <td className="py-2 text-center">{index + 1}위</td>
                      <td>
                        <div className="flex items-center gap-2">
                          <img
                            src="/images/lg_emb.png"
                            alt="LG"
                            className="h-6 w-6"
                          />
                          <span>구단 이름</span>
                        </div>
                      </td>
                      <td className="text-right text-sm whitespace-nowrap">
                        1W / 1L
                        {index === 0 && <div className="text-xs">(0.667)</div>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 오른쪽: 경기 일정 */}
          <div className="absolute top-70 right-0 w-[440px]">
            <div className="text-right">
              <h2 className="mb-2 text-2xl font-bold">OO 경기 일정</h2>
              <p className="mb-6 text-gray-600">
                응원하는 팀의 경기 일정을 한 눈에 확인하세요!!
              </p>
            </div>
            <div className="rounded-2xl bg-white p-4 shadow-lg">
              <div className="mb-4 flex items-center justify-between">
                <button className="text-gray-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                <span className="text-lg font-bold">{currentMonth}</span>
                <button className="text-gray-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
              <div className="grid grid-cols-7 gap-1">
                <div className="flex h-8 items-center justify-center text-sm text-red-500">
                  일
                </div>
                <div className="flex h-8 items-center justify-center text-sm">
                  월
                </div>
                <div className="flex h-8 items-center justify-center text-sm">
                  화
                </div>
                <div className="flex h-8 items-center justify-center text-sm">
                  수
                </div>
                <div className="flex h-8 items-center justify-center text-sm">
                  목
                </div>
                <div className="flex h-8 items-center justify-center text-sm">
                  금
                </div>
                <div className="flex h-8 items-center justify-center text-sm text-blue-500">
                  토
                </div>
                {Array.from({ length: 35 }).map((_, i) => (
                  <div
                    key={i}
                    className="relative flex aspect-square items-center justify-center"
                  >
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full text-sm ${
                        i === 19 ? "bg-black text-white" : ""
                      }`}
                    >
                      {((i + 23) % 31) + 1}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
