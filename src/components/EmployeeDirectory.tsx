import { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import { supabase } from '../lib/supabase';

export function EmployeeDirectory() {
  const [employees, setEmployees] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEmployees() {
      setLoading(true);
      const { data, error } = await supabase
        .from('employees')
        .select('*');

      if (error) {
        console.error('Error fetching employees from Supabase:', error);
      } else {
        setEmployees(data || []);
      }
      setLoading(false);
    }

    fetchEmployees();
  }, []);

  // Filter logic across Name, Role, Department, and Skills
  const filteredEmployees = employees.filter((emp) => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return true;

    const nameMatch = emp.name?.toLowerCase().includes(query);
    const roleMatch = emp.role?.toLowerCase().includes(query);
    const deptMatch = emp.department?.toLowerCase().includes(query);
    const skillMatch = Array.isArray(emp.skills)
      ? emp.skills.some((s: string) => s.toLowerCase().includes(query))
      : emp.skills?.toLowerCase().includes(query);

    return nameMatch || roleMatch || deptMatch || skillMatch;
  });

  // Explicit separation
  const leadershipEmployees = filteredEmployees.filter((emp) =>
    emp.department?.toLowerCase().includes('leadership')
  );

  const regularEmployees = filteredEmployees.filter(
    (emp) => !emp.department?.toLowerCase().includes('leadership')
  );

  return (
    <div className="w-full max-w-7xl mx-auto py-6 px-2 sm:px-6">
      {/* Search Bar */}
      <div className="w-full max-w-md mr-auto mb-8 -ml-3 sm:-ml-6">
        <div className="relative flex items-center">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-carbon/40" />
          <input
            type="text"
            placeholder="Search by name, role, department, or skill..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-line bg-paper pl-10 pr-4 py-2.5 text-sm text-carbon focus:border-ink focus:outline-none transition-all"
          />
        </div>
      </div>

      {loading ? (
        <p className="text-sm text-carbon/60">Loading employees from Supabase...</p>
      ) : filteredEmployees.length === 0 ? (
        <p className="text-sm text-carbon/60">No employees found.</p>
      ) : (
        /* Outer Layout Split */
        <div className="flex flex-col lg:flex-row gap-8 items-start relative">
          
          {/* 1. LARGE PINNED LEADERSHIP COLUMN */}
          {leadershipEmployees.length > 0 && (
            <div className="w-full lg:w-96 shrink-0 lg:sticky lg:top-6 self-start flex flex-col gap-4 z-10">
              <h2 className="text-xs font-bold uppercase tracking-wider text-carbon/50 pl-1">
                Leadership
              </h2>

              {leadershipEmployees.map((emp) => (
                <div
                  key={emp.id || emp.name}
                  className="p-6 border-2 border-ink/40 rounded-3xl bg-paper flex flex-col items-center text-center gap-4 shadow-md relative overflow-hidden"
                >
                  <div className="bg-ink text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    Leadership
                  </div>

                  {/* HUGE PHOTO: h-36 w-36 (144px x 144px) */}
                  {emp.photoURL ? (
                    <img
                      src={emp.photoURL}
                      alt={emp.name}
                      className="h-36 w-36 rounded-2xl object-cover border-2 border-ink/20 shadow-sm"
                    />
                  ) : (
                    <div className="flex h-36 w-36 shrink-0 items-center justify-center rounded-2xl bg-ink text-white font-bold text-4xl shadow-sm">
                      {emp.name ? emp.name.slice(0, 2).toUpperCase() : 'LD'}
                    </div>
                  )}

                  <div>
                    <h3 className="font-extrabold text-carbon text-xl">{emp.name}</h3>
                    <p className="text-base font-semibold text-ink mt-1">{emp.role}</p>
                    {emp.skills && (
                      <p className="text-xs text-carbon/60 mt-3 bg-ink/5 px-3 py-1.5 rounded-xl">
                        Skills: {Array.isArray(emp.skills) ? emp.skills.join(', ') : emp.skills}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* 2. SMALL COMPACT OTHER DEPARTMENTS GRID */}
          <div className="w-full flex-1 min-w-0">
            {regularEmployees.length > 0 && (
              <>
                <h2 className="text-xs font-bold uppercase tracking-wider text-carbon/50 mb-4 pl-1">
                  Other Departments
                </h2>
                
                {/* 3 Columns Grid for max compact display */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {regularEmployees.map((emp) => (
                    <div
                      key={emp.id || emp.name}
                      className="p-2.5 border border-line rounded-lg bg-paper flex items-center gap-3 shadow-sm"
                    >
                      {/* MICRO PHOTO: h-10 w-10 (40px x 40px) */}
                      {emp.photoURL ? (
                        <img
                          src={emp.photoURL}
                          alt={emp.name}
                          className="h-10 w-10 rounded-full object-cover border border-line shrink-0"
                        />
                      ) : (
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ink/10 text-carbon font-bold text-xs">
                          {emp.name ? emp.name.slice(0, 2).toUpperCase() : 'EM'}
                        </div>
                      )}

                      <div className="min-w-0 overflow-hidden">
                        <h3 className="font-bold text-carbon text-xs truncate leading-tight">
                          {emp.name}
                        </h3>
                        <p className="text-xs text-carbon/60 truncate leading-tight mt-0.5">
                          {emp.role} {emp.department ? `• ${emp.department}` : ''}
                        </p>
                        {emp.skills && (
                          <p className="text-[11px] text-carbon/40 truncate leading-tight mt-0.5">
                            {Array.isArray(emp.skills) ? emp.skills.join(', ') : emp.skills}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

        </div>
      )}
    </div>
  );
}