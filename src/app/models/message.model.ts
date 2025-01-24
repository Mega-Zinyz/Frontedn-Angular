// src/app/models/message.model.ts
export interface Message {
    from: 'user' | 'bot';
    text: string;
    imageUrl?: string; // Optional property for room images
  }
  