import { createContext, useContext, useEffect, useState } from "react";

export interface User {
  _id: string;
  email: string;
  password: string;
  isAdmin: boolean;
}

interface AccountContextType {
  user: User | null;
  users: User[] | null;
  create: (email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  signout: () => Promise<void>;
  getAllUsers: () => Promise<void>;
  updateUserAdmin: (userId: string, isAdmin: boolean) => Promise<void>;
}

const AccountContext = createContext<AccountContextType>({
  user: null,
  users: null,
  create: async () => {},
  login: async () => {},
  signout: async () => {},
  getAllUsers: async () => {},
  updateUserAdmin: async () => {},
});

interface AccountProviderProps {
  children: React.ReactNode;
}

export const AccountProvider: React.FC<AccountProviderProps> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[] | null>(null);

  const checkAdminAccess = () => {
    return user && user.isAdmin;
  };

  const checkLoggedIn = async () => {
    const response = await fetch("/api/users/auth", {
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
  };

  useEffect(() => {
    checkLoggedIn();
  }, []);

  const create = async (email: string, password: string) => {
    const response = await fetch("/api/users/create", {
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
    } else {
      const errorData = await response.json();
      throw new Error(JSON.stringify(errorData));
    }
  };

  const login = async (email: string, password: string) => {
    const response = await fetch("/api/users/login", {
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
    } else {
      const errorData = await response.json();
      throw new Error(JSON.stringify(errorData));
    }
  };

  const signout = async () => {
    const response = await fetch("/api/users/logout", {
      method: "POST",
      credentials: "include",
    });
    if (response.ok) {
      setUser(null);
    }
  };

  const getAllUsers = async () => {
    if (!checkAdminAccess()) {
      return;
    }

    const response = await fetch("/api/users/", {
      method: "GET",
      credentials: "include",
    });
    if (response.ok) {
      const users = await response.json();
      setUsers(users);
    }
  };

  const updateUserAdmin = async (userId: string, isAdmin: boolean) => {
    if (!checkAdminAccess()) {
      return;
    }

    const response = await fetch(`/api/users/${userId}`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isAdmin }),
    });

    if (response.ok) {
      const updatedUser = await response.json();

      // Update the user object in the context
      setUser((prevUser) => {
        if (prevUser && prevUser._id === updatedUser._id) {
          // Preserve other properties of the user object
          return { ...prevUser, isAdmin: updatedUser.isAdmin };
        }
        return prevUser;
      });
    }
  };

  return (
    <AccountContext.Provider
      value={{
        user,
        users,
        create,
        login,
        signout,
        getAllUsers,
        updateUserAdmin,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};

export const useAccount = () => {
  return useContext(AccountContext);
};
