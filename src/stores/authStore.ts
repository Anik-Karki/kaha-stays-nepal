
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'hotelOwner' | 'staff';
  hotelId: string;
  hotelName: string;
}

interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

// Demo credentials
const DEMO_USERS = {
  'admin@hotel.com': {
    id: 'admin_1',
    name: 'John Admin',
    email: 'admin@hotel.com',
    role: 'admin' as const,
    hotelId: 'hotel_123',
    hotelName: 'Hotel Everest View'
  },
  'owner@hotel.com': {
    id: 'owner_1',
    name: 'Sarah Owner',
    email: 'owner@hotel.com',
    role: 'hotelOwner' as const,
    hotelId: 'hotel_123',
    hotelName: 'Hotel Everest View'
  },
  'staff@hotel.com': {
    id: 'staff_1',
    name: 'Mike Staff',
    email: 'staff@hotel.com',
    role: 'staff' as const,
    hotelId: 'hotel_123',
    hotelName: 'Hotel Everest View'
  }
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isLoggedIn: false,
      login: async (email: string, password: string) => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const user = DEMO_USERS[email as keyof typeof DEMO_USERS];
        if (user && password === 'demo123') {
          set({ user, isLoggedIn: true });
          return true;
        }
        return false;
      },
      logout: () => {
        set({ user: null, isLoggedIn: false });
      }
    }),
    {
      name: 'auth-storage'
    }
  )
);
