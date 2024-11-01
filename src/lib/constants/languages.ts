export const SUPPORTED_LANGUAGES = {
  python: { id: 71, name: "Python (3.8.1)" },
  cpp: { id: 54, name: "C++ (GCC 9.2.0)" },
  java: { id: 62, name: "Java (OpenJDK 13.0.1)" },
  javascript: { id: 63, name: "JavaScript (Node.js 12.14.0)" },
  typescript: { id: 74, name: "TypeScript (3.7.4)" },
  go: { id: 60, name: "Go (1.13.5)" },
  rust: { id: 73, name: "Rust (1.40.0)" },
  ruby: { id: 72, name: "Ruby (2.7.0)" }
} as const;

export type SupportedLanguage = keyof typeof SUPPORTED_LANGUAGES;