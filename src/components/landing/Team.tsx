import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Reveal from "@/components/motion/Reveal";
import {
  Employee,
  getStoredTeamMembers,
  saveStoredTeamMembers,
  resetTeamToDefault,
} from "@/data/teamData";
import { fetchTeam, addEmployee, updateEmployee, deleteEmployee } from "@/lib/teamService";
import EmployeeDetailModal from "./EmployeeDetailModal";
import EmployeeFormModal from "./EmployeeFormModal";
import HRAccessModal from "./HRAccessModal";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import {
  UserPlus,
  Shield,
  ShieldCheck,
  Edit2,
  Trash2,
  ArrowUpRight,
  Sparkles,
  RotateCcw,
  Users,
  Search,
  Filter,
} from "lucide-react";

const DEPARTMENTS = [
  "All",
  "Leadership",
  "AI & Research",
  "Engineering",
  "Design & UX",
  "People & Ops",
] as const;

export default function Team() {
  const { isHR } = useAuth();
  const { toast } = useToast();

  const [team, setTeam] = useState<Employee[]>([]);
  const [selectedDept, setSelectedDept] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Modals state
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [isHRAccessOpen, setIsHRAccessOpen] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const members = await fetchTeam();
        if (cancelled) return;
        setTeam(members);
        saveStoredTeamMembers(members);
      } catch {
        if (cancelled) return;
        setTeam(getStoredTeamMembers());
        toast({
          title: "Could not load team",
          description: "Showing locally saved directory if available. Check Supabase setup, then refresh.",
        });
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [toast]);

  // Filtered roster
  const filteredTeam = team.filter((member) => {
    const matchesDept = selectedDept === "All" || member.department === selectedDept;
    const matchesSearch =
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (member.skills && member.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase())));
    return matchesDept && matchesSearch;
  });

  const handleCardClick = (employee: Employee) => {
    setSelectedEmployee(employee);
    setIsDetailOpen(true);
  };

  const handleOpenAddForm = () => {
    if (!isHR) {
      setIsHRAccessOpen(true);
      return;
    }
    setEditingEmployee(null);
    setIsFormOpen(true);
  };

  const handleOpenEditForm = (e: React.MouseEvent, employee: Employee) => {
    e.stopPropagation();
    if (!isHR) {
      setIsHRAccessOpen(true);
      return;
    }
    setEditingEmployee(employee);
    setIsFormOpen(true);
  };

  const handleDeleteEmployee = async (e: React.MouseEvent, id: string, name: string) => {
    e.stopPropagation();
    if (!isHR) {
      setIsHRAccessOpen(true);
      return;
    }
    if (window.confirm(`Are you sure you want to remove ${name} from the team directory?`)) {
      try {
        await deleteEmployee(id);
        setTeam((prev) => {
          const updated = prev.filter((m) => m.id !== id);
          saveStoredTeamMembers(updated);
          return updated;
        });
        toast({
          title: "Employee Removed",
          description: `${name} has been removed from directory.`,
        });
      } catch {
        toast({
          title: "Remove failed",
          description: "Could not delete this employee. Please try again.",
        });
      }
    }
  };

  const handleSaveEmployee = async (emp: Employee) => {
    const exists = Boolean(emp.id) && team.some((m) => m.id === emp.id);
    if (exists) {
      const saved = await updateEmployee(emp);
      setTeam((prev) => {
        const updated = prev.map((m) => (m.id === saved.id ? saved : m));
        saveStoredTeamMembers(updated);
        return updated;
      });
    } else {
      const saved = await addEmployee(emp);
      setTeam((prev) => {
        const updated = [saved, ...prev];
        saveStoredTeamMembers(updated);
        return updated;
      });
    }
  };

  const handleResetDefaults = async () => {
    if (window.confirm("Reload the team directory from the database?")) {
      try {
        resetTeamToDefault();
        const reset = await fetchTeam();
        setTeam(reset);
        saveStoredTeamMembers(reset);
        toast({
          title: "Directory Reloaded",
          description: "Team directory refreshed from the database.",
        });
      } catch {
        toast({
          title: "Reload failed",
          description: "Could not refresh the team directory.",
        });
      }
    }
  };

  return (
    <section id="team" className="relative z-10 px-6 md:px-10 py-32 md:py-40">
      <div className="mx-auto max-w-[96rem]">
        {/* Section Top Header Meta */}
        <Reveal blur={false}>
          <div className="mb-4 flex items-end justify-between border-b border-line pb-4">
            <p className="label-mono text-ink">06 — Team</p>
            <div className="flex items-center gap-4">
              <p className="label-mono hidden sm:block text-carbon/40">
                {team.length} members · core collective
              </p>
              {/* HR Access / Status Button */}
              <button
                onClick={() => setIsHRAccessOpen(true)}
                className={`label-mono flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] border transition-colors ${
                  isHR
                    ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 font-semibold"
                    : "border-line bg-background text-carbon/50 hover:border-ink hover:text-ink"
                }`}
                title={isHR ? "HR Mode Active" : "Click to authenticate as HR"}
              >
                {isHR ? (
                  <>
                    <ShieldCheck className="h-3 w-3 text-emerald-600" />
                    <span>HR Active</span>
                  </>
                ) : (
                  <>
                    <Shield className="h-3 w-3 text-carbon/40" />
                    <span>HR Access</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </Reveal>

        {/* Monumental Headline */}
        <div className="grid gap-12 lg:grid-cols-12 mb-16">
          <div className="lg:col-span-6">
            <Reveal blur={false} delay={0.1}>
              <h2 className="font-display text-5xl sm:text-6xl md:text-7xl font-bold uppercase tracking-[-0.02em] text-carbon leading-[0.95]">
                Meet our<br />team<span className="text-ink">.</span>
              </h2>
            </Reveal>
          </div>

          <div className="lg:col-span-6 flex flex-col justify-end">
            <Reveal blur={false} delay={0.2}>
              <p className="text-lg sm:text-xl leading-relaxed text-carbon/70 max-w-xl">
                The architects, AI researchers, and engineers building the future of intelligent systems.
                Click on any profile to explore their role, competencies, and active initiatives.
              </p>
            </Reveal>
          </div>
        </div>

        {/* HR Toolbar (if active) */}
        {isHR && (
          <Reveal blur={false} delay={0.15}>
            <div className="mb-10 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-ink/20 bg-ink-soft p-4 md:p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-ink text-white">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-display text-base font-bold text-carbon">
                    HR Directory Management Console
                  </h4>
                  <p className="text-xs text-carbon/60">
                    You have verified authority to insert, edit, and curate employee profiles and photographs.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleResetDefaults}
                  className="label-mono flex items-center gap-1.5 rounded-xl border border-line bg-paper px-3 py-2 text-xs text-carbon/60 hover:text-ink hover:border-ink transition-colors"
                  title="Reset team to initial data"
                >
                  <RotateCcw className="h-3 w-3" />
                  <span>Reset Defaults</span>
                </button>

                <button
                  onClick={handleOpenAddForm}
                  className="flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 font-display text-sm font-medium text-white shadow-sm transition-all hover:bg-ink-deep hover:shadow-md active:scale-95"
                >
                  <UserPlus className="h-4 w-4" />
                  <span>+ Add Employee</span>
                </button>
              </div>
            </div>
          </Reveal>
        )}

        {/* Department Filters & Search Row */}
        <Reveal blur={false} delay={0.2}>
          <div className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-line pb-6">
            {/* Department Tabs */}
            <div className="flex flex-wrap items-center gap-2">
              {DEPARTMENTS.map((dept) => {
                const active = selectedDept === dept;
                return (
                  <button
                    key={dept}
                    onClick={() => setSelectedDept(dept)}
                    className={`label-mono rounded-full px-4 py-2 text-xs transition-all duration-300 ${
                      active
                        ? "bg-ink text-white shadow-sm"
                        : "border border-line bg-background text-carbon/60 hover:border-ink/50 hover:text-ink"
                    }`}
                  >
                    {dept}
                  </button>
                );
              })}
            </div>

            {/* Search Input */}
            <div className="relative min-w-[240px]">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-carbon/40" />
              <input
                type="text"
                placeholder="Search by name, role, skill..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-full border border-line bg-paper py-2 pl-10 pr-4 text-xs font-mono text-carbon placeholder:text-carbon/40 focus:border-ink focus:outline-none focus:ring-1 focus:ring-ink"
              />
            </div>
          </div>
        </Reveal>

        {/* Employee Cards Grid */}
        {filteredTeam.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-line p-16 text-center">
            <Users className="mx-auto h-12 w-12 text-carbon/30 mb-4" />
            <h4 className="font-display text-xl font-bold text-carbon">No team members match your criteria</h4>
            <p className="text-sm text-carbon/50 mt-1 mb-6">
              Try adjusting your department filter or search term.
            </p>
            {isHR && (
              <button
                onClick={handleOpenAddForm}
                className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-2.5 text-sm font-medium text-white"
              >
                <UserPlus className="h-4 w-4" />
                <span>Add New Employee</span>
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTeam.map((member, index) => (
              <Reveal key={member.id} blur={false} delay={index * 0.06} amount={0.2}>
                <div
                  onClick={() => handleCardClick(member)}
                  data-cursor="VIEW"
                  className="group relative cursor-pointer overflow-hidden rounded-3xl border border-line bg-paper transition-all duration-500 hover:border-ink/50 hover:shadow-xl flex flex-col h-full"
                >
                  {/* Photo Container with subtle hover zoom */}
                  <div className="relative aspect-[4/4.2] w-full overflow-hidden bg-muted">
                    <img
                      src={member.photo}
                      alt={member.name}
                      className="h-full w-full object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=5F00B7&color=fff&size=512`;
                      }}
                    />

                    {/* Ink Glow Edge on Hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-80" />

                    {/* Department Tag Overlay */}
                    <div className="absolute top-4 left-4">
                      <span className="label-mono rounded-full border border-white/20 bg-black/40 px-3 py-1 text-[10px] text-white backdrop-blur-md">
                        {member.department}
                      </span>
                    </div>

                    {/* HR Management Actions (if in HR mode) */}
                    {isHR && (
                      <div className="absolute top-4 right-4 flex items-center gap-1.5 z-20">
                        <button
                          onClick={(e) => handleOpenEditForm(e, member)}
                          className="flex h-8 w-8 items-center justify-center rounded-full bg-paper/90 text-carbon shadow-md backdrop-blur-sm transition-transform hover:scale-110 hover:text-ink"
                          title="Edit Employee"
                          aria-label="Edit employee"
                        >
                          <Edit2 className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={(e) => handleDeleteEmployee(e, member.id, member.name)}
                          className="flex h-8 w-8 items-center justify-center rounded-full bg-paper/90 text-red-600 shadow-md backdrop-blur-sm transition-transform hover:scale-110 hover:bg-red-50"
                          title="Delete Employee"
                          aria-label="Delete employee"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    )}

                    {/* Bottom overlay text on photo */}
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <p className="label-mono text-[10px] text-white/70">
                        {member.employeeId || `XYPHX-00${index + 1}`}
                      </p>
                      <h3 className="font-display text-2xl font-bold tracking-tight text-white group-hover:text-white">
                        {member.name}
                      </h3>
                      <p className="font-display text-sm font-medium text-purple-200 mt-0.5">
                        {member.role}
                      </p>
                    </div>
                  </div>

                  {/* Card Lower Details & Skills Preview */}
                  <div className="p-6 flex flex-col flex-1 justify-between bg-paper border-t border-line">
                    <p className="text-sm text-carbon/60 line-clamp-2 leading-relaxed mb-4">
                      {member.bio}
                    </p>

                    <div className="space-y-4 pt-2">
                      {/* Skills Preview (first 3) */}
                      {member.skills && member.skills.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                          {member.skills.slice(0, 3).map((skill, sIdx) => (
                            <span
                              key={sIdx}
                              className="rounded-md border border-line bg-muted/30 px-2.5 py-0.5 text-[11px] font-mono text-carbon/60"
                            >
                              {skill}
                            </span>
                          ))}
                          {member.skills.length > 3 && (
                            <span className="rounded-md border border-line px-2 py-0.5 text-[10px] font-mono text-carbon/40">
                              +{member.skills.length - 3}
                            </span>
                          )}
                        </div>
                      )}

                      {/* Click prompt */}
                      <div className="flex items-center justify-between border-t border-line/60 pt-3 text-xs font-mono text-ink">
                        <span className="label-mono text-[10px] text-carbon/40 group-hover:text-ink transition-colors">
                          Click photo for details
                        </span>
                        <div className="flex items-center gap-1 font-medium transition-transform duration-300 group-hover:translate-x-1">
                          <span>View Profile</span>
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        )}

        {/* Bottom invitation if user is HR or wants to join */}
        <Reveal blur={false} delay={0.3}>
          <div className="mt-20 rounded-3xl border border-line bg-paper/60 p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h4 className="font-display text-2xl font-bold tracking-tight text-carbon">
                Want to build the next frontier of AI?
              </h4>
              <p className="text-sm text-carbon/60 mt-1">
                We are actively looking for researchers, engineers, and designers.
              </p>
            </div>
            <div className="flex items-center gap-4 shrink-0">
              <a
                href="https://careers.xyphx.com"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-ink px-6 py-3 font-display font-medium text-white shadow-sm transition-all hover:bg-ink-deep hover:shadow-md"
              >
                Join XyphX ↗
              </a>
              {isHR && (
                <button
                  onClick={handleOpenAddForm}
                  className="rounded-full border border-ink px-6 py-3 font-display font-medium text-ink transition-colors hover:bg-ink-soft"
                >
                  + Add Member
                </button>
              )}
            </div>
          </div>
        </Reveal>
      </div>

      {/* Modals */}
      <EmployeeDetailModal
        employee={selectedEmployee}
        allEmployees={filteredTeam}
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        onSelectEmployee={(emp) => setSelectedEmployee(emp)}
      />

      <EmployeeFormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSave={handleSaveEmployee}
        initialData={editingEmployee}
      />

      <HRAccessModal
        isOpen={isHRAccessOpen}
        onClose={() => setIsHRAccessOpen(false)}
        onSuccess={() => {
          // Callback after successful HR authorization
        }}
      />
    </section>
  );
}
