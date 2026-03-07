export interface LoginDTO {
  user: {
    name: string;
    email: string;
    uuid: string;
  };
  escola: {
    uuid: string;
    name: string;
  };
  profile: {
    name: string;
    uuid: string;
  };
}
