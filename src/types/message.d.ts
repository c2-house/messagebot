export interface PromptParams {
  relation: string;
  name?: string;
  reason: string;
  manner: string;
}

export interface IMessage {
  from: 'bot' | 'user';
  content: string;
  copyId?: string;
  animation?: MessageAnimation;
}

export type MessageAnimation = 'fadeIn' | 'fadeInDelay';
