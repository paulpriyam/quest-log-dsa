// Utility functions to fetch data from GitHub API
interface GitHubApiItem {
  name: string;
  type: 'dir' | 'file';
}

export const fetchCompaniesFromGitHub = async (): Promise<string[]> => {
  try {
    const response = await fetch('https://api.github.com/repos/liquidslr/leetcode-company-wise-problems/contents');
    const data: GitHubApiItem[] = await response.json();
    
    // Filter only directories (companies) and exclude non-company files
    const companies = data
      .filter(item => item.type === 'dir')
      .map(item => item.name)
      .sort();
      
    return companies;
  } catch (error) {
    console.error('Failed to fetch companies from GitHub:', error);
    // Fallback to some major companies if API fails
    return [
      'Google', 'Amazon', 'Microsoft', 'Apple', 'Facebook', 
      'Netflix', 'Adobe', 'Airbnb', 'Uber', 'LinkedIn'
    ];
  }
};

export const generateRealProgressData = (completedProblems: Record<string, { completed: boolean; completedAt?: string }>) => {
  const data = [];
  const today = new Date();
  
  // Create a map of dates to problem counts
  const dateCountMap: Record<string, number> = {};
  
  // Count completed problems by date
  Object.values(completedProblems).forEach(problem => {
    if (problem.completed && problem.completedAt) {
      const date = new Date(problem.completedAt).toISOString().split('T')[0];
      dateCountMap[date] = (dateCountMap[date] || 0) + 1;
    }
  });
  
  // Generate last 365 days with actual completion data
  for (let i = 364; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateString = date.toISOString().split('T')[0];
    
    data.push({
      date: dateString,
      count: dateCountMap[dateString] || 0
    });
  }
  
  return data;
};