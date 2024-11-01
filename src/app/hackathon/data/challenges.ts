export const sampleChallenges = [
  {
    id: "1",
    title: "Valid Palindrome",
    difficulty: "Easy",
    description: "A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Given a string `s`, return `True` if it is a palindrome, or `False` otherwise.",
    starterCode: `def is_palindrome(s):
    # Your code here
    return False

# Do not modify below this line
if __name__ == "__main__":
    s = input().strip()
    print(is_palindrome(s))`,
    testCases: [
      {
        input: "A man, a plan, a canal: Panama",
        expectedOutput: "true",
        explanation: "After removing non-alphanumeric characters and converting to lowercase, the string reads the same forward and backward."
      },
      {
        input: "race a car",
        expectedOutput: "false",
        explanation: "After transformations, the string does not read the same forward and backward."
      },
      {
        input: " ",
        expectedOutput: "true",
        explanation: "After removing non-alphanumeric characters, the string is empty which is considered a palindrome."
      }
    ],
    constraints: [
      "1 <= s.length <= 2 * 10^5",
      "s consists only of printable ASCII characters"
    ],
    timeLimit: 2000,
    memoryLimit: 128000
  },
]; 