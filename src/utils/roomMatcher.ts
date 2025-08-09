// Room matching utility functions

export interface RoomType {
  type: string;
  name: string;
  capacity: number;
  price: number;
  features: string[];
  available: number;
}

export interface RoomMatch {
  rooms: RoomType[];
  totalPrice: number;
  totalCapacity: number;
  roomCount: number;
  guestDistribution: number[];
}

export const findBestRoomMatch = (guestCount: number, roomTypes: RoomType[], requestedRooms: number = 1): RoomMatch[] => {
  const availableRooms = roomTypes.filter(room => room.available > 0);
  
  if (availableRooms.length === 0) {
    return [];
  }

  // Sort rooms by capacity and price
  const sortedRooms = availableRooms.sort((a, b) => {
    if (a.capacity === b.capacity) {
      return a.price - b.price;
    }
    return a.capacity - b.capacity;
  });

  const matches: RoomMatch[] = [];

  // Calculate optimal room distribution
  const calculateRoomCombinations = (guests: number, rooms: number): RoomMatch[] => {
    const combinations: RoomMatch[] = [];
    
    // Try to distribute guests evenly across requested rooms
    const guestsPerRoom = Math.ceil(guests / rooms);
    
    // Find rooms that can accommodate the guest distribution
    const suitableRooms = sortedRooms.filter(room => room.capacity >= guestsPerRoom);
    
    if (suitableRooms.length === 0) {
      // If no single room can handle the distribution, try larger rooms
      const largerRooms = sortedRooms.filter(room => room.capacity >= Math.ceil(guests / 2));
      if (largerRooms.length > 0) {
        // Use larger rooms and adjust room count
        const adjustedRooms = Math.ceil(guests / largerRooms[0].capacity);
        return calculateRoomCombinations(guests, adjustedRooms);
      }
    }

    // Generate combinations for requested number of rooms
    if (rooms === 1) {
      // Single room solutions
      for (const room of sortedRooms) {
        if (room.capacity >= guests && room.available >= 1) {
          combinations.push({
            rooms: [room],
            totalPrice: room.price,
            totalCapacity: room.capacity,
            roomCount: 1,
            guestDistribution: [Math.min(guests, room.capacity)]
          });
        }
      }
    } else if (rooms === 2) {
      // Two room combinations
      for (let i = 0; i < sortedRooms.length; i++) {
        for (let j = i; j < sortedRooms.length; j++) {
          const room1 = sortedRooms[i];
          const room2 = sortedRooms[j];
          
          if (room1.capacity + room2.capacity >= guests && 
              room1.available >= 1 && 
              (i === j ? room1.available >= 2 : room2.available >= 1)) {
            
            const guest1 = Math.min(Math.ceil(guests / 2), room1.capacity);
            const guest2 = Math.min(guests - guest1, room2.capacity);
            
            combinations.push({
              rooms: i === j ? [room1, room1] : [room1, room2],
              totalPrice: room1.price + room2.price,
              totalCapacity: room1.capacity + room2.capacity,
              roomCount: 2,
              guestDistribution: [guest1, guest2]
            });
          }
        }
      }
    } else {
      // Multiple room combinations (3+ rooms)
      const bestRoom = suitableRooms[0] || sortedRooms[0];
      if (bestRoom && bestRoom.available >= rooms) {
        const guestPerRoom = Math.ceil(guests / rooms);
        const distribution = Array(rooms).fill(0).map((_, index) => {
          const remainingGuests = guests - (index * guestPerRoom);
          return Math.min(guestPerRoom, remainingGuests, bestRoom.capacity);
        }).filter(g => g > 0);

        combinations.push({
          rooms: Array(rooms).fill(bestRoom),
          totalPrice: bestRoom.price * rooms,
          totalCapacity: bestRoom.capacity * rooms,
          roomCount: rooms,
          guestDistribution: distribution
        });
      }
    }

    return combinations;
  };

  // Get combinations for requested rooms
  matches.push(...calculateRoomCombinations(guestCount, requestedRooms));

  // Also suggest optimal room count if different from requested
  const optimalRooms = calculateOptimalRooms(guestCount);
  if (optimalRooms !== requestedRooms) {
    matches.push(...calculateRoomCombinations(guestCount, optimalRooms));
  }

  // Add single room options for comparison
  for (const room of sortedRooms) {
    if (room.capacity >= guestCount) {
      matches.push({
        rooms: [room],
        totalPrice: room.price,
        totalCapacity: room.capacity,
        roomCount: 1,
        guestDistribution: [guestCount]
      });
    }
  }

  // Remove duplicates and sort by total price
  const uniqueMatches = matches.filter((match, index, self) => 
    index === self.findIndex(m => 
      m.totalPrice === match.totalPrice && 
      m.roomCount === match.roomCount &&
      JSON.stringify(m.rooms.map(r => r.id)) === JSON.stringify(match.rooms.map(r => r.id))
    )
  );

  return uniqueMatches.sort((a, b) => {
    // Prioritize exact room count match, then by price
    if (a.roomCount === requestedRooms && b.roomCount !== requestedRooms) return -1;
    if (b.roomCount === requestedRooms && a.roomCount !== requestedRooms) return 1;
    return a.totalPrice - b.totalPrice;
  });
};

// Helper function to calculate optimal room count
export const calculateOptimalRooms = (guests: number): number => {
  if (guests <= 0) return 1;
  if (guests <= 2) return 1;
  if (guests <= 4) return 2;
  if (guests <= 6) return 3;
  return Math.ceil(guests / 2);
};

export const getRoomTypeColor = (roomType: string): string => {
  const colors: { [key: string]: string } = {
    economy: 'from-blue-400 to-blue-600',
    standarddelux: 'from-emerald-400 to-emerald-600',
    suite: 'from-purple-400 to-purple-600',
    family: 'from-orange-400 to-orange-600'
  };
  
  return colors[roomType] || 'from-gray-400 to-gray-600';
};

export const formatRoomTypeName = (roomType: string): string => {
  const names: { [key: string]: string } = {
    economy: 'Economy Room',
    standarddelux: 'Standard Deluxe',
    suite: 'Suite Room',
    family: 'Family Room'
  };
  
  return names[roomType] || roomType;
};