import { supabase } from './supabase';
import { Employee } from '@/data/teamData';

// ─── SQL to run in Supabase SQL Editor ───────────────────────────────────────
// CREATE TABLE IF NOT EXISTS employees (
//   id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
//   name TEXT NOT NULL,
//   role TEXT NOT NULL,
//   department TEXT NOT NULL,
//   photo_url TEXT,
//   bio TEXT,
//   skills TEXT[],
//   projects TEXT[],
//   email TEXT NOT NULL,
//   linkedin TEXT,
//   github TEXT,
//   twitter TEXT,
//   portfolio TEXT,
//   joined_date TEXT,
//   employee_id TEXT,
//   rank INTEGER DEFAULT 0,
//   created_at TIMESTAMPTZ DEFAULT NOW()
// );
//
// -- Allow public read, authenticated insert/update/delete:
// ALTER TABLE employees ENABLE ROW LEVEL SECURITY;
// CREATE POLICY "Public read employees" ON employees FOR SELECT USING (true);
// CREATE POLICY "HR can insert" ON employees FOR INSERT WITH CHECK (true);
// CREATE POLICY "HR can update" ON employees FOR UPDATE USING (true);
// CREATE POLICY "HR can delete" ON employees FOR DELETE USING (true);
//
// -- Storage bucket for team photos (run in Storage section or SQL):
// -- Create a bucket called "team-photos" with public access enabled.
// ─────────────────────────────────────────────────────────────────────────────

export interface DbEmployee {
  id: string;
  name: string;
  role: string;
  department: string;
  photo_url: string | null;
  bio: string | null;
  skills: string[] | null;
  projects: string[] | null;
  email: string;
  linkedin: string | null;
  github: string | null;
  twitter: string | null;
  portfolio: string | null;
  joined_date: string | null;
  employee_id: string | null;
  rank: number;
  created_at: string;
}

/** Map DB row → app Employee type */
function toEmployee(row: DbEmployee): Employee {
  return {
    id: row.id,
    employeeId: row.employee_id ?? undefined,
    name: row.name,
    role: row.role,
    department: row.department as Employee['department'],
    photo: row.photo_url ?? '',
    bio: row.bio ?? '',
    skills: row.skills ?? [],
    projects: row.projects ?? [],
    email: row.email,
    linkedin: row.linkedin ?? undefined,
    github: row.github ?? undefined,
    twitter: row.twitter ?? undefined,
    portfolio: row.portfolio ?? undefined,
    joinedDate: row.joined_date ?? undefined,
    rank: row.rank,
  };
}

/** Map app Employee type → DB insert/update row */
function toDbRow(emp: Employee): Omit<DbEmployee, 'id' | 'created_at'> & { id?: string } {
  return {
    id: emp.id !== '' ? emp.id : undefined,
    name: emp.name,
    role: emp.role,
    department: emp.department,
    photo_url: emp.photo || null,
    bio: emp.bio || null,
    skills: emp.skills.length ? emp.skills : null,
    projects: emp.projects.length ? emp.projects : null,
    email: emp.email,
    linkedin: emp.linkedin ?? null,
    github: emp.github ?? null,
    twitter: emp.twitter ?? null,
    portfolio: emp.portfolio ?? null,
    joined_date: emp.joinedDate ?? null,
    employee_id: emp.employeeId ?? null,
    rank: emp.rank ?? 0,
  };
}

/** Fetch all employees ordered by rank then created_at */
export async function fetchTeam(): Promise<Employee[]> {
  const { data, error } = await supabase
    .from('employees')
    .select('*')
    .order('rank', { ascending: true })
    .order('created_at', { ascending: true });

  if (error) {
    console.error('fetchTeam error:', error);
    throw error;
  }

  return (data as DbEmployee[]).map(toEmployee);
}

/** Insert a new employee */
export async function addEmployee(emp: Employee): Promise<Employee> {
  const row = toDbRow(emp);
  // Remove id so Supabase auto-generates UUID
  const { id: _ignored, ...insertRow } = row as any;

  const { data, error } = await supabase
    .from('employees')
    .insert(insertRow)
    .select()
    .single();

  if (error) {
    console.error('addEmployee error:', error);
    throw error;
  }

  return toEmployee(data as DbEmployee);
}

/** Update an existing employee */
export async function updateEmployee(emp: Employee): Promise<Employee> {
  const { id: _ignored, ...updateRow } = toDbRow(emp) as any;

  const { data, error } = await supabase
    .from('employees')
    .update(updateRow)
    .eq('id', emp.id)
    .select()
    .single();

  if (error) {
    console.error('updateEmployee error:', error);
    throw error;
  }

  return toEmployee(data as DbEmployee);
}

/** Delete an employee by ID */
export async function deleteEmployee(id: string): Promise<void> {
  const { error } = await supabase
    .from('employees')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('deleteEmployee error:', error);
    throw error;
  }
}

/** Upload a photo file to Supabase Storage, return its public URL */
export async function uploadTeamPhoto(file: File): Promise<string> {
  const ext = file.name.split('.').pop() ?? 'jpg';
  const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

  const { data, error } = await supabase.storage
    .from('team-photos')
    .upload(fileName, file, {
      cacheControl: '3600',
      upsert: false,
    });

  if (error) {
    console.error('uploadTeamPhoto error:', error);
    throw error;
  }

  const { data: urlData } = supabase.storage
    .from('team-photos')
    .getPublicUrl(data.path);

  return urlData.publicUrl;
}
