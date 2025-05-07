import React from "react";

function WriteTitleInput() {
  return (
    <div>
      <label className="mb-1 block font-medium">제목</label>
      <input
        type="text"
        placeholder="매칭 글 제목을 입력해 주세요."
        className="w-full rounded border px-3 py-2 text-sm"
      />
    </div>
  );
}

function WriteContentInput() {
  return (
    <div>
      <label className="mb-1 block font-medium">매칭 글</label>
      <textarea
        rows={5}
        placeholder="글 내용을 자유롭게 입력해 주세요."
        className="w-full resize-none rounded border px-3 py-2 text-sm"
      />
      <div className="mt-1 text-right text-xs text-gray-400">0 / 300</div>
    </div>
  );
}

function TicketSelector() {
  return (
    <div>
      <label className="mb-1 block font-medium">티켓 보유 여부</label>
      <select className="mb-2 w-full rounded border px-3 py-2 text-sm">
        <option>티켓 보유 여부를 선택해 주세요.</option>
        <option>보유</option>
        <option>미보유</option>
      </select>
      <button className="rounded border px-4 py-1 text-sm">
        티켓 인증하기
      </button>
    </div>
  );
}

function GameDatePicker() {
  return (
    <div>
      <label className="mb-1 block font-medium">경기 날짜 선택</label>
      <div className="rounded border p-4 text-center text-sm">
        [여기에 캘린더 컴포넌트]
      </div>
    </div>
  );
}

function GameSelector() {
  return (
    <div>
      <label className="mb-1 block font-medium">경기 선택</label>
      <select className="w-full rounded border px-3 py-2 text-sm">
        <option>예정 날짜의 경기를 선택해 주세요.</option>
      </select>
    </div>
  );
}

function SubmitButtons() {
  return (
    <div className="mt-6 flex justify-end gap-2">
      <button className="rounded border px-4 py-2">취소</button>
      <button className="rounded bg-black px-4 py-2 text-white">완료</button>
    </div>
  );
}

export default function MatchingWritePage() {
  return (
    <div className="mx-auto mt-8 max-w-5xl space-y-6 px-4 py-6">
      <h1 className="border-b pb-2 text-lg font-semibold">매칭 글 작성하기</h1>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-6">
          <WriteTitleInput />
          <WriteContentInput />
          <TicketSelector />
        </div>
        <div className="space-y-6">
          <GameDatePicker />
          <GameSelector />
        </div>
      </div>

      <SubmitButtons />
    </div>
  );
}
