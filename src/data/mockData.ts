import { DSAProblem, Company } from '@/types/dsa';
import { fetchCompaniesFromGitHub } from '@/utils/githubApi';

// Cache for companies data
let companiesCache: Company[] | null = null;

// Mock data representing problems from different companies
export const mockProblems: DSAProblem[] = [
  {
    id: '1',
    title: 'Two Sum',
    difficulty: 'Easy',
    url: 'https://leetcode.com/problems/two-sum/',
    tags: ['Array', 'Hash Table'],
    company: 'Google',
    duration: '30 days'
  },
  {
    id: '2',
    title: 'Add Two Numbers',
    difficulty: 'Medium',
    url: 'https://leetcode.com/problems/add-two-numbers/',
    tags: ['Linked List', 'Math'],
    company: 'Amazon',
    duration: 'three months'
  },
  {
    id: '3',
    title: 'Longest Substring Without Repeating Characters',
    difficulty: 'Medium',
    url: 'https://leetcode.com/problems/longest-substring-without-repeating-characters/',
    tags: ['Hash Table', 'String', 'Sliding Window'],
    company: 'Microsoft',
    duration: '30 days'
  },
  {
    id: '4',
    title: 'Median of Two Sorted Arrays',
    difficulty: 'Hard',
    url: 'https://leetcode.com/problems/median-of-two-sorted-arrays/',
    tags: ['Array', 'Binary Search', 'Divide and Conquer'],
    company: 'Apple',
    duration: 'six months'
  },
  {
    id: '5',
    title: 'Longest Palindromic Substring',
    difficulty: 'Medium',
    url: 'https://leetcode.com/problems/longest-palindromic-substring/',
    tags: ['String', 'Dynamic Programming'],
    company: 'Facebook',
    duration: 'three months'
  },
  {
    id: '6',
    title: 'ZigZag Conversion',
    difficulty: 'Medium',
    url: 'https://leetcode.com/problems/zigzag-conversion/',
    tags: ['String'],
    company: 'Google',
    duration: '30 days'
  },
  {
    id: '7',
    title: 'Reverse Integer',
    difficulty: 'Medium',
    url: 'https://leetcode.com/problems/reverse-integer/',
    tags: ['Math'],
    company: 'Amazon',
    duration: '30 days'
  },
  {
    id: '8',
    title: 'String to Integer (atoi)',
    difficulty: 'Medium',
    url: 'https://leetcode.com/problems/string-to-integer-atoi/',
    tags: ['String'],
    company: 'Microsoft',
    duration: 'three months'
  },
  {
    id: '9',
    title: 'Palindrome Number',
    difficulty: 'Easy',
    url: 'https://leetcode.com/problems/palindrome-number/',
    tags: ['Math'],
    company: 'Apple',
    duration: '30 days'
  },
  {
    id: '10',
    title: 'Regular Expression Matching',
    difficulty: 'Hard',
    url: 'https://leetcode.com/problems/regular-expression-matching/',
    tags: ['String', 'Dynamic Programming', 'Recursion'],
    company: 'Facebook',
    duration: 'more than six months'
  }
];

export const getCompanies = async (): Promise<Company[]> => {
  if (companiesCache) {
    return companiesCache;
  }
  
  try {
    const companyNames = await fetchCompaniesFromGitHub();
    companiesCache = companyNames.map(name => ({
      name,
      count: mockProblems.filter(p => p.company === name).length || 1 // Default count of 1 if no problems found
    }));
    return companiesCache;
  } catch (error) {
    console.error('Failed to fetch companies:', error);
    // Fallback companies
    return [
      { name: 'Google', count: 2 },
      { name: 'Amazon', count: 2 },
      { name: 'Microsoft', count: 2 },
      { name: 'Apple', count: 2 },
      { name: 'Facebook', count: 2 },
    ];
  }
};

// For backward compatibility - will be populated after first call to getCompanies
export const mockCompanies: Company[] = [];

// This function is deprecated - use generateRealProgressData from githubApi utils instead
export const generateMockCompletionData = () => {
  console.warn('generateMockCompletionData is deprecated. Use generateRealProgressData from githubApi utils.');
  const data = [];
  const today = new Date();
  
  for (let i = 0; i < 365; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateString = date.toISOString().split('T')[0];
    
    // Randomly generate 0-15 problems solved per day (more realistic distribution)
    const count = Math.random() < 0.7 ? 0 : Math.floor(Math.random() * 15);
    
    data.push({
      date: dateString,
      count
    });
  }
  
  return data.reverse();
};