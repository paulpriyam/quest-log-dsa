export interface DSAProblem {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  url: string;
  tags: string[];
  company: string;
  duration: string;
  completed?: boolean;
  completedAt?: string;
}

export interface CompletionData {
  date: string;
  count: number;
}

export interface ProgressStats {
  totalProblems: number;
  completedProblems: number;
  streak: number;
  currentWeekCount: number;
  currentMonthCount: number;
  currentYearCount: number;
  weeklyData: CompletionData[];
  yearlyData: CompletionData[];
}

export interface Company {
  name: string;
  count: number;
}

export interface FilterOptions {
  company: string;
  difficulty: string;
  duration: string;
  showCompleted: boolean;
}