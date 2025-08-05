
interface RoomType {
  type: string;
  capacity: number;
  price: number;
  count?: number;
}

interface RoomMatch {
  rooms: RoomType[];
  totalCapacity: number;
  totalPrice: number;
  matchType: 'single' | 'double' | 'mixed';
  efficiency: number; // Lower is better (less wasted capacity)
}

export const findBestRoomMatch = (requestedPeople: number, availableRooms: RoomType[]): RoomMatch[] => {
  const matches: RoomMatch[] = [];
  
  // Sort rooms by capacity and price for better matching
  const sortedRooms = [...availableRooms].sort((a, b) => {
    if (a.capacity === b.capacity) return a.price - b.price;
    return a.capacity - b.capacity;
  });

  // Strategy 1: Single room that can accommodate all guests
  sortedRooms.forEach(room => {
    if (room.capacity >= requestedPeople) {
      matches.push({
        rooms: [{ ...room, count: 1 }],
        totalCapacity: room.capacity,
        totalPrice: room.price,
        matchType: 'single',
        efficiency: room.capacity - requestedPeople
      });
    }
  });

  // Strategy 2: Two identical rooms
  sortedRooms.forEach(room => {
    if (room.capacity * 2 >= requestedPeople && room.capacity < requestedPeople) {
      matches.push({
        rooms: [{ ...room, count: 2 }],
        totalCapacity: room.capacity * 2,
        totalPrice: room.price * 2,
        matchType: 'double',
        efficiency: (room.capacity * 2) - requestedPeople
      });
    }
  });

  // Strategy 3: Mixed room combinations (2 different room types)
  for (let i = 0; i < sortedRooms.length; i++) {
    for (let j = i + 1; j < sortedRooms.length; j++) {
      const room1 = sortedRooms[i];
      const room2 = sortedRooms[j];
      const totalCapacity = room1.capacity + room2.capacity;
      
      if (totalCapacity >= requestedPeople && 
          room1.capacity < requestedPeople && 
          room2.capacity < requestedPeople) {
        matches.push({
          rooms: [
            { ...room1, count: 1 },
            { ...room2, count: 1 }
          ],
          totalCapacity,
          totalPrice: room1.price + room2.price,
          matchType: 'mixed',
          efficiency: totalCapacity - requestedPeople
        });
      }
    }
  }

  // Sort matches by efficiency (least waste), then by price, then by match type preference
  return matches.sort((a, b) => {
    if (a.efficiency !== b.efficiency) return a.efficiency - b.efficiency;
    if (a.totalPrice !== b.totalPrice) return a.totalPrice - b.totalPrice;
    
    // Prefer single rooms over doubles over mixed
    const typeOrder = { single: 1, double: 2, mixed: 3 };
    return typeOrder[a.matchType] - typeOrder[b.matchType];
  });
};

export const getRoomTypeColor = (roomType: string): string => {
  const colors = {
    economy: 'from-green-500 to-emerald-600',
    standarddelux: 'from-blue-500 to-indigo-600',
    suite: 'from-purple-500 to-pink-600',
    family: 'from-orange-500 to-red-600'
  };
  return colors[roomType as keyof typeof colors] || 'from-gray-500 to-slate-600';
};

export const formatRoomTypeName = (roomType: string): string => {
  const names = {
    economy: 'Economy Room',
    standarddelux: 'Standard Deluxe',
    suite: 'Suite Room',
    family: 'Family Room'
  };
  return names[roomType as keyof typeof names] || roomType;
};
