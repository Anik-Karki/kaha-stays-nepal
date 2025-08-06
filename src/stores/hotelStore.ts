
import { create } from 'zustand';

export interface Room {
  id: string;
  name: string;
  type: 'single' | 'double' | 'suite' | 'family' | 'deluxe';
  capacity: number;
  price: number;
  status: 'available' | 'occupied' | 'maintenance' | 'unavailable';
  amenities: string[];
  images: string[];
  bookings: number;
  description: string;
}

export interface Booking {
  id: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  roomId: string;
  roomName: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  amount: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  specialRequests?: string;
  createdAt: string;
  source: 'app' | 'web' | 'phone' | 'qr';
}

export interface Guest {
  id: string;
  name: string;
  email: string;
  phone: string;
  lastStay: string;
  totalStays: number;
  tags: string[];
  vip: boolean;
  blacklisted: boolean;
  totalSpent: number;
}

export interface Notification {
  id: string;
  type: 'booking' | 'cancellation' | 'message' | 'system';
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
}

interface HotelState {
  rooms: Room[];
  bookings: Booking[];
  guests: Guest[];
  notifications: Notification[];
  addRoom: (room: Omit<Room, 'id'>) => void;
  updateRoom: (id: string, updates: Partial<Room>) => void;
  deleteRoom: (id: string) => void;
  updateBookingStatus: (id: string, status: Booking['status']) => void;
  markNotificationRead: (id: string) => void;
  addNotification: (notification: Omit<Notification, 'id'>) => void;
}

// Mock data
const MOCK_ROOMS: Room[] = [
  {
    id: '1',
    name: 'Annapurna Suite',
    type: 'suite',
    capacity: 4,
    price: 8500,
    status: 'available',
    amenities: ['WiFi', 'AC', 'Balcony', 'Mountain View', 'Mini Bar'],
    images: ['🏔️', '🛏️', '🛁'],
    bookings: 15,
    description: 'Luxury suite with stunning Annapurna mountain views'
  },
  {
    id: '2',
    name: 'Everest Deluxe',
    type: 'deluxe',
    capacity: 2,
    price: 6500,
    status: 'occupied',
    amenities: ['WiFi', 'AC', 'Mountain View', 'Room Service'],
    images: ['🏔️', '🛏️'],
    bookings: 22,
    description: 'Premium room with Everest views'
  },
  {
    id: '3',
    name: 'Kathmandu Classic',
    type: 'double',
    capacity: 2,
    price: 3500,
    status: 'available',
    amenities: ['WiFi', 'Fan', 'City View'],
    images: ['🏙️', '🛏️'],
    bookings: 18,
    description: 'Comfortable double room with city views'
  }
];

const MOCK_BOOKINGS: Booking[] = [
  {
    id: '1',
    guestName: 'Ram Sharma',
    guestEmail: 'ram@email.com',
    guestPhone: '+977-9841234567',
    roomId: '1',
    roomName: 'Annapurna Suite',
    checkIn: '2024-01-20',
    checkOut: '2024-01-23',
    guests: 2,
    amount: 25500,
    status: 'confirmed',
    specialRequests: 'Mountain view preferred',
    createdAt: '2024-01-15',
    source: 'app'
  },
  {
    id: '2',
    guestName: 'Maya Gurung',
    guestEmail: 'maya@email.com',
    guestPhone: '+977-9851234567',
    roomId: '2',
    roomName: 'Everest Deluxe',
    checkIn: '2024-01-18',
    checkOut: '2024-01-20',
    guests: 2,
    amount: 13000,
    status: 'pending',
    createdAt: '2024-01-16',
    source: 'web'
  }
];

const MOCK_GUESTS: Guest[] = [
  {
    id: '1',
    name: 'Ram Sharma',
    email: 'ram@email.com',
    phone: '+977-9841234567',
    lastStay: '2024-01-23',
    totalStays: 5,
    tags: ['VIP', 'Frequent'],
    vip: true,
    blacklisted: false,
    totalSpent: 125000
  },
  {
    id: '2',
    name: 'Maya Gurung',
    email: 'maya@email.com',
    phone: '+977-9851234567',
    lastStay: '2024-01-10',
    totalStays: 2,
    tags: ['Regular'],
    vip: false,
    blacklisted: false,
    totalSpent: 45000
  }
];

export const useHotelStore = create<HotelState>((set) => ({
  rooms: MOCK_ROOMS,
  bookings: MOCK_BOOKINGS,
  guests: MOCK_GUESTS,
  notifications: [
    {
      id: '1',
      type: 'booking',
      title: 'New Booking',
      message: 'New booking from Maya Gurung for Everest Deluxe',
      read: false,
      createdAt: '2024-01-16T10:30:00Z'
    }
  ],
  addRoom: (room) => set((state) => ({
    rooms: [...state.rooms, { ...room, id: Date.now().toString() }]
  })),
  updateRoom: (id, updates) => set((state) => ({
    rooms: state.rooms.map(room => room.id === id ? { ...room, ...updates } : room)
  })),
  deleteRoom: (id) => set((state) => ({
    rooms: state.rooms.filter(room => room.id !== id)
  })),
  updateBookingStatus: (id, status) => set((state) => ({
    bookings: state.bookings.map(booking => 
      booking.id === id ? { ...booking, status } : booking
    )
  })),
  markNotificationRead: (id) => set((state) => ({
    notifications: state.notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    )
  })),
  addNotification: (notification) => set((state) => ({
    notifications: [{ ...notification, id: Date.now().toString() }, ...state.notifications]
  }))
}));
