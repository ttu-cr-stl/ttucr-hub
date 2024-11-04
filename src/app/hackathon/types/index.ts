export interface TestCase {
  input: string;
  expectedOutput: string;
  explanation?: string;
}

export interface Challenge {
  id: string;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  description: string;
  starterCode: string;
  testCases: TestCase[];
  constraints: string[];
  timeLimit: number;
  memoryLimit: number;
  helpfulFunctions: HelpfulFunction[];
}

interface HelpfulFunction {
  name: string;
  description: string;
  example: string;
}


export interface ExecutionResult {
  passed: boolean;
  actualOutput: string;
  expectedOutput: string;
  executionTime?: number;
  error?: string;
  aiDetection?: {
    isAIGenerated: boolean;
    confidence: number;
    explanation?: string;
  };
}

export interface SubmissionResponse {
  stdout: string | null;
  stderr: string | null;
  compile_output: string | null;
  message?: string;
  time: string;
  memory: number;
  status: {
    id: number;
    description: string;
  };
}

export interface ChallengeProgress {
  id: string;
  completed: boolean;
  attempts: number;
  bestTime?: number;
  lastAttempt?: Date;
  score: number;
}

export interface UserProgress {
  currentChallengeId: string;
  completedChallenges: ChallengeProgress[];
  totalScore: number;
}

interface HackathonSubmission {
  id: string;
  username: string;
  challengeId: string;
  score: number;
  completionTime: number; // in seconds
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
  sessionId: string;
}
