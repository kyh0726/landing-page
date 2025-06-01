import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // TypeScript 관련 규칙 완화
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": "warn", // error에서 warn으로 변경
      
      // React 관련 규칙 완화
      "react/no-unescaped-entities": "off",
      
      // 기타 완화 규칙
      "prefer-const": "warn",
      "no-console": "off", // 개발 중 console.log 허용
    }
  }
];

export default eslintConfig;
