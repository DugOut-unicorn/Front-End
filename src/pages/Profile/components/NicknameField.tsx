// src/pages/Profile/components/NicknameField.tsx

interface NicknameFieldProps {
  nickname: string;
  onChange: (value: string) => void;
  onCheck: () => void;
}

export default function NicknameField({
  nickname,
  onChange,
  onCheck,
}: NicknameFieldProps) {
  return (
    <div className="space-y-1">
      <label
        htmlFor="nickname"
        className="block text-sm font-medium text-gray-700 lg:text-base"
      >
        닉네임
      </label>
      <div className="flex">
        <input
          id="nickname"
          type="text"
          value={nickname}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 rounded-l-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 lg:px-4 lg:py-3 lg:text-base"
        />
        <button
          type="button"
          onClick={onCheck}
          className="rounded-r-md border border-gray-300 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 lg:px-6 lg:py-3 lg:text-base"
        >
          중복 확인
        </button>
      </div>
    </div>
  );
}
