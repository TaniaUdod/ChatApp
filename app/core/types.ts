export interface Chat {
  id: string;
  name: string;
  messages: Message[];
  createdBy: string;
}

export interface Message {
  id: string;
  chatId: string;
  text: string;
  timestamp: number;
}
