export default function ArticleDetail() {
    return (
      <div className="space-y-6 relative">
        {/* 점 3개 아이콘 */}
        <button className="absolute top-4 right-0 text-gray-400 hover:text-black text-xl">
          ⋯
        </button>
  
        {/* 제목 */}
        <div className="border-t pt-4 mb-2">
          <h1 className="text-base font-bold">
            롯데 vs LG 잠실 개막전 같이 보러가실 분 구합니다!! (티켓 있음)
          </h1>
        </div>
  
        {/* 메타 정보 */}
        <div className="flex justify-between text-sm text-gray-400 items-start">
          <div className="space-y-1">
            <div>
              경기 일시 : <span className="font-medium text-black">2025.03.19</span>
            </div>
            <div>
              경기 장소 : <span className="font-medium text-black">잠실 야구 경기장</span>
            </div>
            <div>
              좌석 : <span className="font-medium text-black">112블럭</span>
            </div>
          </div>
          <div className="text-right space-y-1">
            <div>
              작성자 : <span className="font-medium text-black">야구좋아</span>
            </div>
            <button className="underline text-xs text-blue-600">프로필 자세히 보기</button>
          </div>
        </div>
  
        {/* 본문 */}
        <div className="bg-white border border-gray-300 rounded-lg p-4 text-sm whitespace-pre-line">
          23일 잠실 개막전 같이 보러가실 분 한 명 구합니다.{"\n"}
          티켓 1루 외야석 410블럭에 2자리 가지고 있어요...!!!{"\n"}
          남자분이시면 좋을 것 같습니다
        </div>
  
        {/* 채팅 버튼 */}
        <div className="text-right mt-2">
          <button className="bg-black text-white text-sm px-4 py-2 rounded">
            채팅하기
          </button>
        </div>
  
        {/* 이전/다음 글 네비게이션 */}
        <div className="flex justify-center gap-8 text-sm text-gray-400 border-t py-4">
          <button className="flex items-center gap-2 hover:underline">
            <span className="text-base">〈</span>
            <span>이전 글</span>
          </button>
          <span>|</span>
          <button className="flex items-center gap-2 hover:underline">
            <span>다음 글</span>
            <span className="text-base">〉</span>
          </button>
        </div>
      </div>
    );
  }
  