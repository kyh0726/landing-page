"use client";
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function PaymentComplete() {
  const searchParams = useSearchParams();
  const [paymentInfo, setPaymentInfo] = useState<{
    paymentId: string | null;
    code: string | null;
    message: string | null;
  }>({
    paymentId: null,
    code: null,
    message: null,
  });

  useEffect(() => {
    setPaymentInfo({
      paymentId: searchParams.get('paymentId'),
      code: searchParams.get('code'),
      message: searchParams.get('message'),
    });
  }, [searchParams]);

  const isSuccess = !paymentInfo.code;

  return (
    <div className="min-h-screen bg-[#1C1C1E] text-white flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-[#2C2C2E] rounded-2xl shadow-lg p-8 text-center">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-blue-200 mb-2">Fossistant</h1>
          <p className="text-gray-400">오픈소스 기여 도우미</p>
        </div>

        <div className={`p-6 rounded-xl mb-6 ${
          isSuccess 
            ? 'bg-green-900 border border-green-600' 
            : 'bg-red-900 border border-red-600'
        }`}>
          <div className="text-6xl mb-4">
            {isSuccess ? '✅' : '❌'}
          </div>
          
          <h2 className="text-2xl font-bold mb-2">
            {isSuccess ? '결제 완료!' : '결제 실패'}
          </h2>
          
          <p className="text-gray-300 mb-4">
            {isSuccess 
              ? 'Fossistant 프리미엄 구독이 시작되었습니다.'
              : paymentInfo.message || '결제 중 오류가 발생했습니다.'
            }
          </p>

          {paymentInfo.paymentId && (
            <div className="text-sm text-gray-400">
              결제 ID: {paymentInfo.paymentId}
            </div>
          )}
        </div>

        {isSuccess ? (
          <div className="space-y-4">
            <div className="bg-[#232326] rounded-xl p-4 border border-[#2d2d30]">
              <h3 className="font-semibold mb-2">이제 사용할 수 있는 기능:</h3>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>✨ 무제한 이슈 분석</li>
                <li>🎯 개인 맞춤 추천</li>
                <li>📊 상세 통계 및 리포트</li>
                <li>🚀 우선 기술 지원</li>
              </ul>
            </div>
            
            <Link 
              href="/dashboard" 
              className="block w-full py-3 bg-blue-600 hover:bg-blue-700 rounded-xl font-bold text-center transition-colors"
            >
              대시보드로 이동
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            <button 
              onClick={() => window.history.back()}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded-xl font-bold transition-colors"
            >
              다시 시도하기
            </button>
          </div>
        )}

        <Link 
          href="/" 
          className="block mt-4 text-gray-400 hover:text-white transition-colors"
        >
          홈으로 돌아가기
        </Link>
      </div>
    </div>
  );
} 