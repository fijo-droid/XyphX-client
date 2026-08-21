import { supabase } from '../lib/supabase.ts'; // Adjust this path if your Supabase client lives elsewhere

/**
 * Employee data model for XyphX Team Directory.
 */
export interface Employee {
  id: string;
  employeeId?: string;
  name: string;
  role: string;
  department: 'Leadership' | 'AI & Research' | 'Engineering' | 'Design & UX' | 'People & Ops';
  photo?: string;
  bio?: string;
  skills?: string[];
  projects?: string[];
  email: string;
  linkedin?: string;
  github?: string;
  twitter?: string;
  portfolio?: string;
  joinedDate?: string;
  rank?: number;
}

const STORAGE_KEY = "xyphx_team_directory_v1";

// Empty fallback roster (No fake profiles)
export const DEFAULT_TEAM: Employee[] = [];

/**
 * Fetch real employee details uploaded by HR directly from Supabase
 */
export const fetchTeamFromSupabase = async (): Promise<Employee[]> => {
  try {
    const { data, error } = await supabase
      .from('employees')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    // Sync fetched data with local cache
    if (data) {
      saveStoredTeamMembers(data);
      return data;
    }
    return [];
  } catch (err) {
    console.error("Error fetching employee roster from Supabase:", err);
    return getStoredTeamMembers();
  }
};

/**
 * Add a new HR-inserted employee record to Supabase
 */
export const addEmployeeToSupabase = async (employee: Omit<Employee, 'id'>): Promise<Employee | null> => {
  try {
    const { data, error } = await supabase
      .from('employees')
      .insert([employee])
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (err) {
    console.error("Error inserting employee into Supabase:", err);
    return null;
  }
};

/**
 * Delete an employee record (HR management)
 */
export const deleteEmployeeFromSupabase = async (id: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('employees')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return true;
  } catch (err) {
    console.error("Error deleting employee from Supabase:", err);
    return false;
  }
};

/**
 * Retrieve cached team members from LocalStorage (Fallback)
 */
export const getStoredTeamMembers = (): Employee[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : DEFAULT_TEAM;
  } catch (error) {
    console.error("Failed to read cached team members from localStorage:", error);
    return DEFAULT_TEAM;
  }
};

/**
 * Save updated team roster locally
 */
export const saveStoredTeamMembers = (members: Employee[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(members));
  } catch (error) {
    console.error("Failed to save team members to localStorage:", error);
  }
};

/**
 * Clear cached local team data
 */
export const resetTeamToDefault = (): Employee[] => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error("Failed to reset team cache:", error);
  }
  return DEFAULT_TEAM;
};