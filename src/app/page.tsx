"use client";
import { useState, useEffect } from 'react';
import * as PortOne from "@portone/browser-sdk/v2";
import { ENV, validateEnv } from '../config/env';

type PaymentProvider = 'TOSS' | 'KAKAOPAY';

interface ProviderInfo {
  name: string;
  channelKey: string;
  method: string;
  description: string;
  icon: string;
  recommended?: boolean;
}

const PROVIDERS: Record<PaymentProvider, ProviderInfo> = {
  TOSS: {
    name: '토스페이먼츠',
    channelKey: ENV.TOSS_CHANNEL_KEY || '',
    method: 'CARD',
    description: '깔끔한 UI, 빠른 처리',
    icon: '💙',
    recommended: true
  },
  KAKAOPAY: {
    name: '카카오페이',
    channelKey: ENV.KAKAOPAY_CHANNEL_KEY || '',
    method: 'EASY_PAY',
    description: '간편결제, 카톡으로 결제',
    icon: '💛',
    recommended: true
  }
};

export default function Home() {
  const [isPaymentLoading, setIsPaymentLoading] = useState(false);
  const [paymentResult, setPaymentResult] = useState<string | null>(null);
  const [selectedProvider, setSelectedProvider] = useState<PaymentProvider>('KAKAOPAY');

  // 컴포넌트 마운트 시 환경 변수 검증
  useEffect(() => {
    validateEnv();
  }, []);

  const handlePayment = async () => {
    setIsPaymentLoading(true);
    setPaymentResult(null);

    try {
      const provider = PROVIDERS[selectedProvider];
      console.log(ENV.PORTONE_STORE_ID);
      console.log(provider.channelKey);
      console.log(provider.method);
      let billingKeyRequest: any = {
        storeId: ENV.PORTONE_STORE_ID,
        channelKey: provider.channelKey,
        billingKeyMethod: provider.method,
        issueId: `billing-${crypto.randomUUID()}`,
        issueName: "Fossistant 프리미엄 구독",
        customer: {
          fullName: "홍길동",
          phoneNumber: "010-0000-0000",
          email: "test@example.com",
        },
        redirectUrl: `${ENV.APP_URL}/payment/complete`,
      };

      // 간편결제인 경우 provider 추가
      if (provider.method === 'EASY_PAY') {
        billingKeyRequest.easyPayProvider = selectedProvider;
      }

      console.log('빌링키 발급 요청:', billingKeyRequest);
      console.log('현재 환경:', ENV.IS_PRODUCTION ? 'Production' : 'Development');

      const response = await PortOne.requestIssueBillingKey(billingKeyRequest);

      if (!response) {
        setPaymentResult('빌링키 발급 응답을 받지 못했습니다.');
        return;
      }
      
      console.log('빌링키 발급 응답:', response);
      
      if (response.code != null) {
        setPaymentResult(`빌링키 발급 실패: ${response.message}`);
      } else {
        setPaymentResult(`빌링키 발급 성공! 빌링키: ${response.billingKey}`);
        console.log('발급된 빌링키:', response.billingKey);
      }
    } catch (error) {
      console.error('빌링키 발급 오류:', error);
      setPaymentResult('빌링키 발급 중 오류가 발생했습니다.');
    } finally {
      setIsPaymentLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#1C1C1E] text-white flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-[#2C2C2E] rounded-2xl shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-200 mb-2">Fossistant</h1>
          <p className="text-gray-400">오픈소스 기여 도우미</p>
          {/* 개발 환경에서만 환경 정보 표시 */}
          {ENV.IS_DEVELOPMENT && (
            <p className="text-xs text-yellow-400 mt-1">
              🛠️ 개발 환경 (StoreID: {ENV.PORTONE_STORE_ID?.slice(-8)})
            </p>
          )}
        </div>

        <div className="bg-[#232326] rounded-xl p-6 mb-6 border border-[#2d2d30]">
          <h2 className="text-xl font-semibold mb-4">프리미엄 구독</h2>
          <div className="space-y-3 mb-4">
            <div className="flex justify-between items-center">
              <span>✨ 무제한 이슈 분석</span>
              <span className="text-green-400">✓</span>
            </div>
            <div className="flex justify-between items-center">
              <span>🎯 개인 맞춤 추천</span>
              <span className="text-green-400">✓</span>
            </div>
            <div className="flex justify-between items-center">
              <span>📊 상세 통계 및 리포트</span>
              <span className="text-green-400">✓</span>
            </div>
            <div className="flex justify-between items-center">
              <span>🚀 우선 기술 지원</span>
              <span className="text-green-400">✓</span>
            </div>
          </div>
          <hr className="border-gray-600 mb-4" />
          <div className="flex justify-between items-center text-lg font-bold">
            <span>월 구독료</span>
            <span className="text-blue-300">₩9,900</span>
          </div>
        </div>

        {/* 결제 수단 선택 */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">간편 결제 수단 선택</h3>
          <div className="space-y-3">
            {(Object.entries(PROVIDERS) as [PaymentProvider, ProviderInfo][]).map(([key, provider]) => (
              <button
                key={key}
                onClick={() => setSelectedProvider(key)}
                className={`w-full p-4 rounded-xl text-left transition-all relative ${
                  selectedProvider === key
                    ? 'bg-blue-600 border-2 border-blue-400 shadow-lg'
                    : 'bg-[#232326] border border-[#2d2d30] hover:bg-[#2a2a2c] hover:border-gray-500'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{provider.icon}</span>
                    <div>
                      <div className="font-semibold flex items-center gap-2">
                        {provider.name}
                        {provider.recommended && (
                          <span className="text-xs bg-yellow-600 text-yellow-100 px-2 py-1 rounded-full">
                            추천
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-gray-400">{provider.description}</div>
                      {/* 개발 환경에서만 채널키 일부 표시 */}
                      {ENV.IS_DEVELOPMENT && (
                        <div className="text-xs text-gray-500 mt-1">
                          채널: {provider.channelKey.slice(-8)}
                        </div>
                      )}
                    </div>
                  </div>
                  {selectedProvider === key && (
                    <span className="text-blue-200">✓</span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handlePayment}
          disabled={isPaymentLoading}
          className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
            isPaymentLoading
              ? 'bg-gray-600 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 hover:shadow-lg'
          }`}
        >
          {isPaymentLoading 
            ? '빌링키 발급 중...' 
            : `${PROVIDERS[selectedProvider].icon} ${PROVIDERS[selectedProvider].name}로 구독 시작`
          }
        </button>

        {paymentResult && (
          <div className={`mt-4 p-4 rounded-lg ${
            paymentResult.includes('성공') 
              ? 'bg-green-900 border border-green-600 text-green-200'
              : 'bg-red-900 border border-red-600 text-red-200'
          }`}>
            {paymentResult}
          </div>
        )}

        <div className="mt-6 text-center text-xs text-gray-500">
          <p>안전한 결제를 위해 포트원 결제 시스템을 사용합니다.</p>
          <p>결제 정보는 암호화되어 보호됩니다.</p>
          <p className="mt-2 text-yellow-400">💡 간편결제로 빠르고 쉽게 구독하세요!</p>
          {ENV.IS_DEVELOPMENT && (
            <p className="mt-2 text-blue-400 text-xs">
              🔧 개발 모드: 환경 변수 {ENV.IS_PRODUCTION ? '프로덕션' : '로컬'} 설정 사용
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
