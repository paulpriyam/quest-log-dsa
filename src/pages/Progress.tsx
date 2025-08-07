import { useMemo } from 'react';
import Navigation from '@/components/layout/Navigation';
import ProgressStats from '@/components/progress/ProgressStats';
import ProgressCalendar from '@/components/progress/ProgressCalendar';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { mockProblems, generateMockCompletionData } from '@/data/mockData';
import { DSAProblem, ProgressStats as IProgressStats } from '@/types/dsa';

const Progress = () => {
  const [completedProblems] = useLocalStorage<Record<string, { completed: boolean; completedAt?: string }>>('dsa-progress', {});
  
  const completionData = useMemo(() => generateMockCompletionData(), []);
  
  const stats: IProgressStats = useMemo(() => {
    const completed = Object.values(completedProblems).filter(p => p.completed).length;
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());
    const startOfYear = new Date(today.getFullYear(), 0, 1);
    
    // Calculate streak
    let streak = 0;
    const sortedData = [...completionData].reverse();
    for (const day of sortedData) {
      if (day.count > 0) {
        streak++;
      } else {
        break;
      }
    }
    
    // Calculate weekly and yearly counts
    const weeklyCount = completionData
      .filter(d => new Date(d.date) >= startOfWeek && new Date(d.date) <= today)
      .reduce((sum, d) => sum + d.count, 0);
    
    const yearlyCount = completionData
      .filter(d => new Date(d.date) >= startOfYear)
      .reduce((sum, d) => sum + d.count, 0);
    
    return {
      totalProblems: mockProblems.length,
      completedProblems: completed,
      streak,
      currentWeekCount: weeklyCount,
      currentMonthCount: yearlyCount, // Using yearly for monthly for simplicity
      currentYearCount: yearlyCount,
      weeklyData: completionData.slice(-7),
      yearlyData: completionData
    };
  }, [completedProblems, completionData]);

  return (
    <>
      <Navigation />
      <div className="container mx-auto px-4 py-8 space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Your Progress</h1>
          <p className="text-muted-foreground">Track your DSA problem-solving journey</p>
        </div>
        
        <ProgressStats stats={stats} />
        
        <ProgressCalendar 
          data={stats.yearlyData} 
          title="Yearly Progress" 
        />
      </div>
    </>
  );
};

export default Progress;