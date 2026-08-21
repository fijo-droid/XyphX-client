import React, { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { motion } from "framer-motion";
import {
  LogOut,
  LayoutDashboard,
  Users,
  Settings,
  Shield,
  Bell,
  Search,
  ExternalLink,
  UserPlus,
  Edit2,
  Trash2,
  ArrowLeft,
} from "lucide-react";
import { Employee } from "@/data/teamData";
import { fetchTeam, addEmployee, updateEmployee, deleteEmployee } from "@/lib/teamService";
import EmployeeFormModal from "@/components/landing/EmployeeFormModal";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const AdminDashboard: React.FC = () => {
  const { user, logout, isHR } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<"dashboard" | "team" | "settings">("dashboard");
  const [team, setTeam] = useState<Employee[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const members = await fetchTeam();
        if (!cancelled) setTeam(members);
      } catch {
        if (!cancelled) {
          toast({
            title: "Could not load team",
            description: "Check your connection and Supabase setup, then refresh.",
          });
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [toast]);

  const handleSaveEmployee = async (emp: Employee) => {
    const exists = Boolean(emp.id) && team.some((m) => m.id === emp.id);
    if (exists) {
      const saved = await updateEmployee(emp);
      setTeam((prev) => prev.map((m) => (m.id === saved.id ? saved : m)));
    } else {
      const saved = await addEmployee(emp);
      setTeam((prev) => [saved, ...prev]);
    }
  };

  const handleDeleteEmployee = async (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to remove ${name}?`)) {
      try {
        await deleteEmployee(id);
        setTeam((prev) => prev.filter((m) => m.id !== id));
        toast({
          title: "Employee Removed",
          description: `${name} has been removed.`,
        });
      } catch {
        toast({
          title: "Remove failed",
          description: "Could not delete this employee. Please try again.",
        });
      }
    }
  };

  const mockStats = [
    { label: "Active Sessions", value: "1,284", icon: Users, color: "text-primary" },
    { label: "Team Members", value: String(team.length), icon: Users, color: "text-ink" },
    { label: "System Security", value: "99.9%", icon: Shield, color: "text-emerald-600" },
  ];

  return (
    <div className="min-h-screen bg-white text-foreground font-sans selection:bg-primary/20">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 hidden h-full w-64 border-r border-primary/10 bg-white/80 backdrop-blur-xl lg:block">
        <div className="flex h-full flex-col p-6">
          <div className="mb-10 flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[linear-gradient(135deg,#5F00B7,#9B30FF)] shadow-glow">
              <Shield className="h-5 w-5 text-white" />
            </div>
            <span className="font-display text-xl font-bold tracking-tight text-black">XyphX OS</span>
          </div>

          <nav className="flex-1 space-y-1">
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 font-medium transition-all ${
                activeTab === "dashboard" ? "bg-primary/10 text-primary" : "text-black/55 hover:bg-purple-50 hover:text-black"
              }`}
            >
              <LayoutDashboard className="h-5 w-5" />
              <span>Dashboard</span>
            </button>
            <button
              onClick={() => setActiveTab("team")}
              className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 font-medium transition-all ${
                activeTab === "team" ? "bg-primary/10 text-primary" : "text-black/55 hover:bg-purple-50 hover:text-black"
              }`}
            >
              <Users className="h-5 w-5" />
              <span>Team Directory</span>
            </button>
            <button
              onClick={() => navigate("/")}
              className="flex w-full items-center gap-3 rounded-xl px-4 py-3 font-medium text-black/55 hover:bg-purple-50 hover:text-black transition-all"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Website</span>
            </button>
          </nav>

          <button
            onClick={logout}
            className="mt-auto flex items-center gap-3 rounded-xl px-4 py-3 text-black/55 transition-colors hover:bg-red-500/10 hover:text-red-500"
          >
            <LogOut className="h-5 w-5" />
            <span className="font-medium">Logout System</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="p-4 lg:ml-64 lg:p-8">
        {/* Header */}
        <header className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <div>
            <h1 className="mb-1 font-display text-3xl font-bold tracking-tight text-black">
              {activeTab === "team" ? "HR & Team Directory Console" : "Administrative Terminal"}
            </h1>
            <p className="text-black/55">
              Welcome back, {user?.displayName || "Admin"} · {isHR ? "HR Mode Active" : "Standard Admin"}
            </p>
          </div>

          <div className="flex items-center gap-4">
            {activeTab === "team" && (
              <button
                onClick={() => {
                  setEditingEmployee(null);
                  setIsFormOpen(true);
                }}
                className="flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 font-display text-sm font-medium text-white shadow-sm hover:bg-ink-deep"
              >
                <UserPlus className="h-4 w-4" />
                <span>Add Employee</span>
              </button>
            )}

            <div className="group relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-black/35 transition-colors group-focus-within:text-primary" />
              <input
                type="text"
                placeholder="Search resources..."
                className="w-64 rounded-xl border border-primary/15 bg-white py-2.5 pl-10 pr-4 font-medium shadow-sm transition-all placeholder:text-black/30 focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            {user?.photoURL ? (
              <img
                src={user.photoURL}
                alt="Avatar"
                className="h-10 w-10 rounded-full border border-primary/20"
              />
            ) : (
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-ink text-white font-bold">
                A
              </div>
            )}
          </div>
        </header>

        {activeTab === "dashboard" ? (
          <>
            {/* Stats Grid */}
            <div className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-3">
              {mockStats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="group relative rounded-2xl glass p-6 shadow-depth transition-all hover:shadow-glow"
                >
                  <div className={`${stat.color} mb-4`}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                  <p className="mb-1 text-sm font-medium uppercase tracking-wider text-black/45">{stat.label}</p>
                  <h3 className="font-display text-2xl font-bold text-black">{stat.value}</h3>
                </motion.div>
              ))}
            </div>

            {/* Content Section */}
            <section className="rounded-3xl glass p-8 shadow-depth">
              <div className="mb-8 flex items-center justify-between">
                <h2 className="font-display text-xl font-bold text-black">Recent Team & Authorization Activity</h2>
                <button
                  onClick={() => setActiveTab("team")}
                  className="flex items-center gap-1 text-sm text-primary transition-colors hover:text-[#9B30FF]"
                >
                  Manage Team Directory <ExternalLink className="h-3 w-3" />
                </button>
              </div>

              <div className="space-y-4">
                {team.slice(0, 3).map((emp) => (
                  <div
                    key={emp.id}
                    className="flex items-center justify-between rounded-xl border border-primary/10 bg-white/60 p-4"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={emp.photo}
                        alt={emp.name}
                        className="h-10 w-10 rounded-full object-cover border border-line"
                      />
                      <div>
                        <h4 className="font-display text-sm font-bold text-carbon">{emp.name}</h4>
                        <p className="text-xs text-black/50">{emp.role} · {emp.department}</p>
                      </div>
                    </div>
                    <span className="label-mono text-xs text-ink/80">{emp.employeeId || "ACTIVE"}</span>
                  </div>
                ))}
              </div>
            </section>
          </>
        ) : (
          /* Team Directory Tab */
          <section className="rounded-3xl glass p-8 shadow-depth">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h2 className="font-display text-xl font-bold text-black">Company Roster ({team.length} Members)</h2>
                <p className="text-xs text-black/50">Full directory view with HR privileges</p>
              </div>
              <button
                onClick={() => {
                  setEditingEmployee(null);
                  setIsFormOpen(true);
                }}
                className="flex items-center gap-2 rounded-full bg-ink px-5 py-2 font-display text-sm font-medium text-white shadow-sm hover:bg-ink-deep"
              >
                <UserPlus className="h-4 w-4" />
                <span>+ Add Employee</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {team.map((emp) => (
                <div
                  key={emp.id}
                  className="rounded-2xl border border-primary/10 bg-white p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
                >
                  <div className="flex items-start gap-4">
                    <img
                      src={emp.photo}
                      alt={emp.name}
                      className="h-16 w-16 rounded-xl object-cover border border-line shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <span className="label-mono text-[10px] text-ink">{emp.department}</span>
                      <h4 className="font-display text-base font-bold text-carbon truncate">{emp.name}</h4>
                      <p className="text-xs text-carbon/60 truncate">{emp.role}</p>
                      <p className="text-[11px] text-carbon/40 font-mono mt-1">{emp.email}</p>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-line flex items-center justify-between">
                    <span className="label-mono text-[10px] text-carbon/40">{emp.employeeId || "EMP"}</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setEditingEmployee(emp);
                          setIsFormOpen(true);
                        }}
                        className="flex h-7 w-7 items-center justify-center rounded-lg border border-line text-carbon/70 hover:border-ink hover:text-ink"
                        title="Edit"
                      >
                        <Edit2 className="h-3 w-3" />
                      </button>
                      <button
                        onClick={() => handleDeleteEmployee(emp.id, emp.name)}
                        className="flex h-7 w-7 items-center justify-center rounded-lg border border-line text-red-600 hover:bg-red-50"
                        title="Delete"
                      >
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      <EmployeeFormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSave={handleSaveEmployee}
        initialData={editingEmployee}
      />
    </div>
  );
};

export default AdminDashboard;

