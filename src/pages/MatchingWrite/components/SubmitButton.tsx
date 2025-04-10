export default function SubmitButtons() {
    return (
      <div className="flex justify-end gap-2 mt-6">
        <button className="border px-4 py-2 rounded">취소</button>
        <button className="bg-black text-white px-4 py-2 rounded">완료</button>
      </div>
    );
  }