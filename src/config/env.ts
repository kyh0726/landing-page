// 환경 변수 설정
export const ENV = {
  // 포트원 설정
  PORTONE_STORE_ID: process.env.NEXT_PUBLIC_STORE_ID,
  
  // 결제 채널 키
  TOSS_CHANNEL_KEY: process.env.NEXT_PUBLIC_CHANNEL_KEY_TOSS_PAYMENTS,
  KAKAOPAY_CHANNEL_KEY: process.env.NEXT_PUBLIC_CHANNEL_KEY_KAKAO_PAY,
  
  // 앱 설정
  APP_URL: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  
  // 환경 확인
  IS_PRODUCTION: process.env.NODE_ENV === 'production',
  IS_DEVELOPMENT: process.env.NODE_ENV === 'development',
};

// 환경 변수 검증 함수
export const validateEnv = () => {
  const requiredEnvs = [
    'PORTONE_STORE_ID',
    'TOSS_CHANNEL_KEY', 
    'KAKAOPAY_CHANNEL_KEY'
  ];

  const missingEnvs = requiredEnvs.filter(env => !ENV[env as keyof typeof ENV]);
  
  if (missingEnvs.length > 0) {
    console.warn('⚠️ 일부 환경 변수가 설정되지 않아 기본값을 사용합니다:', missingEnvs);
  }

  if (ENV.IS_PRODUCTION) {
    console.log('🚀 프로덕션 환경에서 실행 중');
  } else {
    console.log('🛠️ 개발 환경에서 실행 중');
  }
}; 