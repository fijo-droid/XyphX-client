import { supabase } from './supabase';
import { Employee } from '@/data/teamData';

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

/** Helper: Format string dates like "Aug 2026" or "2026-08" to PostgreSQL "YYYY-MM-DD" */
function formatToISODate(dateStr: string | null | undefined): string | null {
  if (!dateStr || !dateStr.trim()) return null;
  
  // If already in YYYY-MM-DD format, return as is
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr.trim())) {
    return dateStr.trim();
  }

  const parsed = new Date(dateStr);
  if (isNaN(parsed.getTime())) return null;

  return parsed.toISOString().split('T')[0];
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
    rank: row.rank ?? 0,
  };
}

/** Map app Employee type → DB insert/update row */
function toDbRow(emp: Employee): Omit<DbEmployee, 'id' | 'created_at'> & { id?: string } {
  return {
    name: emp.name,
    role: emp.role,
    department: emp.department,
    photo_url: emp.photo || null,
    bio: emp.bio || null,
    skills: Array.isArray(emp.skills) && emp.skills.length > 0 ? emp.skills : null,
    projects: Array.isArray(emp.projects) && emp.projects.length > 0 ? emp.projects : null,
    email: emp.email,
    linkedin: emp.linkedin ?? null,
    github: emp.github ?? null,
    twitter: emp.twitter ?? null,
    portfolio: emp.portfolio ?? null,
    joined_date: formatToISODate(emp.joinedDate),
    employee_id: emp.employeeId ?? null,
    rank: emp.rank ?? 0,
  };
}

/** Fetch all employees ordered by rank then created_at */
export async function fetchTeam(): Promise<Employee[]> {
  const { data, error } = await supabase
    .from('employeedetails')
    .select('*')
    .order('rank', { ascending: true })
    .order('created_at', { ascending: true });

  if (error) {
    console.error('fetchTeam error:', error.message, error);
    throw error;
  }

  return (data as DbEmployee[]).map(toEmployee);
}

/** Insert a new employee */
export async function addEmployee(emp: Employee): Promise<Employee> {
  // Convert to DB payload
  const insertRow = toDbRow(emp);

  // GUARANTEE: Never send temporary frontend IDs to let Postgres generate a true UUID
  delete insertRow.id;

  console.log('Sending insert payload to Supabase:', insertRow);

  const { data, error } = await supabase
    .from('employeedetails')
    .insert(insertRow)
    .select()
    .single();

  if (error) {
    console.error('addEmployee error details:', error.message, error.details, error.hint);
    throw error;
  }

  console.log('Successfully inserted into Supabase:', data);
  return toEmployee(data as DbEmployee);
}

/** Update an existing employee */
export async function updateEmployee(emp: Employee): Promise<Employee> {
  const updateRow = toDbRow(emp);
  delete updateRow.id;

  const { data, error } = await supabase
    .from('employeedetails')
    .update(updateRow)
    .eq('id', emp.id)
    .select()
    .single();

  if (error) {
    console.error('updateEmployee error:', error.message, error);
    throw error;
  }

  return toEmployee(data as DbEmployee);
}

/** Delete an employee by ID */
export async function deleteEmployee(id: string): Promise<void> {
  const { error } = await supabase
    .from('employeedetails')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('deleteEmployee error:', error.message, error);
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
    console.error('uploadTeamPhoto error:', error.message, error);
    throw error;
  }

  const { data: urlData } = supabase.storage
    .from('team-photos')
    .getPublicUrl(data.path);

  return urlData.publicUrl;
}