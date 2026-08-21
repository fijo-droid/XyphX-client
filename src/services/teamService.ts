import { supabase } from '../lib/supabase';
import { Employee } from '@/data/teamData';

export interface DbEmployee {
    id: string;
    name: string;
    role: string;
    department: string | null;
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

function toEmployee(row: DbEmployee): Employee {
    return {
        id: row.id,
        employeeId: row.employee_id ?? undefined,
        name: row.name,
        role: row.role,
        department: (row.department as Employee['department']) ?? 'Engineering',
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

function toDbRow(emp: Employee): Omit<DbEmployee, 'id' | 'created_at'> & { id?: string } {
    return {
        id: emp.id !== '' ? emp.id : undefined,
        name: emp.name,
        role: emp.role,
        department: emp.department,
        photo_url: emp.photo || null,
        bio: emp.bio || null,
        skills: emp.skills?.length ? emp.skills : null,
        projects: emp.projects?.length ? emp.projects : null,
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

export async function fetchTeam(): Promise<Employee[]> {
    const { data, error } = await supabase
        .from('employees')
        .select('*')
        .order('rank', { ascending: true })
        .order('created_at', { ascending: true });

    if (error) throw error;
    return (data as DbEmployee[]).map(toEmployee);
}

export async function addEmployee(emp: Employee): Promise<Employee> {
    const row = toDbRow(emp);
    const { id: _ignored, ...insertRow } = row as any;

    const { data, error } = await supabase
        .from('employees')
        .insert(insertRow)
        .select()
        .single();

    if (error) throw error;
    return toEmployee(data as DbEmployee);
}

export async function updateEmployee(emp: Employee): Promise<Employee> {
    const { id: _ignored, ...updateRow } = toDbRow(emp) as any;

    const { data, error } = await supabase
        .from('employees')
        .update(updateRow)
        .eq('id', emp.id)
        .select()
        .single();

    if (error) throw error;
    return toEmployee(data as DbEmployee);
}

export async function deleteEmployee(id: string): Promise<void> {
    const { error } = await supabase
        .from('employees')
        .delete()
        .eq('id', id);

    if (error) throw error;
}

export async function uploadTeamPhoto(file: File): Promise<string> {
    const ext = file.name.split('.').pop() ?? 'jpg';
    const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

    const { data, error } = await supabase.storage
        .from('team-photos')
        .upload(fileName, file, { cacheControl: '3600', upsert: false });

    if (error) throw error;

    const { data: urlData } = supabase.storage
        .from('team-photos')
        .getPublicUrl(data.path);

    return urlData.publicUrl;
}