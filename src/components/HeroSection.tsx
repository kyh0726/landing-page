import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function HeroSection() {
  const handleCopyCommand = () => {
    const command = 'brew install productivity-tracker';
    navigator.clipboard.writeText(command);
    // 복사 완료 알림을 추가할 수 있습니다
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
      {/* 왼쪽 콘텐츠 */}
      <div className="font-korean">
        <Badge className="bg-green-100 text-green-800 hover:bg-green-200 mb-4 hover:scale-105 transition-all duration-300 cursor-pointer font-semibold px-4 py-2">
          🚀 베타 테스터 모집 중 - 평생 특가!
        </Badge>
        
        <h1 className="text-display-xl lg:text-display-2xl font-display text-gray-900 mb-6 leading-tight font-korean">
          개발자를 위한<br />
          <span className="text-gradient-purple">스마트 생산성</span> 추적기<br />
          <span className="text-gradient-green">+</span> 경쟁 플랫폼 🏆
        </h1>
        
        <p className="text-xl lg:text-2xl text-gray-700 mb-8 leading-relaxed font-medium font-korean">
          <strong className="text-blue-700">IDE별 코딩 시간</strong>부터 <strong className="text-red-700">유튜브 시청 패턴</strong>까지 완벽 분석!<br />
          친구들과 리더보드 경쟁하며 생산성을 게임처럼 즐겨보세요.<br />
          <span className="font-bold text-purple-700 bg-purple-100 px-3 py-2 rounded-lg">GitHub 배지</span> + <span className="font-bold text-green-700 bg-green-100 px-3 py-2 rounded-lg">노션 연동</span> + <span className="font-bold text-blue-700 bg-blue-100 px-3 py-2 rounded-lg">실시간 통계</span>
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <Button 
            size="lg" 
            className="btn-primary bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white hover:scale-105 active:scale-95 transition-all duration-200 hover:shadow-xl font-display font-semibold text-lg px-8 py-4"
            onClick={() => window.open('https://github.com/productivity-tracker/releases/latest', '_blank')}
          >
            <span className="mr-2">🍎</span>
            Mac용 앱 다운로드
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="btn-primary border-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:scale-105 active:scale-95 transition-all duration-200 hover:shadow-lg font-display font-semibold text-lg px-8 py-4"
            onClick={handleCopyCommand}
          >
            <span className="mr-2">⚡</span>
            CLI로 설치하기
          </Button>
        </div>

        {/* Homebrew 설치 명령어 */}
        <div className="bg-gray-900 rounded-xl p-4 mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 text-sm font-medium font-english">개발자용 CLI 설치</span>
            <button
              onClick={handleCopyCommand}
              className="text-green-400 hover:text-green-300 text-sm font-medium hover:bg-gray-800 px-3 py-1 rounded transition-all duration-200 font-english"
            >
              복사
            </button>
          </div>
          <div className="bg-gray-800 rounded-lg p-3">
            <code className="text-green-400 font-mono text-sm font-english">
              $ brew install productivity-tracker
            </code>
          </div>
        </div>

        <div className="text-base text-gray-600 bg-gradient-to-r from-orange-50 to-yellow-50 p-4 rounded-xl border border-orange-200 font-korean">
          💡 <span className="font-semibold text-gray-800">베타 기능:</span> AI 기반 생산성 분석 & 맞춤형 캐릭터 시스템
        </div>
      </div>

      {/* 오른쪽 실시간 대시보드 */}
      <div className="relative">
        <div className="bg-white rounded-2xl shadow-2xl p-6 transform rotate-1 hover:rotate-0 hover:scale-105 transition-all duration-500 cursor-pointer group hover:shadow-3xl border border-gray-200">
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 mb-4 group-hover:from-blue-100 group-hover:to-purple-100 transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <span className="text-lg font-bold text-gray-800 group-hover:text-gray-900 transition-colors duration-300 font-display">실시간 활동 분석</span>
              <Badge className="bg-green-100 text-green-800 hover:bg-green-200 transition-colors duration-300 font-medium font-english">🔴 LIVE</Badge>
            </div>
            
            {/* 현재 활동 상태 */}
            <div className="bg-white rounded-xl p-5 mb-5 hover:shadow-md transition-shadow duration-300 cursor-pointer group/activity border border-gray-200">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold text-gray-700 font-display">현재 활동</span>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-xs text-gray-600 font-english font-mono">VS Code</span>
                </div>
              </div>
              
              <div className="text-lg font-bold text-purple-700 mb-2 font-display">React 컴포넌트 개발</div>
              <div className="text-sm text-gray-600 mb-3 font-korean">집중 시간: <span className="font-mono font-english">47분 32초</span></div>
              
              {/* 카테고리별 시간 */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-blue-50 rounded-lg p-3 text-center">
                  <div className="text-sm font-bold text-blue-700 font-korean">💻 코딩</div>
                  <div className="text-xs text-blue-600 font-mono font-english">3h 24m</div>
                </div>
                <div className="bg-red-50 rounded-lg p-3 text-center">
                  <div className="text-sm font-bold text-red-700 font-korean">📺 유튜브</div>
                  <div className="text-xs text-red-600 font-mono font-english">18m</div>
                </div>
              </div>
            </div>

            {/* 오늘의 리더보드 순위 */}
            <div className="bg-white rounded-xl p-4 border border-gray-200">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold text-gray-700 font-display">오늘의 순위</span>
                <Badge className="bg-yellow-100 text-yellow-800 text-xs font-display">🏆 3위</Badge>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 font-korean">🥇 김개발 <span className="text-green-600 font-english">(+2↗️)</span></span>
                  <span className="font-bold text-green-600 font-english">847점</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 font-korean">🥈 박코더</span>
                  <span className="font-bold text-blue-600 font-english">792점</span>
                </div>
                <div className="flex items-center justify-between text-sm bg-purple-50 px-2 py-1 rounded">
                  <span className="text-purple-700 font-medium font-korean">🥉 나 (당신)</span>
                  <span className="font-bold text-purple-700 font-english">734점</span>
                </div>
              </div>
              
              <div className="mt-3 text-xs text-center text-gray-500 bg-yellow-50 p-2 rounded font-korean">
                🔥 김개발을 추월하려면 <span className="font-mono font-english">113점</span> 더 필요!
              </div>
            </div>
          </div>
        </div>
        
        {/* 부유하는 요소들 */}
        <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-green-400 to-blue-400 rounded-full opacity-80 animate-pulse hover:opacity-100 hover:scale-110 transition-all duration-300 cursor-pointer flex items-center justify-center text-white font-bold text-xl shadow-lg">🏆</div>
        <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full opacity-60 animate-bounce hover:opacity-100 hover:scale-110 transition-all duration-300 cursor-pointer flex items-center justify-center text-white text-lg shadow-lg">⚡</div>
      </div>
    </div>
  );
} 