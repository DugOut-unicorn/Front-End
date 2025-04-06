import React from "react";
import { useParams, useNavigate } from "react-router-dom";

interface GameSchedule {
  date: string;
  time: string;
  opponent: string;
  location: string;
}

export default function TeamInfoPage() {
  const { teamName } = useParams();
  const navigate = useNavigate();

  console.log("Current teamName:", teamName);
  console.log("Current teamName lowercase:", teamName?.toLowerCase());

  const mockGames: GameSchedule[] = [
    {
      date: "3월25일(화)",
      time: "18:30",
      opponent: "SSG",
      location: "문학",
    },
    {
      date: "3월25일(화)",
      time: "18:30",
      opponent: "SSG",
      location: "문학",
    },
    {
      date: "3월25일(화)",
      time: "18:30",
      opponent: "SSG",
      location: "문학",
    },
  ];

  const stats = {
    타율: "00",
    실책: "00",
    안타: "00",
    도루: "00",
    삼진: "00",
    평균자책: "00",
    볼넷: "00",
  };

  const allTeams = [
    { id: "kia", name: "KIA" },
    { id: "lg", name: "LG" },
    { id: "doosan", name: "DOOSAN" },
    { id: "kt", name: "KT" },
    { id: "ssg", name: "SSG" },
    { id: "nc", name: "NC" },
    { id: "samsung", name: "SAMSUNG" },
    { id: "hanwha", name: "HANWHA" },
    { id: "lotte", name: "LOTTE" },
    { id: "kiwoom", name: "KIWOOM" },
  ];

  const currentTeamId = teamName?.toLowerCase() || "";
  const otherTeams = allTeams.filter(team => team.id !== currentTeamId);

  console.log("Filtered teams:", otherTeams.length);
  console.log("Current team should be excluded:", currentTeamId);
  console.log(
    "Other teams:",
    otherTeams.map(t => t.id),
  );

  const handleTeamClick = (teamId: string) => {
    navigate(`/team/${teamId}`);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* 팀 헤더 섹션 */}
      <div className="relative h-64 bg-gradient-to-br from-blue-900 to-blue-800">
        <div className="relative mx-auto h-full max-w-[1080px] px-6">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <img
              src={`/images/${teamName?.toLowerCase()}_logo.png`}
              alt={teamName}
              className="h-40 w-40"
            />
          </div>
          <h1 className="text-2xl font-bold text-white">롯데 자이언츠</h1>
          <div className="absolute top-6 right-0 space-y-2 text-right text-sm text-white">
            <div>타율 : {stats.타율}</div>
            <div>실책 : {stats.실책}</div>
            <div>안타 : {stats.안타}</div>
            <div>도루 : {stats.도루}</div>
            <div>삼진 : {stats.삼진}</div>
            <div>평균자책 : {stats.평균자책}</div>
            <div>볼넷 : {stats.볼넷}</div>
          </div>
          <div className="absolute bottom-6 left-0">
            <div className="text-lg font-bold text-white">2025 시즌 00 위</div>
            <div className="mt-2 text-sm text-white">
              <span>경기 수</span>
              <span className="ml-2">0.00</span>
            </div>
            <div className="text-sm text-white">
              <span>최근 00승 00패</span>
            </div>
            <div className="text-sm text-white">
              <span>승률 0.000</span>
            </div>
          </div>
        </div>
      </div>

      {/* 경기 일정 섹션 */}
      <div className="mx-auto max-w-[1080px] px-6">
        <h2 className="mb-4 text-xl font-bold">경기 일정</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {mockGames.map((game, index) => (
            <div
              key={index}
              className="flex items-center justify-between rounded-lg bg-[#1B2B66] p-6 text-white"
            >
              <div className="flex w-full items-center justify-between">
                <div className="flex flex-col items-center">
                  <img
                    src="/images/lotte_emb.png"
                    alt="Giants"
                    className="mb-2 h-10"
                  />
                  <div className="text-sm">롯데</div>
                </div>

                <div className="text-center">
                  <div>{game.date}</div>
                  <div>{game.time} 예정</div>
                  <div className="text-sm">{game.location}</div>
                </div>

                <div className="flex flex-col items-center">
                  <img
                    src="/images/ssg_emb.png"
                    alt="SSG"
                    className="mb-2 h-10"
                  />
                  <div className="text-sm">SSG</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-[1080px] px-6">
        <hr className="border-gray-200" />
      </div>

      {/* 팀 순위 섹션 */}
      <div className="mx-auto max-w-[1080px] px-6">
        <h2 className="mb-4 text-xl font-bold">팀 내 순위</h2>
        <div className="grid gap-4">
          <div>
            <h3 className="mb-2 inline-block rounded-full bg-gray-200 px-4 py-1">
              투수
            </h3>
            <div className="grid grid-cols-5 gap-4">
              {["다승", "평균자책", "탈삼진", "세이브", "WHIP"].map(
                category => (
                  <div
                    key={category}
                    className="rounded-lg bg-white p-4 shadow"
                  >
                    <div className="mb-2 text-sm text-gray-500">{category}</div>
                    <div className="flex items-center gap-3">
                      <span className="text-xl font-bold">1</span>
                      <div className="flex items-center gap-2">
                        <img
                          src="/images/반즈.png"
                          alt="Player"
                          className="h-12 w-10 rounded-lg object-cover"
                        />
                        <div>
                          <div className="font-bold">박세웅</div>
                          <div className="text-sm text-gray-500">7.20</div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-2 space-y-2 border-t border-gray-100 pt-2">
                      {[2, 3].map(rank => (
                        <div
                          key={rank}
                          className="flex items-center justify-between"
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-sm">{rank}</span>
                            <span className="text-sm">임기영</span>
                          </div>
                          <span className="text-sm">21.0</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ),
              )}
            </div>
          </div>
          <div>
            <h3 className="mb-2 inline-block rounded-full bg-gray-200 px-4 py-1">
              타자
            </h3>
            <div className="grid grid-cols-5 gap-4">
              {["타율", "타점", "OPS", "wRC+", "투수WAR"].map(category => (
                <div key={category} className="rounded-lg bg-white p-4 shadow">
                  <div className="mb-2 text-sm text-gray-500">{category}</div>
                  <div className="flex items-center gap-3">
                    <span className="text-xl font-bold">1</span>
                    <div className="flex items-center gap-2">
                      <img
                        src="/images/반즈.png"
                        alt="Player"
                        className="h-12 w-10 rounded-lg object-cover"
                      />
                      <div>
                        <div className="font-bold">박세웅</div>
                        <div className="text-sm text-gray-500">7.20</div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 space-y-2 border-t border-gray-100 pt-2">
                    {[2, 3].map(rank => (
                      <div
                        key={rank}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-sm">{rank}</span>
                          <span className="text-sm">임기영</span>
                        </div>
                        <span className="text-sm">21.0</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 선수단 섹션 */}
      <div className="mx-auto max-w-[1080px] px-6">
        <h2 className="mb-4 text-xl font-bold">선수단</h2>
        <div className="flex gap-2">
          <button className="rounded-full bg-blue-900 px-4 py-1 text-sm text-white">
            투수
          </button>
          <button className="rounded-full bg-gray-200 px-4 py-1 text-sm">
            내야수
          </button>
          <button className="rounded-full bg-gray-200 px-4 py-1 text-sm">
            외야수
          </button>
          <button className="rounded-full bg-gray-200 px-4 py-1 text-sm">
            포수
          </button>
        </div>
        <div className="mt-4 grid grid-cols-8 gap-2">
          {[...Array(8)].map((_, index) => (
            <div key={index} className="flex flex-col items-center">
              <img
                src="/images/반즈.png"
                alt="Player"
                className="mb-1 h-[120px] w-[100px] rounded-sm object-cover"
              />
              <div className="text-sm font-medium">반즈</div>
              <div className="text-xs text-gray-500">NO.28</div>
            </div>
          ))}
        </div>
      </div>

      {/* 타 구단 바로가기 */}
      <div className="mx-auto max-w-[1080px] px-6">
        <h2 className="mb-4 text-xl font-bold">타 구단 바로 가기</h2>
        <div className="flex items-center justify-between">
          {otherTeams.map(team => (
            <img
              key={team.id}
              src={`/images/${team.id}_emb.png`}
              alt={team.name}
              className="h-16 w-16 cursor-pointer transition-transform hover:scale-110"
              onClick={() => handleTeamClick(team.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
