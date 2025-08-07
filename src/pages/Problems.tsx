import { useState, useMemo } from 'react';
import Navigation from '@/components/layout/Navigation';
import ProblemFilters from '@/components/problems/ProblemFilters';
import ProblemList from '@/components/problems/ProblemList';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { mockProblems, mockCompanies } from '@/data/mockData';
import { FilterOptions, DSAProblem } from '@/types/dsa';

const Problems = () => {
  const [completedProblems, setCompletedProblems] = useLocalStorage<Record<string, { completed: boolean; completedAt?: string }>>('dsa-progress', {});
  
  const [filters, setFilters] = useState<FilterOptions>({
    company: 'all',
    difficulty: 'all',
    duration: 'all',
    showCompleted: true
  });

  const filteredProblems = useMemo(() => {
    let filtered = mockProblems.map(problem => ({
      ...problem,
      completed: completedProblems[problem.id]?.completed || false,
      completedAt: completedProblems[problem.id]?.completedAt
    }));

    if (filters.company !== 'all') {
      filtered = filtered.filter(p => p.company === filters.company);
    }

    if (filters.difficulty !== 'all') {
      filtered = filtered.filter(p => p.difficulty === filters.difficulty);
    }

    if (filters.duration !== 'all') {
      filtered = filtered.filter(p => p.duration === filters.duration);
    }

    if (!filters.showCompleted) {
      filtered = filtered.filter(p => !p.completed);
    }

    return filtered;
  }, [filters, completedProblems]);

  const handleToggleComplete = (problemId: string) => {
    setCompletedProblems(prev => ({
      ...prev,
      [problemId]: {
        completed: !prev[problemId]?.completed,
        completedAt: !prev[problemId]?.completed ? new Date().toISOString() : undefined
      }
    }));
  };

  const handleResetFilters = () => {
    setFilters({
      company: 'all',
      difficulty: 'all',
      duration: 'all',
      showCompleted: true
    });
  };

  return (
    <>
      <Navigation />
      <div className="container mx-auto px-4 py-8 space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">DSA Problems</h1>
          <p className="text-muted-foreground">
            Browse and solve problems from top tech companies
          </p>
        </div>

        <ProblemFilters
          filters={filters}
          companies={mockCompanies}
          onFiltersChange={setFilters}
          onReset={handleResetFilters}
        />

        <div className="text-sm text-muted-foreground">
          Showing {filteredProblems.length} problems
        </div>

        <ProblemList 
          problems={filteredProblems}
          onToggleComplete={handleToggleComplete}
        />
      </div>
    </>
  );
};

export default Problems;