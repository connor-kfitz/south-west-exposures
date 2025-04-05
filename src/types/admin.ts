export type NextAuthUser = {
  id: string;
  email: string;
  password: string;
  name: string;
}

export type User = {
  email: string;
  name: string;
  profileImage: string;
}

export interface DashboardAlert {
  open: boolean;
  title: string;
  description: string;
  deleteId?: string;
  onConfirm?: (id: string) => Promise<boolean>;
}
