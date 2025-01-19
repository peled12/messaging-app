interface Message {
  message_id: string;
  sender: number; // a user id
  replied_id?: string;
  read_by: number[]; // array of user id
  sent_at: Date;
}

interface Chat {
  id: string;
  created_at: Date;
  chatters: number[]; // array of user id
  messages: Message[];
  title?: string; // if undefined, its a DM
}

export default Chat;
