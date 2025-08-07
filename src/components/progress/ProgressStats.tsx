import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ProgressStats as IProgressStats } from '@/types/dsa';
import { TrendingUp, Target, Calendar, Award } from 'lucide-react';

interface ProgressStatsProps {
  stats: IProgressStats;
}

const ProgressStats = ({ stats }: ProgressStatsProps) => {
  const completionRate = stats.totalProblems > 0 
    ? Math.round((stats.completedProblems / stats.totalProblems) * 100)
    : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Solved</CardTitle>
          <Target className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.completedProblems}</div>
          <p className="text-xs text-muted-foreground">
            out of {stats.totalProblems} problems ({completionRate}%)
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.streak}</div>
          <p className="text-xs text-muted-foreground">
            days in a row
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">This Week</CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.currentWeekCount}</div>
          <p className="text-xs text-muted-foreground">
            problems solved
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">This Year</CardTitle>
          <Award className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.currentYearCount}</div>
          <p className="text-xs text-muted-foreground">
            problems solved
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProgressStats;