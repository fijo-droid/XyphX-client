import { Employee } from '@/data/teamData';
import {
  fetchTeam as getTeamFromDb,
  addEmployee as createEmpInDb,
  updateEmployee as updateEmpInDb,
  deleteEmployee as deleteEmpFromDb,
  uploadTeamPhoto as uploadPhotoToBucket,
} from '@/services/teamService'; // Verify this path matches your teamService location!

export const API_CONFIG = {
  supabaseUrl: (import.meta.env.VITE_SUPABASE_URL as string) || '',
  supabaseAnonKey: (import.meta.env.VITE_SUPABASE_ANON_KEY as string) || '',
  storageBucket: 'team-photos',
};
// ─── UNIFIED API SERVICE EXPORTS ──────────────────────────────────────────────
export const api = {
  // Fetch all employee records from Supabase
  getEmployees: async (): Promise<Employee[]> => {
    return await getTeamFromDb();
  },

  // Insert a new employee into Supabase
  createEmployee: async (employee: Employee): Promise<Employee> => {
    return await createEmpInDb(employee);
  },

  // Update an existing employee record
  updateEmployee: async (employee: Employee): Promise<Employee> => {
    return await updateEmpInDb(employee);
  },

  // Delete an employee by UUID
  deleteEmployee: async (id: string): Promise<void> => {
    return await deleteEmpFromDb(id);
  },

  // Upload an avatar/photo file to Supabase Storage
  uploadPhoto: async (file: File): Promise<string> => {
    return await uploadPhotoToBucket(file);
  },
};

export default api;