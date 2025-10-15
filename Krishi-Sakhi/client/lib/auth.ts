export type User = { id: string; name: string; phone: string } | null;

const CREDENTIALS = {
  phone: "9999999999",
  password: "sakhi123",
  name: "Demo Farmer",
};

const STORAGE_KEY = "krishi:user";

export function login(phone: string, password: string): User {
  if (phone === CREDENTIALS.phone && password === CREDENTIALS.password) {
    const user: User = { id: "1", name: CREDENTIALS.name, phone };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    return user;
  }
  return null;
}

export function signup(name: string, phone: string, password: string): User {
  // For the demo, treat signup as same as login but only allow the demo creds.
  if (phone === CREDENTIALS.phone && password === CREDENTIALS.password) {
    const user: User = { id: "1", name: name || CREDENTIALS.name, phone };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    return user;
  }
  return null;
}

export function getUser(): User {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? (JSON.parse(raw) as User) : null;
}

export function logout() {
  localStorage.removeItem(STORAGE_KEY);
}

export const demoCredentials = CREDENTIALS;
