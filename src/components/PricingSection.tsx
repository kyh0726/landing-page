import React, { useEffect, useRef } from 'react';
import { Card, CardContent, CardTitle } from '@/components/ui/card';

const plans = [
  {
    title: '무료',
    subtitle: '/월',
    originalPrice: null,
    description: '개발 입문자를 위한',
    features: [
      '기본 시간 추적 (IDE, 브라우저)',
      '간단한 일/주별 통계',
      '개인 GitHub 배지',
      '3명까지 친구 비교',
      '기본 게임화 (레벨 시스템)'
    ]
  },
  {
    title: '$1',
    subtitle: '/월',
    originalPrice: '$9',
    description: '6개월 가입 시 특가 (베타 테스터)',
    features: [
      '모든 무료 기능 포함',
      '고급 IDE별 상세 분석',
      '유튜브 콘텐츠 자동 분류',
      '노션/구글 캘린더 연동',
      '전체 리더보드 + 커스텀 그룹',
      '스마트 사이트 차단',
      '시간대별 생산성 패턴 분석',
      '추월 알림 & 게임화 점수',
      '캐릭터 커스터마이징',
      '월/주/일별 상세 리포트'
    ]
  }
];

export default function PricingSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      sectionRef.current.classList.add('scroll-animate', 'animate-left');
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={sectionRef} className="bg-white rounded-2xl p-8 border border-purple-100 hover:shadow-xl transition-shadow duration-300">
      <h2 className="text-3xl font-display text-gray-900 mb-6 text-center hover:text-purple-700 transition-colors duration-300">베타 테스터 특별 혜택</h2>
      <p className="text-lg text-gray-700 mb-8 text-center hover:text-gray-800 transition-colors duration-300 font-medium">
        개발자를 위한 스마트 생산성 추적기. 지금 가입하면 베이직 플랜을 월 $1에 평생 이용 가능!
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {plans.map((plan, index) => (
          <div key={index} className={`flip-card h-96 ${index === 1 ? 'ring-4 ring-green-100' : ''}`}>
            <div className="flip-card-inner">
              {/* 앞면 */}
              <Card className={`flip-card-front border-2 ${index === 1 ? 'border-green-300' : 'border-purple-200'} cursor-pointer relative overflow-hidden`}>
                {/* 배경 효과 */}
                <div className={`absolute inset-0 bg-gradient-to-br ${index === 0 ? 'from-purple-50 via-blue-50 to-purple-100' : 'from-green-50 via-yellow-50 to-green-100'}`}></div>
                
                {/* 배지 - 가시성 개선 */}
                {index === 1 && (
                  <div className="absolute -top-3 -right-3 bg-gradient-to-r from-red-500 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold transform rotate-12 shadow-xl border-2 border-white z-10">
                    🔥 89% 할인!
                  </div>
                )}
                
                {index === 0 && (
                  <div className="absolute -top-3 -right-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-full text-sm font-bold transform rotate-12 shadow-xl border-2 border-white z-10">
                    무료 시작
                  </div>
                )}
                
                <CardContent className="relative z-10 flex flex-col items-center justify-center h-full p-8 text-center">
                  <CardTitle className={`text-5xl font-display mb-4 ${index === 0 ? 'text-purple-600' : 'text-green-600'}`}>
                    {plan.title}<span className="text-2xl font-medium text-gray-600">{plan.subtitle}</span>
                  </CardTitle>
                  
                  {plan.originalPrice && (
                    <div className="mb-4">
                      <div className="text-lg text-red-500 line-through font-medium opacity-80">
                        원래 {plan.originalPrice}/월
                      </div>
                    </div>
                  )}
                  
                  <p className="text-lg text-gray-700 font-medium mb-6">
                    {plan.description}
                  </p>
                  
                  <div className="text-sm text-gray-500">
                    마우스를 올려보세요
                  </div>
                </CardContent>
              </Card>
              
              {/* 뒷면 */}
              <Card className={`flip-card-back border-2 ${index === 1 ? 'border-green-300' : 'border-purple-200'} cursor-pointer relative overflow-hidden`}>
                <div className={`absolute inset-0 bg-gradient-to-br ${index === 0 ? 'from-purple-100 via-blue-100 to-purple-200' : 'from-green-100 via-yellow-100 to-green-200'}`}></div>
                
                <CardContent className="relative z-10 h-full p-6">
                  {/* 할인율 강조 (뒷면) */}
                  {index === 1 && (
                    <div className="mb-4 p-3 bg-gradient-to-r from-red-100 to-orange-100 rounded-lg border border-red-200">
                      <div className="text-lg font-bold text-red-700">
                        💰 월 $9 → $1 (89% 할인!)
                      </div>
                      <div className="text-sm text-red-600 font-medium">
                        베타 테스터 평생 특가
                      </div>
                    </div>
                  )}
                  
                  <ul className="space-y-2 mb-6 text-xs">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start text-xs">
                        <div className={`w-3 h-3 mt-0.5 ${feature.includes('고급') || feature.includes('전체') ? 'bg-orange-500' : 'bg-green-500'} rounded-full mr-2 flex items-center justify-center shadow-sm flex-shrink-0`}>
                          <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                        </div>
                        <span className={`font-medium leading-tight ${feature.includes('고급') || feature.includes('전체') ? 'text-orange-700' : 'text-gray-800'}`}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                  
                  <button className={`w-full py-3 rounded-xl font-bold text-lg transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg ${
                    index === 0 
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white hover:shadow-purple-300' 
                      : 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white hover:shadow-green-300'
                  }`}>
                    {index === 0 ? '🚀 무료로 시작' : '⚡ 베타 테스터 가입'}
                  </button>
                  
                  <p className={`text-sm text-center font-medium mt-3 ${index === 0 ? 'text-purple-700' : 'text-green-700'}`}>
                    {index === 0 ? '✨ 언제든 업그레이드 가능' : '🎯 평생 이 가격 보장!'}
                  </p>
                  
                  {index === 1 && (
                    <div className="mt-3">
                      <div className="bg-gradient-to-r from-blue-100 to-purple-100 p-3 rounded-lg border border-blue-200">
                        <p className="text-sm text-center text-blue-800 font-medium">
                          🤖 AI 분석 기능 출시 시 무료 업데이트!
                        </p>
                        <p className="text-xs text-center text-blue-700 mt-1">
                          추가 비용 없이 모든 신기능 이용
                        </p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        ))}
      </div>
      
      {/* 추가 정보 */}
      <div className="mt-10 text-center transition-opacity duration-300">
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-2xl border border-purple-100">
          <p className="text-base text-gray-700 hover:text-gray-800 transition-colors duration-200 font-medium mb-2">
            🏆 전체 리더보드에서 친구들과 경쟁하며 생산성을 게임처럼 즐겨보세요!
          </p>
          <p className="text-sm text-gray-600 font-medium">
            💡 <strong>특별 혜택:</strong> 지금 가입하면 향후 모든 신기능 (AI 분석, 고급 게임화) 무료 제공!
          </p>
        </div>
      </div>
    </div>
  );
} 