export default function WriteTitleInput() {
    return (
      <div>
        <label className="block mb-1 font-medium">제목</label>
        <input
          type="text"
          placeholder="매칭 글 제목을 입력해 주세요."
          className="w-full border rounded px-3 py-2 text-sm"
        />
      </div>
    );
  }
  