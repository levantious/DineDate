import { QuickReplies } from "react-native-gifted-chat";

export type Message = {
  _id: number;
  text: string;
  createdAt: Date;
  user: User;
};

export type User = {
  _id: number;
  name: string;
  avatar: string;
};

export interface IMessage {
  _id: string | number;
  text: string;
  createdAt: Date | number;
  user: User;
  image?: string;
  video?: string;
  audio?: string;
  system?: boolean;
  sent?: boolean;
  received?: boolean;
  pending?: boolean;
  quickReplies?: QuickReplies;
}
