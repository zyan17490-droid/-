export type CharacterKey = 'nezha' | 'aobing' | 'shengongbao' | 'lijing' | 'yinfuren';

export interface CharacterInfo {
  name: string;
  personality: string;
  tag: string;
  quote: string;
  color: string;
  prompt: string;
}

export interface Question {
  id: number;
  text: string;
  options: {
    text: string;
    character: CharacterKey;
  }[];
}
