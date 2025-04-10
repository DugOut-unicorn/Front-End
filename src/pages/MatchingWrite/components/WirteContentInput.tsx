export default function WriteContentInput() {
    return (
      <div>
        <label className="block mb-1 font-medium">매칭 글</label>
        <textarea
          rows={5}
          placeholder="글 내용을 자유롭게 입력해 주세요."
          className="w-full border rounded px-3 py-2 text-sm resize-none"
        />
        <div className="text-right text-xs text-gray-400 mt-1">0 / 300</div>
      </div>
    );
  }