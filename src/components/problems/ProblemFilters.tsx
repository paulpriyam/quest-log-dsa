import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { FilterOptions, Company } from '@/types/dsa';
import { RotateCcw } from 'lucide-react';

interface ProblemFiltersProps {
  filters: FilterOptions;
  companies: Company[];
  onFiltersChange: (filters: FilterOptions) => void;
  onReset: () => void;
}

const ProblemFilters = ({ filters, companies, onFiltersChange, onReset }: ProblemFiltersProps) => {
  const difficulties = ['Easy', 'Medium', 'Hard'];
  const durations = ['30 days', 'three months', 'six months', 'more than six months', 'all'];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 p-4 bg-card rounded-lg border">
      <div className="space-y-2">
        <Label>Company</Label>
        <Select 
          value={filters.company} 
          onValueChange={(value) => onFiltersChange({ ...filters, company: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="All Companies" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Companies</SelectItem>
            {companies.map((company) => (
              <SelectItem key={company.name} value={company.name}>
                {company.name} ({company.count})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Difficulty</Label>
        <Select 
          value={filters.difficulty} 
          onValueChange={(value) => onFiltersChange({ ...filters, difficulty: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="All Difficulties" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Difficulties</SelectItem>
            {difficulties.map((difficulty) => (
              <SelectItem key={difficulty} value={difficulty}>
                {difficulty}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Duration</Label>
        <Select 
          value={filters.duration} 
          onValueChange={(value) => onFiltersChange({ ...filters, duration: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="All Durations" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Durations</SelectItem>
            {durations.map((duration) => (
              <SelectItem key={duration} value={duration}>
                {duration}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Status</Label>
        <div className="flex items-center space-x-2 h-10">
          <Switch
            id="show-completed"
            checked={filters.showCompleted}
            onCheckedChange={(checked) => onFiltersChange({ ...filters, showCompleted: checked })}
          />
          <Label htmlFor="show-completed" className="text-sm">
            Show Completed
          </Label>
        </div>
      </div>

      <div className="space-y-2">
        <Label>&nbsp;</Label>
        <Button variant="outline" onClick={onReset} className="w-full">
          <RotateCcw className="h-4 w-4 mr-2" />
          Reset
        </Button>
      </div>
    </div>
  );
};

export default ProblemFilters;