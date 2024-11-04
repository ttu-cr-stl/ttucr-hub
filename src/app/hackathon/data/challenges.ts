import { Challenge } from "../types";

export const sampleChallenges: Challenge[] = [
  {
    id: "1",
    title: "Sum of Numbers",
    difficulty: "Easy",
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
        example: "sum([1,2,3]) → 6"
      }
    ],
  },
  {
    id: "2",
    title: "Valid Palindrome",
    difficulty: "Easy",
    description: `A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward.

Given a string \`s\`, return \`True\` if it is a palindrome, or \`False\` otherwise.`,
    starterCode: `def is_palindrome(s):
    # Your code here
    return False

# Do not modify below this line
if __name__ == "__main__":
    s = input().strip()
    print(is_palindrome(s))`,
    testCases: [
      {
        input: "race a car",
        expectedOutput: "False",
        explanation:
          "After transformations, the string does not read the same forward and backward.",
      },
      {
        input: " ",
        expectedOutput: "True",
        explanation:
          "After removing non-alphanumeric characters, the string is empty which is considered a palindrome.",
      },
    ],
    constraints: [
      "1 <= s.length <= 2 * 10^5",
      "s consists only of printable ASCII characters",
    ],
    timeLimit: 2000,
    memoryLimit: 128000,
    helpfulFunctions: [
      {
        name: "str.lower()",
        description: "Converts string to lowercase",
        example: "'Hello'.lower() → 'hello'"
      },
      {
        name: "str.isalnum()",
        description: "Returns True if string contains only alphanumeric characters",
        example: "'A1'.isalnum() → True"
      },
      {
        name: "str.strip()",
        description: "Removes leading and trailing whitespace",
        example: "' hello '.strip() → 'hello'"
      }
    ],
  },
  {
    id: "3",
    title: "Group Anagrams",
    difficulty: "Medium",
    description: `Given an array of strings \`strs\`, group the anagrams together and return them in any order.

An anagram is a word formed by rearranging the letters of another word, using all the original letters exactly once.`,
    starterCode: `def group_anagrams(strs):
    # Your code here
    return []

# Do not modify below this line
if __name__ == "__main__":
    strs = input().strip()[1:-1].split(",")
    strs = [s.strip('"') for s in strs]
    result = group_anagrams(strs)
    # Format output as sorted string representation
    print(sorted([''.join(sorted(group)) for group in result]))`,
    testCases: [
      {
        input: '["eat","tea","tan","ate","nat","bat"]',
        expectedOutput: '["aet","aet","aet","ant","ant","abt"]',
        explanation: 'Groups are ["eat","tea","ate"], ["tan","nat"], ["bat"]',
      },
      {
        input: '[""]',
        expectedOutput: '[""]',
        explanation: "Single empty string",
      },
      {
        input: '["a","b","c"]',
        expectedOutput: '["a","b","c"]',
        explanation: "No anagrams present",
      },
    ],
    constraints: [
      "1 <= strs.length <= 104",
      "0 <= strs[i].length <= 100",
      "strs[i] consists of lowercase English letters",
    ],
    timeLimit: 3000,
    memoryLimit: 128000,
    helpfulFunctions: [
      {
        name: "sorted()",
        description: "Returns sorted version of iterable",
        example: "sorted('hello') → ['e','h','l','l','o']"
      },
      {
        name: "defaultdict()",
        description: "Dictionary with default factory",
        example: "from collections import defaultdict"
      }
    ],
  },
  {
    id: "4",
    title: "Word Break",
    difficulty: "Hard",
    description: `Given a string \`s\` and a dictionary of strings \`wordDict\`, return \`True\` if \`s\` can be segmented into a space-separated sequence of one or more dictionary words, \`False\` otherwise.

Note that the same word in the dictionary may be reused multiple times in the segmentation.`,
    starterCode: `def word_break(s: str, wordDict: list[str]) -> bool:
    # Your code here
    return False

# Do not modify below this line
if __name__ == "__main__":
    s = input().strip()
    wordDict = eval(input().strip())
    print(str(word_break(s, wordDict)).lower())`,
    testCases: [
      {
        input: 'leetcode\n["leet","code"]',
        expectedOutput: "true",
        explanation: 'Return true because "leetcode" can be segmented as "leet code"',
      },
      {
        input: 'applepenapple\n["apple","pen"]',
        expectedOutput: "true",
        explanation: 'Return true because "applepenapple" can be segmented as "apple pen apple"',
      },
      {
        input: 'catsandog\n["cats","dog","sand","and","cat"]',
        expectedOutput: "false",
        explanation: 'Cannot be segmented into dictionary words',
      },
    ],
    constraints: [
      "1 <= s.length <= 300",
      "1 <= wordDict.length <= 1000",
      "1 <= wordDict[i].length <= 20",
      "s and wordDict[i] consist of only lowercase English letters",
    ],
    timeLimit: 4000,
    memoryLimit: 256000,
    helpfulFunctions: [
      {
        name: "str.startswith()",
        description: "Check if string starts with prefix",
        example: "'hello'.startswith('he') → True"
      },
      {
        name: "@cache",
        description: "Function decorator for memoization",
        example: "from functools import cache"
      }
    ],
  },
  {
    id: "5",
    title: "Regular Expression Matching",
    difficulty: "Hard",
    description: `Given an input string \`s\` and a pattern \`p\`, implement regular expression matching with support for '.' and '*' where:

- '.' Matches any single character
- '*' Matches zero or more of the preceding element

The matching should cover the entire input string (not partial).`,
    starterCode: `def is_match(s: str, p: str) -> bool:
    # Your code here
    return False

# Do not modify below this line
if __name__ == "__main__":
    s = input().strip()
    p = input().strip()
    print(str(is_match(s, p)).lower())`,
    testCases: [
      {
        input: 'aa\na*',
        expectedOutput: "true",
        explanation: "'a*' matches the entire string 'aa'",
      },
      {
        input: 'mississippi\nmis*is*p*.',
        expectedOutput: "false",
        explanation: "Pattern cannot match the entire string",
      },
      {
        input: 'ab\n.*',
        expectedOutput: "true",
        explanation: "'.*' matches any sequence of characters",
      },
    ],
    constraints: [
      "1 <= s.length <= 20",
      "1 <= p.length <= 20",
      "s contains only lowercase English letters",
      "p contains only lowercase English letters, '.', and '*'",
    ],
    timeLimit: 5000,
    memoryLimit: 256000,
    helpfulFunctions: [
      {
        name: "str[i]",
        description: "Access character at index",
        example: "'hello'[0] → 'h'"
      },
      {
        name: "@cache",
        description: "Function decorator for memoization",
        example: "from functools import cache"
      }
    ],
  },
];
