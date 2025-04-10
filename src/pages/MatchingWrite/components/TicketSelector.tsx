export default function TicketSelector() {
    return (
      <div>
        <label className="block mb-1 font-medium">티켓 보유 여부</label>
        <select className="w-full border rounded px-3 py-2 text-sm mb-2">
          <option>티켓 보유 여부를 선택해 주세요.</option>
          <option>보유</option>
          <option>미보유</option>
        </select>
        <button className="border text-sm px-4 py-1 rounded">티켓 인증하기</button>
      </div>
    );
  }