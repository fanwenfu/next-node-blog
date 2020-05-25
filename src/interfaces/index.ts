// You can include shared interfaces/types in a separate file
// and then use them in any component by importing them. For
// example, to import the interface below do:
//
// import User from 'path/to/interfaces';

export type User = {
  id: number;
  name: string;
};
export type ArticleData = {
  id: number;
  title: string;
  html: string;
  content: string;
  description: string;
  date: string;
  timestamp: string;
  author: string;
};
export type UserData = {
  id: number;
  name: string;
  description: string;
  introduction: string;
  subtitle: string;
  datebirth: string;
};
