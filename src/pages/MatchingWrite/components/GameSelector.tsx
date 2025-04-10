export default function GameSelector() {
    return (
      <div>
        <label className="block mb-1 font-medium">경기 선택</label>
        <select className="w-full border rounded px-3 py-2 text-sm">
          <option>예정 날짜의 경기를 선택해 주세요.</option>
        </select>
      </div>
    );
  }