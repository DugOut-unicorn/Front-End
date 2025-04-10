const stats = [
    { label: '평균자책', value: '21.00' },
    { label: '승-패', value: '0-1' },
    { label: '이닝', value: '3' },
    { label: '탈삼진', value: '2' },
    { label: '피안타', value: '8' },
    { label: '피홈런', value: '1' },
    { label: '볼넷', value: '2' },
    { label: 'WHIP', value: '3.33' },
  ];
  
  export default function MonthlyStats() {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white rounded-lg p-4 shadow">
        {stats.map((stat, idx) => (
          <div key={idx} className="flex flex-col items-center">
            <span className="text-gray-500 text-sm">{stat.label}</span>
            <span className="text-lg font-semibold">{stat.value}</span>
          </div>
        ))}
      </div>
    );
  }