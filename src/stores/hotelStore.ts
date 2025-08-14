
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Room {
  id: string;
  name: string;
  type: 'economy' | 'standard' | 'deluxe' | 'suite' | 'family';
  capacity: number;
  quantity: number; // How many rooms of this type
  price: number;
  status: 'available' | 'occupied' | 'maintenance' | 'unavailable';
  amenities: string[];
  images: string[];
  bookings: number;
  description: string;
  published: boolean;
  features: string[];
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
  status: 'pending' | 'confirmed' | 'checked-in' | 'cancelled' | 'completed';
  specialRequests?: string;
  createdAt: string;
  source: 'app' | 'web' | 'phone' | 'qr';
  paymentStatus: 'pending' | 'paid' | 'refunded';
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
  nationality: string;
  messages: Message[];
}

export interface Message {
  id: string;
  guestId: string;
  content: string;
  sender: 'guest' | 'hotel';
  timestamp: string;
  read: boolean;
}

export interface Notification {
  id: string;
  type: 'booking' | 'cancellation' | 'message' | 'payment' | 'system';
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export interface HotelProfile {
  id: string;
  name: string;
  description: string;
  address: string;
  phone: string;
  email: string;
  checkInTime: string;
  checkOutTime: string;
  cancellationPolicy: string;
  profileImage: string;
  coverImage: string;
  kahaTag: string;
}

export interface Analytics {
  totalBookings: number;
  totalRevenue: number;
  occupancyRate: number;
  totalGuests: number;
  bookingTrends: { date: string; bookings: number; revenue: number }[];
  roomOccupancy: { roomType: string; occupancy: number }[];
  guestNationality: { country: string; count: number }[];
  bookingSources: { source: string; count: number }[];
}

interface HotelState {
  // Data
  rooms: Room[];
  bookings: Booking[];
  guests: Guest[];
  notifications: Notification[];
  hotelProfile: HotelProfile;
  analytics: Analytics;
  
  // Room Management
  addRoom: (room: Omit<Room, 'id'>) => void;
  updateRoom: (id: string, updates: Partial<Room>) => void;
  deleteRoom: (id: string) => void;
  toggleRoomStatus: (id: string, published: boolean) => void;
  
  // Booking Management
  updateBookingStatus: (id: string, status: Booking['status']) => void;
  cancelBooking: (id: string) => void;
  
  // Guest Management
  addGuest: (guest: Omit<Guest, 'id'>) => void;
  updateGuest: (id: string, updates: Partial<Guest>) => void;
  sendMessage: (guestId: string, content: string) => void;
  markMessageRead: (messageId: string) => void;
  
  // Notifications
  markNotificationRead: (id: string) => void;
  addNotification: (notification: Omit<Notification, 'id'>) => void;
  
  // Hotel Profile
  updateHotelProfile: (updates: Partial<HotelProfile>) => void;
  
  // Analytics
  updateAnalytics: () => void;
}

// Mock Data
const MOCK_HOTEL_PROFILE: HotelProfile = {
  id: 'hotel_123',
  name: 'Hotel Everest View',
  description: 'A luxury hotel with stunning mountain views in the heart of Kathmandu',
  address: 'Thamel, Kathmandu, Nepal',
  phone: '+977-1-4567890',
  email: 'info@hoteleverestview.com',
  checkInTime: '14:00',
  checkOutTime: '12:00',
  cancellationPolicy: 'Free cancellation up to 24 hours before check-in',
  profileImage: '🏨',
  coverImage: '🏔️',
  kahaTag: 'everest-view'
};

const MOCK_ROOMS: Room[] = [
  {
    id: '1',
    name: 'Annapurna Suite',
    type: 'suite',
    capacity: 4,
    quantity: 2,
    price: 8500,
    status: 'available',
    amenities: ['wifi', 'ac', 'balcony', 'room_service'],
    images: [
      'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1605540436563-5bca919ae766?w=400&h=300&fit=crop'
    ],
    bookings: 15,
    description: 'Luxury suite with stunning Annapurna mountain views',
    published: true,
    features: ['Balcony', 'Mountain View', 'King Bed', 'Sitting Area']
  },
  {
    id: '2',
    name: 'Everest Deluxe',
    type: 'deluxe',
    capacity: 2,
    quantity: 5,
    price: 6500,
    status: 'occupied',
    amenities: ['wifi', 'ac', 'tv', 'room_service'],
    images: [
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=300&fit=crop'
    ],
    bookings: 22,
    description: 'Premium room with Everest views',
    published: true,
    features: ['Mountain View', 'Queen Bed', 'Work Desk']
  },
  {
    id: '3',
    name: 'Kathmandu Classic',
    type: 'standard',
    capacity: 2,
    quantity: 8,
    price: 3500,
    status: 'available',
    amenities: ['wifi', 'tv'],
    images: [
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400&h=300&fit=crop'
    ],
    bookings: 18,
    description: 'Comfortable double room with city views',
    published: true,
    features: ['City View', 'Double Bed', 'Private Bathroom']
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
    source: 'app',
    paymentStatus: 'paid'
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
    source: 'web',
    paymentStatus: 'pending'
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
    totalSpent: 125000,
    nationality: 'Nepal',
    messages: [
      {
        id: 'm1',
        guestId: '1',
        content: 'Hello, I would like to book another room for next month',
        sender: 'guest',
        timestamp: '2024-01-25T10:30:00Z',
        read: false
      }
    ]
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
    totalSpent: 45000,
    nationality: 'Nepal',
    messages: []
  }
];

const MOCK_ANALYTICS: Analytics = {
  totalBookings: 156,
  totalRevenue: 2450000,
  occupancyRate: 78,
  totalGuests: 89,
  bookingTrends: [
    { date: '2024-01-01', bookings: 12, revenue: 85000 },
    { date: '2024-01-02', bookings: 15, revenue: 105000 },
    { date: '2024-01-03', bookings: 8, revenue: 65000 },
    { date: '2024-01-04', bookings: 18, revenue: 125000 },
    { date: '2024-01-05', bookings: 22, revenue: 155000 }
  ],
  roomOccupancy: [
    { roomType: 'Suite', occupancy: 85 },
    { roomType: 'Deluxe', occupancy: 78 },
    { roomType: 'Standard', occupancy: 72 }
  ],
  guestNationality: [
    { country: 'Nepal', count: 45 },
    { country: 'India', count: 25 },
    { country: 'USA', count: 12 },
    { country: 'UK', count: 8 }
  ],
  bookingSources: [
    { source: 'App', count: 65 },
    { source: 'Web', count: 45 },
    { source: 'Phone', count: 25 },
    { source: 'QR', count: 15 }
  ]
};

export const useHotelStore = create<HotelState>()(
  persist(
    (set, get) => ({
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
      hotelProfile: MOCK_HOTEL_PROFILE,
      analytics: MOCK_ANALYTICS,

      // Room Management
      addRoom: (room) => set((state) => ({
        rooms: [...state.rooms, { ...room, id: Date.now().toString() }]
      })),
      
      updateRoom: (id, updates) => set((state) => ({
        rooms: state.rooms.map(room => room.id === id ? { ...room, ...updates } : room)
      })),
      
      deleteRoom: (id) => set((state) => ({
        rooms: state.rooms.filter(room => room.id !== id)
      })),
      
      toggleRoomStatus: (id, published) => set((state) => ({
        rooms: state.rooms.map(room => room.id === id ? { ...room, published } : room)
      })),

      // Booking Management
      updateBookingStatus: (id, status) => set((state) => ({
        bookings: state.bookings.map(booking => 
          booking.id === id ? { ...booking, status } : booking
        )
      })),
      
      cancelBooking: (id) => set((state) => ({
        bookings: state.bookings.map(booking => 
          booking.id === id ? { ...booking, status: 'cancelled' as const, paymentStatus: 'refunded' as const } : booking
        )
      })),

      // Guest Management
      addGuest: (guest) => set((state) => ({
        guests: [...state.guests, { ...guest, id: Date.now().toString() }]
      })),
      
      updateGuest: (id, updates) => set((state) => ({
        guests: state.guests.map(guest => guest.id === id ? { ...guest, ...updates } : guest)
      })),
      
      sendMessage: (guestId, content) => set((state) => ({
        guests: state.guests.map(guest => 
          guest.id === guestId ? {
            ...guest,
            messages: [...guest.messages, {
              id: Date.now().toString(),
              guestId,
              content,
              sender: 'hotel' as const,
              timestamp: new Date().toISOString(),
              read: true
            }]
          } : guest
        )
      })),
      
      markMessageRead: (messageId) => set((state) => ({
        guests: state.guests.map(guest => ({
          ...guest,
          messages: guest.messages.map(msg => 
            msg.id === messageId ? { ...msg, read: true } : msg
          )
        }))
      })),

      // Notifications
      markNotificationRead: (id) => set((state) => ({
        notifications: state.notifications.map(notif => 
          notif.id === id ? { ...notif, read: true } : notif
        )
      })),
      
      addNotification: (notification) => set((state) => ({
        notifications: [{ ...notification, id: Date.now().toString() }, ...state.notifications]
      })),

      // Hotel Profile
      updateHotelProfile: (updates) => set((state) => ({
        hotelProfile: { ...state.hotelProfile, ...updates }
      })),

      // Analytics
      updateAnalytics: () => {
        const state = get();
        const totalBookings = state.bookings.length;
        const totalRevenue = state.bookings
          .filter(b => b.paymentStatus === 'paid')
          .reduce((sum, b) => sum + b.amount, 0);
        const occupiedRooms = state.rooms.filter(r => r.status === 'occupied').length;
        const occupancyRate = Math.round((occupiedRooms / state.rooms.length) * 100);
        const totalGuests = state.guests.length;

        set((state) => ({
          analytics: {
            ...state.analytics,
            totalBookings,
            totalRevenue,
            occupancyRate,
            totalGuests
          }
        }));
      }
    }),
    {
      name: 'hotel-storage'
    }
  )
);
