import { createContext, useContext, useState } from "react";

interface User {
  email: string;
  password: string;
  isAdmin: boolean;
}

interface AccountContextType {
  user: User | null;
  create: (username: string, password: string) => Promise<void>;
  login: (username: string, password: string) => Promise<void>;
  signout: () => Promise<void>;
}

const AccountContext = createContext<AccountContextType>({
  user: null,
  create: async () => {},
  login: async () => {},
  signout: async () => {},
});

interface AccountProviderProps {
  children: React.ReactNode;
}

export const AccountProvider: React.FC<AccountProviderProps> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  // const [users, setUsers] = useState<User[] | null>(null);
  // const { user: loggedInUser } = useAccount();

  // useEffect(() => {
  //   const checkLoggedIn = async () => {
  //     const response = await fetch("http://localhost:3000/api/users/auth", {
  //       method: "GET",
  //       credentials: "include",
  //     });
  //     if (response.ok) {
  //       const userFromSession = await response.json();
  //       setUser(userFromSession);
  //     }
  //   };

  //   checkLoggedIn();
  // }, []);

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

  return (
    <AccountContext.Provider value={{ user, create, login, signout }}>
      {children}
    </AccountContext.Provider>
  );
};

export const useAccount = () => {
  return useContext(AccountContext);
};
