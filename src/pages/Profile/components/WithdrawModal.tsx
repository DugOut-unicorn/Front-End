// src/pages/Profile/components/WithdrawModal.tsx
import { X } from "lucide-react";

interface WithdrawModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function WithdrawModal({
  isOpen,
  onClose,
  onConfirm,
}: WithdrawModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="relative w-full max-w-sm rounded-xl bg-white p-6 shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X size={20} />
        </button>
        <h2 className="mb-2 text-xl font-semibold text-gray-800">회원 탈퇴</h2>
        <p className="mb-6 text-center text-gray-600">
          탈퇴 시, 모든 데이터가 영구적으로 삭제됩니다.
        </p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={onClose}
            className="flex-1 rounded-lg border border-gray-300 py-2 text-gray-700 hover:bg-gray-100"
          >
            취소하기
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 rounded-lg bg-red-500 py-2 text-white hover:bg-red-600"
          >
            탈퇴하기
          </button>
        </div>
      </div>
    </div>
  );
}
