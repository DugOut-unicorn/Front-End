// src/pages/Profile/components/ImageUploader.tsx

interface ImageUploaderProps {
  previewUrl: string | null;
  onFileChange: (file: File) => void;
  onUploadClick: () => void;
}

export default function ImageUploader({
  previewUrl,
  onFileChange,
  onUploadClick,
}: ImageUploaderProps) {
  return (
    <div className="flex flex-col items-center space-y-3">
      {/* 원형 프로필 미리보기 */}
      <div className="h-28 w-28 overflow-hidden rounded-full border-2 border-gray-200 bg-gray-100 lg:h-32 lg:w-32">
        <img
          src={previewUrl || "/images/user_avatar.png"}
          alt="프로필"
          className="h-full w-full object-cover"
          onError={(e) => {
            e.currentTarget.src = "/images/user_avatar.png";
          }}
        />
      </div>

      {/* 이미지 선택 버튼 */}
      <label className="cursor-pointer rounded border border-gray-300 px-3 py-1 hover:bg-gray-50 text-sm text-gray-700 lg:px-4 lg:py-2 lg:text-base">
        이미지 선택
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) onFileChange(f);
          }}
        />
      </label>

      {/* 이미지 업로드 버튼 */}
      <button
        type="button"
        onClick={onUploadClick}
        className="w-46 rounded bg-gray-400 px-4 py-2 text-white hover:bg-gray-700 text-sm lg:px-6 lg:py-3 lg:text-base"
      >
        프로필 이미지 변경
      </button>
    </div>
  );
}
