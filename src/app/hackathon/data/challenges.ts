/* 
  This file contains the challenges for the hackathon.
  Each challenge is an object that contains the challenge details.
  The challenges are exported as an array of Challenge objects.
  The challenges are separated into individual files for better maintainability.

  The challenges are defined in the following format:
  - id: A unique identifier for the challenge.
  - title: The title of the challenge.
  - difficulty: The difficulty of the challenge.
  - description: The description of the challenge.
  - starterCode: The starter code for the challenge.
  - testCases: The test cases for the challenge.
  - constraints: The constraints for the challenge.
  - timeLimit: The time limit for the challenge.
  - memoryLimit: The memory limit for the challenge.
  - helpfulFunctions: The helpful functions for the challenge.

  The test cases are defined in the following format:
  - input: The input for the test case.
  - expectedOutput: The expected output for the test case.
  - explanation: The explanation for the test case.

  (All challenges must be written in Python and have at least 3 test cases.)

  The constraints are defined in the following format:
  - constraint: The constraint for the challenge. (e.g. "1 <= nums.length <= 104")
*/


import { Challenge } from "../types";

// Define challenge difficulty as a const to avoid magic strings
const DIFFICULTY = {
  EASY: "Easy",
  MEDIUM: "Medium",
  HARD: "Hard",
} as const;

// Separate the challenges into individual objects for better maintainability
const sumNumbersChallenge: Challenge = {
  id: "1",
  title: "Sum of Numbers",
  difficulty: DIFFICULTY.EASY,
  description: `Write a function that takes a list of numbers and returns their sum.
    
Given a list of integers \`nums\`, return the sum of all numbers in the list.`,
  starterCode: `def sum_numbers(nums):
    # Your code here
    return 0

# Do not modify below this line
if __name__ == "__main__":
    nums = list(map(int, input().strip()[1:-1].split(",")))
    print(sum_numbers(nums))`,
  testCases: [
    {
      input: "[1,2,3,4,5]",
      expectedOutput: "15",
      explanation: "1 + 2 + 3 + 4 + 5 = 15",
    },
    {
      input: "[-1,0,1]",
      expectedOutput: "0",
      explanation: "-1 + 0 + 1 = 0",
    },
    {
      input: "[10]",
      expectedOutput: "10",
      explanation: "Single number returns itself",
    },
  ],
  constraints: [
    "1 <= nums.length <= 104",
    "-109 <= nums[i] <= 109",
  ],
  timeLimit: 1000,
  memoryLimit: 128000,
  helpfulFunctions: [
    {
      name: "sum()",
      description: "Returns sum of iterable",
      example: "sum([1,2,3]) → 6",
    },
  ],
};

const reverseStringChallenge: Challenge = {
  id: "3",
  title: "Reverse a String",
  difficulty: DIFFICULTY.EASY,
  description: `Write a function that reverses a string. The input is given as a string.
    
Given a string \`s\`, return the string in reverse order. For example, "hello" becomes "olleh".

Note: You need to reverse the string in-place without using extra space.`,
  starterCode: `def reverse_string(s):
    # Your code here
    return s

# Do not modify below this line
if __name__ == "__main__":
    s = input().strip()[1:-1]  # Remove quotes
    print(f'"{reverse_string(s)}"')`,
  testCases: [
    {
      input: '"hello"',
      expectedOutput: '"olleh"',
      explanation: "Reversing the characters in 'hello' gives 'olleh'",
    },
    {
      input: '"Python"',
      expectedOutput: '"nohtyP"',
      explanation: "Reversing the characters in 'Python' gives 'nohtyP'",
    },
    {
      input: '"12345"',
      expectedOutput: '"54321"',
      explanation: "Reversing the characters in '12345' gives '54321'",
    },
  ],
  constraints: [
    "1 <= s.length <= 105",
    "s consists of printable ASCII characters",
  ],
  timeLimit: 500,
  memoryLimit: 128000,
  helpfulFunctions: [
    {
      name: "list()",
      description: "Converts string to list of characters",
      example: 'list("hello") → ["h","e","l","l","o"]',
    },
    {
      name: "join()",
      description: "Joins list elements into string",
      example: '"".join(["h","i"]) → "hi"',
    },
  ],
};

const twoSumChallenge: Challenge = {
  id: "5",
  title: "Two Sum",
  difficulty: DIFFICULTY.EASY,
  description: `Write a function that finds two numbers in an array that add up to a target sum.
    
Given an array of integers \`nums\` and an integer \`target\`, return indices of the two numbers such that they add up to \`target\`.
You may assume that each input would have exactly one solution, and you may not use the same element twice.
You can return the answer in any order.`,
  starterCode: `def two_sum(nums, target):
    # Your code here
    return [0, 0]

# Do not modify below this line
if __name__ == "__main__":
    nums = list(map(int, input().strip()[1:-1].split(",")))
    target = int(input().strip())
    print(two_sum(nums, target))`,
  testCases: [
    {
      input: "[2,7,11,15]\n9",
      expectedOutput: "[0, 1]",
      explanation: "nums[0] + nums[1] = 2 + 7 = 9",
    },
    {
      input: "[3,2,4]\n6",
      expectedOutput: "[1, 2]",
      explanation: "nums[1] + nums[2] = 2 + 4 = 6",
    },
    {
      input: "[3,3]\n6",
      expectedOutput: "[0, 1]",
      explanation: "nums[0] + nums[1] = 3 + 3 = 6",
    },
  ],
  constraints: [
    "2 <= nums.length <= 104",
    "-109 <= nums[i] <= 109",
    "-109 <= target <= 109",
    "Only one valid answer exists",
  ],
  timeLimit: 750,
  memoryLimit: 128000,
  helpfulFunctions: [
    {
      name: "enumerate()",
      description: "Returns index and value pairs from list",
      example: "enumerate([1,2]) → (0,1), (1,2)",
    },
    {
      name: "dict()",
      description: "Creates a dictionary for value-index mapping",
      example: "dict() → {}",
    },
  ],
};

const longestSubstringChallenge: Challenge = {
  id: "9",
  title: "Longest Substring Without Repeating Characters",
  difficulty: DIFFICULTY.MEDIUM,
  description: `Write a function that finds the length of the longest substring without repeating characters.
    
Given a string \`s\`, find the length of the longest substring without repeating characters.
A substring is a contiguous sequence of characters within the string.`,
  starterCode: `def length_of_longest_substring(s):
    # Your code here
    return 0

# Do not modify below this line
if __name__ == "__main__":
    s = input().strip()[1:-1]  # Remove quotes
    print(length_of_longest_substring(s))`,
  testCases: [
    {
      input: '"abcabcbb"',
      expectedOutput: "3",
      explanation: "The longest substring without repeating characters is 'abc', length is 3",
    },
    {
      input: '"bbbbb"',
      expectedOutput: "1",
      explanation: "The longest substring without repeating characters is 'b', length is 1",
    },
    {
      input: '"pwwkew"',
      expectedOutput: "3",
      explanation: "The longest substring without repeating characters is 'wke', length is 3",
    },
  ],
  constraints: [
    "0 <= s.length <= 5 * 104",
    "s consists of English letters, digits, symbols and spaces",
  ],
  timeLimit: 1000,
  memoryLimit: 128000,
  helpfulFunctions: [
    {
      name: "dict()",
      description: "Creates a dictionary for character position tracking",
      example: "dict() → {}",
    },
    {
      name: "max()",
      description: "Returns maximum value",
      example: "max(1, 2, 3) → 3",
    },
  ],
};

const binarySearchChallenge: Challenge = {
  id: "7",
  title: "Binary Search Implementation",
  difficulty: DIFFICULTY.EASY,
  description: `Write a function that implements binary search to find a target number in a sorted array.
    
Given a sorted array of integers \`nums\` and a target value \`target\`, return the index of \`target\` if it exists in \`nums\`, or -1 if it does not exist.
The algorithm should have a logarithmic runtime complexity.`,
  starterCode: `def binary_search(nums, target):
    # Your code here
    return -1

# Do not modify below this line
if __name__ == "__main__":
    nums = list(map(int, input().strip()[1:-1].split(",")))
    target = int(input().strip())
    print(binary_search(nums, target))`,
  testCases: [
    {
      input: "[-1,0,3,5,9,12]\n9",
      expectedOutput: "4",
      explanation: "9 exists in nums and its index is 4",
    },
    {
      input: "[-1,0,3,5,9,12]\n2",
      expectedOutput: "-1",
      explanation: "2 does not exist in nums so return -1",
    },
    {
      input: "[1]\n1",
      expectedOutput: "0",
      explanation: "Single element array, target found at index 0",
    },
  ],
  constraints: [
    "1 <= nums.length <= 104",
    "-104 <= nums[i], target <= 104",
    "All numbers in nums are unique",
    "nums is sorted in ascending order",
  ],
  timeLimit: 500,
  memoryLimit: 128000,
  helpfulFunctions: [
    {
      name: "len()",
      description: "Returns length of array",
      example: "len([1,2,3]) → 3",
    },
  ],
};

const fizzBuzzChallenge: Challenge = {
  id: "2",
  title: "FizzBuzz Classic",
  difficulty: DIFFICULTY.EASY,
  description: `Write a function that implements the classic FizzBuzz problem.
    
Given an integer \`n\`, return a list of strings where:
- For each number from 1 to n, return "FizzBuzz" if divisible by both 3 and 5
- "Fizz" if divisible by 3
- "Buzz" if divisible by 5
- The number as a string otherwise`,
  starterCode: `def fizz_buzz(n):
    # Your code here
    return []

# Do not modify below this line
if __name__ == "__main__":
    n = int(input().strip())
    print(fizz_buzz(n))`,
  testCases: [
    {
      input: "3",
      expectedOutput: "['1', '2', 'Fizz']",
      explanation: "3 is divisible by 3, so it becomes 'Fizz'",
    },
    {
      input: "5",
      expectedOutput: "['1', '2', 'Fizz', '4', 'Buzz']",
      explanation: "5 is divisible by 5, so it becomes 'Buzz'",
    },
    {
      input: "15",
      expectedOutput: "['1', '2', 'Fizz', '4', 'Buzz', 'Fizz', '7', '8', 'Fizz', 'Buzz', '11', 'Fizz', '13', '14', 'FizzBuzz']",
      explanation: "15 is divisible by both 3 and 5, so it becomes 'FizzBuzz'",
    },
  ],
  constraints: [
    "1 <= n <= 104",
  ],
  timeLimit: 500,
  memoryLimit: 128000,
  helpfulFunctions: [
    {
      name: "str()",
      description: "Converts number to string",
      example: "str(123) → '123'",
    },
  ],
};

const mergeIntervalsChallenge: Challenge = {
  id: "11",
  title: "Merge Intervals",
  difficulty: DIFFICULTY.MEDIUM,
  description: `Write a function that merges all overlapping intervals.
    
Given an array of \`intervals\` where intervals[i] = [starti, endi], merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.`,
  starterCode: `def merge(intervals):
    # Your code here
    return intervals

# Do not modify below this line
if __name__ == "__main__":
    intervals = eval(input().strip())  # Parse nested list
    print(merge(intervals))`,
  testCases: [
    {
      input: "[[1,3],[2,6],[8,10],[15,18]]",
      expectedOutput: "[[1, 6], [8, 10], [15, 18]]",
      explanation: "Intervals [1,3] and [2,6] overlap, resulting in [1,6]",
    },
    {
      input: "[[1,4],[4,5]]",
      expectedOutput: "[[1, 5]]",
      explanation: "Intervals [1,4] and [4,5] can be merged into [1,5]",
    },
    {
      input: "[[1,4],[2,3]]",
      expectedOutput: "[[1, 4]]",
      explanation: "Interval [2,3] is completely contained within [1,4]",
    },
  ],
  constraints: [
    "1 <= intervals.length <= 104",
    "intervals[i].length == 2",
    "0 <= starti <= endi <= 104",
  ],
  timeLimit: 1000,
  memoryLimit: 128000,
  helpfulFunctions: [
    {
      name: "sort()",
      description: "Sorts list in-place",
      example: "intervals.sort() → sorts by first element",
    },
  ],
};

const rotateMatrixChallenge: Challenge = {
  id: "12",
  title: "Rotate Matrix",
  difficulty: DIFFICULTY.MEDIUM,
  description: `Write a function to rotate a square matrix 90 degrees clockwise.
    
Given an n x n 2D matrix representing an image, rotate the image by 90 degrees clockwise. You have to rotate the image in-place, which means you have to modify the input 2D matrix directly.`,
  starterCode: `def rotate(matrix):
    # Your code here
    return matrix

# Do not modify below this line
if __name__ == "__main__":
    matrix = eval(input().strip())  # Parse nested list
    rotate(matrix)
    print(matrix)`,
  testCases: [
    {
      input: "[[1,2,3],[4,5,6],[7,8,9]]",
      expectedOutput: "[[7, 4, 1], [8, 5, 2], [9, 6, 3]]",
      explanation: "Rotate the matrix clockwise by 90 degrees",
    },
    {
      input: "[[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]]",
      expectedOutput: "[[15, 13, 2, 5], [14, 3, 4, 1], [12, 6, 8, 9], [16, 7, 10, 11]]",
      explanation: "Rotate the matrix clockwise by 90 degrees",
    },
    {
      input: "[[1]]",
      expectedOutput: "[[1]]",
      explanation: "Single element matrix remains unchanged",
    },
  ],
  constraints: [
    "n == matrix.length == matrix[i].length",
    "1 <= n <= 20",
    "-1000 <= matrix[i][j] <= 1000",
  ],
  timeLimit: 750,
  memoryLimit: 128000,
  helpfulFunctions: [
    {
      name: "len()",
      description: "Returns dimension of matrix",
      example: "len(matrix) → n",
    },
    {
      name: "range()",
      description: "Creates sequence of numbers",
      example: "range(n) → 0,1,...,n-1",
    },
  ],
};

const longestCommonSubsequenceChallenge: Challenge = {
  id: "13",
  title: "Longest Common Subsequence",
  difficulty: DIFFICULTY.HARD,
  description: `Write a function that finds the length of the longest common subsequence between two strings.
    
Given two strings \`text1\` and \`text2\`, return the length of their longest common subsequence. If there is no common subsequence, return 0.

A subsequence is a sequence that can be derived from another sequence by deleting some or no elements without changing the order of the remaining elements.`,
  starterCode: `def longest_common_subsequence(text1, text2):
    # Your code here
    return 0

# Do not modify below this line
if __name__ == "__main__":
    text1 = input().strip()[1:-1]  # Remove quotes
    text2 = input().strip()[1:-1]  # Remove quotes
    print(longest_common_subsequence(text1, text2))`,
  testCases: [
    {
      input: '"abcde"\n"ace"',
      expectedOutput: "3",
      explanation: "The longest common subsequence is 'ace' with length 3",
    },
    {
      input: '"abc"\n"abc"',
      expectedOutput: "3",
      explanation: "The longest common subsequence is 'abc' with length 3",
    },
    {
      input: '"abc"\n"def"',
      expectedOutput: "0",
      explanation: "There is no common subsequence",
    },
  ],
  constraints: [
    "1 <= text1.length, text2.length <= 1000",
    "text1 and text2 consist of only lowercase English characters",
  ],
  timeLimit: 1000,
  memoryLimit: 128000,
  helpfulFunctions: [
    {
      name: "max()",
      description: "Returns maximum of two numbers",
      example: "max(2,3) → 3",
    },
  ],
};

const minWindowSubstringChallenge: Challenge = {
  id: "15",
  title: "Minimum Window Substring",
  difficulty: DIFFICULTY.HARD,
  description: `Write a function that finds the minimum window substring.
    
Given two strings \`s\` and \`t\`, return the minimum window substring of \`s\` such that every character in \`t\` (including duplicates) is included in the window. If there is no such substring, return the empty string "".

The testcases will be generated such that the answer is unique.`,
  starterCode: `def min_window(s, t):
    # Your code here
    return ""

# Do not modify below this line
if __name__ == "__main__":
    s = input().strip()[1:-1]  # Remove quotes
    t = input().strip()[1:-1]  # Remove quotes
    print(f'"{min_window(s, t)}"')`,
  testCases: [
    {
      input: '"ADOBECODEBANC"\n"ABC"',
      expectedOutput: '"BANC"',
      explanation: "The minimum window substring 'BANC' contains all characters from 'ABC'",
    },
    {
      input: '"a"\n"a"',
      expectedOutput: '"a"',
      explanation: "The entire string is the minimum window",
    },
    {
      input: '"a"\n"aa"',
      expectedOutput: '""',
      explanation: "No substring contains all required characters",
    },
  ],
  constraints: [
    "1 <= s.length, t.length <= 105",
    "s and t consist of uppercase and lowercase English letters",
  ],
  timeLimit: 1000,
  memoryLimit: 128000,
  helpfulFunctions: [
    {
      name: "Counter()",
      description: "Creates character frequency counter",
      example: "Counter('ABC') → {'A':1,'B':1,'C':1}",
    },
    {
      name: "defaultdict()",
      description: "Dictionary with default value",
      example: "defaultdict(int) → {key:0 by default}",
    },
  ],
};

// Export the challenges array
export const sampleChallenges: Challenge[] = [
  sumNumbersChallenge,
  fizzBuzzChallenge,
  twoSumChallenge,
  longestSubstringChallenge,
  rotateMatrixChallenge,
];
