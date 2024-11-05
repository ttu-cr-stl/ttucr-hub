interface ScoreParams {
  completionTime: number; // in seconds
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export function calculateScore({ completionTime, difficulty }: ScoreParams): number {
  const baseScore = {
    'Easy': 100,
    'Medium': 200,
    'Hard': 300
  }[difficulty];

  // Adjust time penalties based on seconds
  const timePenalty = Math.floor(completionTime / 60) * 1; // 1 point per minute
  
  return Math.max(baseScore - timePenalty, Math.floor(baseScore * 0.1));
} 