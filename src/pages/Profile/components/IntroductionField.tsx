// src/pages/Profile/components/IntroductionField.tsx
interface IntroductionFieldProps {
  introduction: string;
  onChange: (value: string) => void;
}

export default function IntroductionField({
  introduction,
  onChange,
}: IntroductionFieldProps) {
  return (
    <div className="space-y-1">
      <label
        htmlFor="introduction"
        className="block text-sm font-medium text-gray-700 lg:text-base"
      >
        자기소개
      </label>
      <textarea
        id="introduction"
        rows={4}
        value={introduction}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 lg:px-4 lg:py-3 lg:text-base"
        placeholder="자기소개를 입력해주세요."
      />
    </div>
  );
}
