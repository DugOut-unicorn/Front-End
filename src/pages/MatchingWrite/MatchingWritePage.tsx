import GameDatePicker from "./components/GameDatePicker";
import GameSelector from "./components/GameSelector";
import SubmitButtons from "./components/SubmitButton";
import TicketSelector from "./components/TicketSelector";
import WriteContentInput from "./components/WirteContentInput";
import WriteTitleInput from "./components/WriteTitleInput";

export default function MatchingWritePage() {
    return (
      <div className="max-w-5xl mx-auto px-4 py-6 space-y-6 mt-8">
        <h1 className="text-lg font-semibold border-b pb-2">매칭 글 작성하기</h1>
  
        <div className="grid md:grid-cols-2 gap-8">
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
  