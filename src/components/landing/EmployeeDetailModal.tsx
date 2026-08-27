import React, { useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Mail, Linkedin, Github, Twitter, Globe, Sparkles, Check, Briefcase, Award, User } from "lucide-react";
import { Employee } from "@/data/teamData";
import { useToast } from "@/hooks/use-toast";

interface EmployeeDetailModalProps {
  employee: Employee | null;
  allEmployees: Employee[];
  isOpen: boolean;
  onClose: () => void;
  onSelectEmployee: (emp: Employee) => void;
}

export default function EmployeeDetailModal({
  employee,
  allEmployees,
  isOpen,
  onClose,
  onSelectEmployee,
}: EmployeeDetailModalProps) {
  const { toast } = useToast();
  const [copiedEmail, setCopiedEmail] = React.useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Complete background scroll freeze (fixes iOS & Touchpad scroll leak)
  useEffect(() => {
    if (!isOpen) return;

    const scrollY = window.scrollY;
    
    // Freeze body position
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";
    document.body.style.overflow = "hidden";

    return () => {
      // Restore body position & scroll level
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
      window.scrollTo(0, scrollY);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const frame = requestAnimationFrame(() => {
      scrollContainerRef.current?.focus({ preventScroll: true });
    });
    return () => cancelAnimationFrame(frame);
  }, [isOpen, employee?.id]);

  const currentIndex = employee 
    ? allEmployees.findIndex((e) => e.id === employee.id) 
    : -1;

  const handlePrev = useCallback(() => {
    if (currentIndex === -1 || allEmployees.length === 0) return;
    const prevIndex = (currentIndex - 1 + allEmployees.length) % allEmployees.length;
    onSelectEmployee(allEmployees[prevIndex]);
  }, [currentIndex, allEmployees, onSelectEmployee]);

  const handleNext = useCallback(() => {
    if (currentIndex === -1 || allEmployees.length === 0) return;
    const nextIndex = (currentIndex + 1) % allEmployees.length;
    onSelectEmployee(allEmployees[nextIndex]);
  }, [currentIndex, allEmployees, onSelectEmployee]);

  useEffect(() => {
    if (!isOpen || !employee) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.tagName === "SELECT" ||
          target.isContentEditable)
      ) {
        return;
      }

      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key === "ArrowLeft") {
        e.preventDefault();
        handlePrev();
        return;
      }

      if (e.key === "ArrowRight") {
        e.preventDefault();
        handleNext();
        return;
      }

      const container = scrollContainerRef.current;
      if (!container) return;

      const lineScroll = 80;
      const pageScroll = Math.max(container.clientHeight * 0.85, 1);

      let delta: number | null = null;
      let nextTop: number | null = null;

      switch (e.key) {
        case "ArrowDown":
          delta = lineScroll;
          break;
        case "ArrowUp":
          delta = -lineScroll;
          break;
        case "PageDown":
          delta = pageScroll;
          break;
        case "PageUp":
          delta = -pageScroll;
          break;
        case " ":
          delta = e.shiftKey ? -pageScroll : pageScroll;
          break;
        case "Home":
          nextTop = 0;
          break;
        case "End":
          nextTop = container.scrollHeight;
          break;
        default:
          return;
      }

      // Capture-phase + instant scrollTop: Lenis / body freeze eat native keys,
      // and behavior:"smooth" cancels itself on key-repeat.
      e.preventDefault();
      e.stopPropagation();
      container.scrollTop = nextTop ?? container.scrollTop + delta!;
    };

    window.addEventListener("keydown", handleKeyDown, true);
    return () => window.removeEventListener("keydown", handleKeyDown, true);
  }, [isOpen, employee, handlePrev, handleNext, onClose]);

  if (!employee) return null;

  const copyEmail = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!employee.email) return;
    
    navigator.clipboard.writeText(employee.email);
    setCopiedEmail(true);
    toast({
      title: "Email Copied",
      description: `${employee.email} copied to clipboard.`,
    });
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-6 overflow-hidden touch-none">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#0A0014]/75 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ duration: 0.35, ease: [0.21, 0.6, 0.35, 1] }}
            className="relative z-10 w-full max-w-4xl flex flex-col max-h-[85vh] rounded-3xl border border-line bg-paper shadow-2xl my-auto text-carbon overflow-hidden touch-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header Action Bar */}
            <div className="shrink-0 flex items-center justify-between border-b border-line px-6 py-4 bg-paper/90 backdrop-blur-sm z-20">
              <div className="flex items-center gap-3">
                <span className="label-mono text-ink/70">
                  EMP // {employee.employeeId || `XYPHX-00${currentIndex + 1}`}
                </span>
                <span className="h-3 w-px bg-line" />
                <span className="label-mono text-carbon/40">{employee.department}</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrev}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-line text-carbon/70 transition-colors hover:border-ink hover:text-ink"
                  title="Previous Member (Left Arrow)"
                  aria-label="Previous employee"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={handleNext}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-line text-carbon/70 transition-colors hover:border-ink hover:text-ink"
                  title="Next Member (Right Arrow)"
                  aria-label="Next employee"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
                <span className="h-4 w-px bg-line mx-1" />
                <button
                  onClick={onClose}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-line text-carbon/60 transition-colors hover:bg-ink hover:border-ink hover:text-white"
                  title="Close (Esc)"
                  aria-label="Close modal"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Scrollable Modal Body */}
            <div
              ref={scrollContainerRef}
              tabIndex={-1}
              className="flex-1 min-h-0 overflow-y-auto overscroll-contain p-6 sm:p-10 outline-none"
            >
              <div className="grid md:grid-cols-12 gap-8">
                {/* Left Column: Portrait & Meta */}
                <div className="md:col-span-5 flex flex-col items-center md:items-start text-center md:text-left">
                  <div className="relative group w-full aspect-[4/5] max-w-[280px] md:max-w-none rounded-2xl overflow-hidden border border-line bg-muted shadow-sm">
                    {employee.photo ? (
                      <img
                        src={employee.photo}
                        alt={employee.name}
                        className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-ink-soft text-ink/40">
                        <User className="h-16 w-16" />
                        <span className="label-mono text-xs">Photo pending</span>
                      </div>
                    )}
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-4 text-white">
                      <p className="label-mono text-[10px] text-white/70">Joined {employee.joinedDate || "2024"}</p>
                      <p className="font-display text-sm font-semibold tracking-tight">{employee.department}</p>
                    </div>
                  </div>

                  {/* Social Links */}
                  <div className="mt-6 flex flex-wrap items-center justify-center md:justify-start gap-2 w-full">
                    {employee.email && (
                      <button
                        onClick={copyEmail}
                        className="group flex items-center gap-2 rounded-xl border border-line px-3.5 py-2 text-xs font-mono text-carbon/70 transition-all hover:border-ink hover:text-ink hover:bg-ink-soft"
                      >
                        {copiedEmail ? (
                          <>
                            <Check className="h-3.5 w-3.5 text-emerald-600" />
                            <span className="text-emerald-600 font-medium">Copied</span>
                          </>
                        ) : (
                          <>
                            <Mail className="h-3.5 w-3.5 text-ink/70 group-hover:text-ink" />
                            <span>Copy Email</span>
                          </>
                        )}
                      </button>
                    )}

                    {employee.linkedin && (
                      <a
                        href={employee.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-9 w-9 items-center justify-center rounded-xl border border-line text-carbon/60 transition-colors hover:border-ink hover:text-ink hover:bg-ink-soft"
                        aria-label="LinkedIn profile"
                      >
                        <Linkedin className="h-4 w-4" />
                      </a>
                    )}

                    {employee.github && (
                      <a
                        href={employee.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-9 w-9 items-center justify-center rounded-xl border border-line text-carbon/60 transition-colors hover:border-ink hover:text-ink hover:bg-ink-soft"
                        aria-label="GitHub profile"
                      >
                        <Github className="h-4 w-4" />
                      </a>
                    )}

                    {employee.twitter && (
                      <a
                        href={employee.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-9 w-9 items-center justify-center rounded-xl border border-line text-carbon/60 transition-colors hover:border-ink hover:text-ink hover:bg-ink-soft"
                        aria-label="Twitter profile"
                      >
                        <Twitter className="h-4 w-4" />
                      </a>
                    )}

                    {employee.portfolio && (
                      <a
                        href={employee.portfolio}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-9 w-9 items-center justify-center rounded-xl border border-line text-carbon/60 transition-colors hover:border-ink hover:text-ink hover:bg-ink-soft"
                        aria-label="Portfolio website"
                      >
                        <Globe className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Right Column: Details */}
                <div className="md:col-span-7 flex flex-col">
                  <div>
                    <div className="inline-flex items-center gap-2 rounded-full border border-ink/20 bg-ink-soft px-3 py-1 text-xs font-mono text-ink mb-3">
                      <Sparkles className="h-3 w-3" />
                      <span>{employee.department}</span>
                    </div>

                    <h3 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-carbon">
                      {employee.name}
                    </h3>
                    <p className="mt-1 font-display text-lg sm:text-xl font-medium text-ink">
                      {employee.role}
                    </p>
                  </div>

                  <div className="mt-6 border-t border-line pt-6">
                    <h4 className="label-mono text-carbon/40 mb-2 flex items-center gap-2">
                      <Briefcase className="h-3 w-3 text-ink" />
                      <span>Role & Mission</span>
                    </h4>
                    <p className="text-base leading-relaxed text-carbon/75 font-normal">
                      {employee.bio}
                    </p>
                  </div>

                  {employee.skills && employee.skills.length > 0 && (
                    <div className="mt-6 border-t border-line pt-6">
                      <h4 className="label-mono text-carbon/40 mb-3">Core Competencies</h4>
                      <div className="flex flex-wrap gap-2">
                        {employee.skills.map((skill, idx) => (
                          <span
                            key={idx}
                            className="rounded-lg border border-line bg-background px-3 py-1 text-xs font-mono text-carbon/70 transition-colors hover:border-ink/40 hover:text-ink hover:bg-ink-soft"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {employee.projects && employee.projects.length > 0 && (
                    <div className="mt-6 border-t border-line pt-6">
                      <h4 className="label-mono text-carbon/40 mb-3 flex items-center gap-2">
                        <Award className="h-3 w-3 text-ink" />
                        <span>Key Initiatives</span>
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {employee.projects.map((proj, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-2.5 rounded-xl border border-line bg-paper/60 p-3 transition-colors hover:border-ink/30"
                          >
                            <span className="h-1.5 w-1.5 rounded-full bg-ink shrink-0" />
                            <span className="font-display text-sm font-medium text-carbon/80">{proj}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}