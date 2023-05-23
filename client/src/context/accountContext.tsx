import { createContext, useContext, useEffect, useState } from "react";

interface User {
  email: string;
  password: string;
  isAdmin: boolean;
}

interface AccountContextType {
  user: User | null;
  users: User[] | null;
  create: (username: string, password: string) => Promise<void>;
  login: (username: string, password: string) => Promise<void>;
  signout: () => Promise<void>;
  getAllUsers: () => Promise<void>;
}

const AccountContext = createContext<AccountContextType>({
  user: null,
  users: null,
  create: async () => {},
  login: async () => {},
  signout: async () => {},
  getAllUsers: async () => {},
});

interface AccountProviderProps {
  children: React.ReactNode;
}

export const AccountProvider: React.FC<AccountProviderProps> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[] | null>(null);
  // const { user: loggedInUser } = useAccount();

  const checkLoggedIn = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/users/auth", {
        credentials: "include",
      });
      if (response.status === 204) {
        setUser(null);
      } else if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setUser(data.user);
        }
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Error checking logged in status:", error);
      setUser(null);
    }
  };

  useEffect(() => {
    checkLoggedIn();
  }, []);

  const create = async (email: string, password: string) => {
    const response = await fetch("http://localhost:3000/api/users/create", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    if (response.ok) {
      const user = await response.json();
      setUser(user);
    }
  };

  const login = async (email: string, password: string) => {
    const response = await fetch("http://localhost:3000/api/users/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    if (response.ok) {
      const user = await response.json();
      setUser(user);
    }
  };

  const signout = async () => {
    const response = await fetch("http://localhost:3000/api/users/signout", {
      method: "POST",
      credentials: "include",
    });
    if (response.ok) {
      setUser(null);
    }
  };

  const getAllUsers = async () => {
    const response = await fetch("http://localhost:3000/api/users/", {
      method: "GET",
      credentials: "include",
    });
    if (response.ok) {
      const users = await response.json();
      setUsers(users);
    }
  };

  return (
    <AccountContext.Provider
      value={{ user, users, create, login, signout, getAllUsers }}
    >
      {children}
    </AccountContext.Provider>
  );
};

export const useAccount = () => {
  return useContext(AccountContext);
};
