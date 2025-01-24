// room.model.ts
export interface Room {
    id: number;            // Ensure 'id' is always a number
    name: string;
    description: string;
    imageUrl: string;
    available: boolean; // New property for availability
    created_at: Date;   // New property for creation timestamp
    updated_at: Date;   // New property for last update timestamp
  }
  