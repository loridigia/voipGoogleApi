export interface User {
  firstname?: string;
  lastname?: string;
  username?: string;
  password?: string;
  token?: string;
}

export interface Ticket {

  id?: number;

  event?: string;

  theater?: string;

}


export interface Todo {
  userId?: number;
  id?: number;
  title?: string;
  completed?: boolean;
}


export interface Menu {
  text: string;
  link: string[];
}
