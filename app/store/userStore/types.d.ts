export interface Creator {
  id: string;

  name: string;

  username: string;

  avatar: string;

  expertise: string;

  bio: string;

  github: string;

  twitter: string;

  // googleUser: GoogleUser;
}
export interface GoogleUser {
  iss: string;
  sub: string;
  aud: string;
  iat: number;
  exp: number;
  email: string;
  email_verified: boolean;
  name: string;
  picture: string;
  given_name: string;
  family_name: string;
  locale: string;
  hd: string;
}

interface UserState {
  user: Creator | null;
  setUser: (user: Creator | null) => void;
}
