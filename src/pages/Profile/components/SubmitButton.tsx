// src/pages/Profile/components/SubmitButton.tsx


interface SubmitButtonProps {
  disabled?: boolean;
}

export default function SubmitButton({ disabled = false }: SubmitButtonProps) {
  return (
    <div className="text-center">
      <button
        type="submit"
        disabled={disabled}
        className={`rounded-md px-6 py-2 text-white text-sm ${
          disabled
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-black hover:bg-gray-800"
        } lg:px-8 lg:py-3 lg:text-base`}
      >
        변경사항 저장
      </button>
    </div>
  );
}
