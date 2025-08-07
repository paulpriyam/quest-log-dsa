import { CompletionData } from '@/types/dsa';
import { cn } from '@/lib/utils';

interface ProgressCalendarProps {
  data: CompletionData[];
  title: string;
}

const ProgressCalendar = ({ data, title }: ProgressCalendarProps) => {
  const getIntensityColor = (count: number) => {
    if (count === 0) return 'bg-muted';
    if (count <= 2) return 'bg-green-200 dark:bg-green-900';
    if (count <= 5) return 'bg-green-300 dark:bg-green-800';
    if (count <= 10) return 'bg-green-400 dark:bg-green-700';
    return 'bg-green-500 dark:bg-green-600';
  };

  // Generate last 365 days of data
  const generateYearData = () => {
    const result = [];
    const today = new Date();
    
    for (let i = 364; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateString = date.toISOString().split('T')[0];
      
      const existingData = data.find(d => d.date === dateString);
      result.push({
        date: dateString,
        count: existingData?.count || 0
      });
    }
    
    return result;
  };

  const yearData = generateYearData();
  
  // Group by weeks (7 columns)
  const weeks = [];
  for (let i = 0; i < yearData.length; i += 7) {
    weeks.push(yearData.slice(i, i + 7));
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      <div className="overflow-x-auto">
        <div className="grid grid-flow-col gap-1 min-w-fit">
          {weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="grid grid-rows-7 gap-1">
              {week.map((day, dayIndex) => (
                <div
                  key={`${weekIndex}-${dayIndex}`}
                  className={cn(
                    "w-3 h-3 rounded-sm border border-border",
                    getIntensityColor(day.count)
                  )}
                  title={`${day.date}: ${day.count} problems solved`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span>Less</span>
        <div className="flex gap-1">
          <div className="w-3 h-3 rounded-sm bg-muted border border-border" />
          <div className="w-3 h-3 rounded-sm bg-green-200 dark:bg-green-900 border border-border" />
          <div className="w-3 h-3 rounded-sm bg-green-300 dark:bg-green-800 border border-border" />
          <div className="w-3 h-3 rounded-sm bg-green-400 dark:bg-green-700 border border-border" />
          <div className="w-3 h-3 rounded-sm bg-green-500 dark:bg-green-600 border border-border" />
        </div>
        <span>More</span>
      </div>
    </div>
  );
};

export default ProgressCalendar;