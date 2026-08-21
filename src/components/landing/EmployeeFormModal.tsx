import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X, Upload, Image as ImageIcon, AlertCircle, Sparkles, Loader2,
} from "lucide-react";
import { Employee } from "@/data/teamData";
import { uploadTeamPhoto } from "@/lib/teamService";
import { useToast } from "@/hooks/use-toast";

interface EmployeeFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (employee: Employee) => Promise<void>;
  initialData?: Employee | null;
}

export default function EmployeeFormModal({
  isOpen,
  onClose,
  onSave,
  initialData,
}: EmployeeFormModalProps) {
  const { toast } = useToast();

  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [department, setDepartment] = useState<Employee["department"]>("Engineering");
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string>("");
  const [existingPhotoUrl, setExistingPhotoUrl] = useState<string>("");
  const [bio, setBio] = useState("");
  const [email, setEmail] = useState("");
  const [employeeIdVal, setEmployeeIdVal] = useState("");
  const [skillsInput, setSkillsInput] = useState("");
  const [projectsInput, setProjectsInput] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [github, setGithub] = useState("");
  const [joinedDate, setJoinedDate] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    if (initialData) {
      setName(initialData.name || "");
      setRole(initialData.role || "");
      setDepartment(initialData.department || "Engineering");
      setExistingPhotoUrl(initialData.photo || "");
      setPhotoPreview(initialData.photo || "");
      setPhotoFile(null);
      setBio(initialData.bio || "");
      setEmail(initialData.email || "");
      setEmployeeIdVal(initialData.employeeId || "");
      setSkillsInput(initialData.skills ? initialData.skills.join(", ") : "");
      setProjectsInput(initialData.projects ? initialData.projects.join(", ") : "");
      setLinkedin(initialData.linkedin || "");
      setGithub(initialData.github || "");
      setJoinedDate(initialData.joinedDate || "");
    } else {
      setName(""); setRole(""); setDepartment("Engineering");
      setPhotoFile(null); setPhotoPreview(""); setExistingPhotoUrl("");
      setBio(""); setEmail("");
      setEmployeeIdVal(`XYPHX-${Math.floor(100 + Math.random() * 900)}`);
      setSkillsInput(""); setProjectsInput("");
      setLinkedin(""); setGithub("");
      setJoinedDate(new Intl.DateTimeFormat("en-US", { month: "short", year: "numeric" }).format(new Date()));
    }
    setErrorMsg("");
  }, [initialData, isOpen]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 8 * 1024 * 1024) {
      setErrorMsg("Image must be under 8 MB.");
      return;
    }
    setPhotoFile(file);
    setPhotoPreview(URL.createObjectURL(file));
    setErrorMsg("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) { setErrorMsg("Full name is required."); return; }
    if (!role.trim()) { setErrorMsg("Role / Job Title is required."); return; }
    if (!bio.trim()) { setErrorMsg("Bio is required."); return; }
    if (!email.trim()) { setErrorMsg("Email is required."); return; }

    setSubmitting(true);
    setErrorMsg("");

    try {
      // Upload photo if a new file was selected
      let photoUrl = existingPhotoUrl;
      if (photoFile) {
        photoUrl = await uploadTeamPhoto(photoFile);
      }

      const emp: Employee = {
        id: initialData ? initialData.id : "",
        employeeId: employeeIdVal.trim() || undefined,
        name: name.trim(),
        role: role.trim(),
        department,
        photo: photoUrl,
        bio: bio.trim(),
        skills: skillsInput.split(",").map(s => s.trim()).filter(Boolean),
        projects: projectsInput.split(",").map(p => p.trim()).filter(Boolean),
        email: email.trim(),
        linkedin: linkedin.trim() || undefined,
        github: github.trim() || undefined,
        joinedDate: joinedDate.trim() || undefined,
      };

      await onSave(emp);
      toast({
        title: initialData ? "Employee Updated" : "Employee Added",
        description: `${emp.name} has been saved to the team directory.`,
      });
      onClose();
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err?.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[85] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#0A0014]/80 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ duration: 0.35, ease: [0.21, 0.6, 0.35, 1] }}
            className="relative z-10 w-full max-w-2xl overflow-hidden rounded-3xl border border-line bg-paper shadow-2xl my-auto text-carbon"
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-line px-6 py-5">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-ink text-white">
                  <Sparkles className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold tracking-tight text-carbon">
                    {initialData ? "Edit Employee Profile" : "Add New Employee"}
                  </h3>
                  <p className="label-mono text-ink/70">HR Authorized • Supabase Synced</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-line text-carbon/60 hover:bg-ink hover:border-ink hover:text-white transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6 max-h-[78vh] overflow-y-auto">
              {errorMsg && (
                <div className="flex items-center gap-3 rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-600">
                  <AlertCircle className="h-5 w-5 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Photo Upload */}
              <div className="rounded-2xl border border-line bg-muted/40 p-5">
                <label className="label-mono text-carbon/50 block mb-3">
                  Employee Photo (uploaded to Supabase Storage)
                </label>
                <div className="flex flex-col sm:flex-row items-center gap-6">
                  {/* Preview */}
                  <div className="relative h-28 w-24 shrink-0 rounded-xl overflow-hidden border border-line bg-muted shadow-sm">
                    {photoPreview ? (
                      <img
                        src={photoPreview}
                        alt="Preview"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full flex-col items-center justify-center gap-1 text-carbon/30">
                        <ImageIcon className="h-8 w-8" />
                        <span className="text-[10px] font-mono">No photo</span>
                      </div>
                    )}
                  </div>

                  {/* Upload button */}
                  <div className="flex-1 w-full">
                    <label className="flex items-center justify-center gap-2 w-full cursor-pointer rounded-xl border border-dashed border-ink/40 bg-ink-soft px-4 py-4 text-sm font-medium text-ink hover:border-ink hover:bg-ink/10 transition-colors">
                      <Upload className="h-4 w-4" />
                      <span>
                        {photoFile
                          ? `Selected: ${photoFile.name}`
                          : existingPhotoUrl
                            ? "Replace photo"
                            : "Upload employee photo (PNG, JPG, WebP · max 8 MB)"}
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileSelect}
                        className="hidden"
                      />
                    </label>
                    <p className="mt-2 text-[11px] text-carbon/40 font-mono">
                      Photo is stored securely in Supabase Storage and displayed publicly.
                    </p>
                  </div>
                </div>
              </div>

              {/* Core Fields */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="label-mono text-carbon/50 block mb-1.5">Full Name *</label>
                  <input type="text" required placeholder="e.g. John Doe" value={name} onChange={e => setName(e.target.value)}
                    className="w-full rounded-xl border border-line bg-paper px-4 py-2.5 text-sm text-carbon placeholder:text-carbon/30 focus:border-ink focus:outline-none focus:ring-1 focus:ring-ink" />
                </div>
                <div>
                  <label className="label-mono text-carbon/50 block mb-1.5">Role / Job Title *</label>
                  <input type="text" required placeholder="e.g. Lead AI Architect" value={role} onChange={e => setRole(e.target.value)}
                    className="w-full rounded-xl border border-line bg-paper px-4 py-2.5 text-sm text-carbon placeholder:text-carbon/30 focus:border-ink focus:outline-none focus:ring-1 focus:ring-ink" />
                </div>
                <div>
                  <label className="label-mono text-carbon/50 block mb-1.5">Department *</label>
                  <select value={department} onChange={e => setDepartment(e.target.value as Employee["department"])}
                    className="w-full rounded-xl border border-line bg-paper px-4 py-2.5 text-sm text-carbon focus:border-ink focus:outline-none focus:ring-1 focus:ring-ink">
                    <option value="Leadership">Leadership</option>
                    <option value="AI & Research">AI & Research</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Design & UX">Design & UX</option>
                    <option value="People & Ops">People & Ops (HR)</option>
                  </select>
                </div>
                <div>
                  <label className="label-mono text-carbon/50 block mb-1.5">Employee ID</label>
                  <input type="text" placeholder="XYPHX-007" value={employeeIdVal} onChange={e => setEmployeeIdVal(e.target.value)}
                    className="w-full rounded-xl border border-line bg-paper px-4 py-2.5 text-sm text-carbon placeholder:text-carbon/30 focus:border-ink focus:outline-none focus:ring-1 focus:ring-ink" />
                </div>
              </div>

              {/* Bio */}
              <div>
                <label className="label-mono text-carbon/50 block mb-1.5">Bio & Role Overview *</label>
                <textarea required rows={3} placeholder="Describe the employee's background, responsibilities, and contributions..."
                  value={bio} onChange={e => setBio(e.target.value)}
                  className="w-full rounded-xl border border-line bg-paper px-4 py-2.5 text-sm text-carbon placeholder:text-carbon/30 focus:border-ink focus:outline-none focus:ring-1 focus:ring-ink leading-relaxed" />
              </div>

              {/* Skills & Projects */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="label-mono text-carbon/50 block mb-1.5">Skills (comma separated)</label>
                  <input type="text" placeholder="PyTorch, React, Go, System Design" value={skillsInput} onChange={e => setSkillsInput(e.target.value)}
                    className="w-full rounded-xl border border-line bg-paper px-4 py-2.5 text-sm text-carbon placeholder:text-carbon/30 focus:border-ink focus:outline-none focus:ring-1 focus:ring-ink" />
                </div>
                <div>
                  <label className="label-mono text-carbon/50 block mb-1.5">Key Projects (comma separated)</label>
                  <input type="text" placeholder="DotX Agents, ShowMySkills, XyphX OS" value={projectsInput} onChange={e => setProjectsInput(e.target.value)}
                    className="w-full rounded-xl border border-line bg-paper px-4 py-2.5 text-sm text-carbon placeholder:text-carbon/30 focus:border-ink focus:outline-none focus:ring-1 focus:ring-ink" />
                </div>
              </div>

              {/* Contact */}
              <div className="border-t border-line pt-5 space-y-4">
                <p className="label-mono text-carbon/40">Contact & Social</p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-mono text-carbon/60 block mb-1">Corporate Email *</label>
                    <input type="email" required placeholder="name@xyphx.com" value={email} onChange={e => setEmail(e.target.value)}
                      className="w-full rounded-xl border border-line bg-paper px-4 py-2.5 text-sm text-carbon placeholder:text-carbon/30 focus:border-ink focus:outline-none focus:ring-1 focus:ring-ink" />
                  </div>
                  <div>
                    <label className="text-xs font-mono text-carbon/60 block mb-1">LinkedIn URL</label>
                    <input type="url" placeholder="https://linkedin.com/in/username" value={linkedin} onChange={e => setLinkedin(e.target.value)}
                      className="w-full rounded-xl border border-line bg-paper px-4 py-2.5 text-sm text-carbon placeholder:text-carbon/30 focus:border-ink focus:outline-none focus:ring-1 focus:ring-ink" />
                  </div>
                  <div>
                    <label className="text-xs font-mono text-carbon/60 block mb-1">GitHub URL</label>
                    <input type="url" placeholder="https://github.com/username" value={github} onChange={e => setGithub(e.target.value)}
                      className="w-full rounded-xl border border-line bg-paper px-4 py-2.5 text-sm text-carbon placeholder:text-carbon/30 focus:border-ink focus:outline-none focus:ring-1 focus:ring-ink" />
                  </div>
                  <div>
                    <label className="text-xs font-mono text-carbon/60 block mb-1">Joined Date</label>
                    <input type="text" placeholder="e.g. Jan 2026" value={joinedDate} onChange={e => setJoinedDate(e.target.value)}
                      className="w-full rounded-xl border border-line bg-paper px-4 py-2.5 text-sm text-carbon placeholder:text-carbon/30 focus:border-ink focus:outline-none focus:ring-1 focus:ring-ink" />
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 border-t border-line pt-5">
                <button type="button" onClick={onClose} disabled={submitting}
                  className="rounded-full border border-line bg-paper px-6 py-2.5 text-sm font-medium text-carbon/70 hover:bg-muted transition-colors disabled:opacity-50">
                  Cancel
                </button>
                <button type="submit" disabled={submitting}
                  className="rounded-full bg-ink px-8 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-ink-deep transition-all active:scale-95 disabled:opacity-60 flex items-center gap-2">
                  {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
                  {submitting ? "Saving..." : initialData ? "Save Changes" : "Insert Employee"}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
