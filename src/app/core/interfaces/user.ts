export interface User {
  id?: number;
  name: string;
  email: string;
  password?: string;
  role: 'student' | 'teacher';
  is_verified?: boolean;
  email_verified_at?: string | null;
  created_at?: string;
  updated_at?: string;
  remember_token?: string | null;
}
