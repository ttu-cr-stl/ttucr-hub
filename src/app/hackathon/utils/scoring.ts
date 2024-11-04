export const calculateScore = ({
  executionTime,
  difficulty
}: {
  executionTime: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}): number => {
  // Base score by difficulty
  const baseScore = {
    Easy: 100,
    Medium: 200,
    Hard: 300
  }[difficulty];

  // Time bonus (faster = more points)
  const timeMultiplier = Math.max(0.5, 1 - (executionTime / 1000));
  
  return Math.round(baseScore * timeMultiplier);
}; 