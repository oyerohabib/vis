import { User } from "@/types";
import React, {
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";
import { useSession } from "next-auth/react";
// Add Your Props here
interface UserContextProps {
  user: User;
  setUser: React.Dispatch<SetStateAction<User>>;
}
export const UserContext = createContext({} as UserContextProps);

const UserContextProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: userSession } = useSession();

  const [user, setUser] = useState<User>({} as User);

  useLayoutEffect(() => {
    if (!userSession?.user) return;
    // @ts-expect-error
    setUser({
      ...userSession?.user,
    });
  }, [userSession]);

  useLayoutEffect(() => {
    const fetchUserData = async () => {
      const userFromLocal = window.localStorage.getItem("user");

      if (!userFromLocal) return;

      const parsedUser: User = JSON.parse(userFromLocal);
      const userWithImage = {
        ...parsedUser,
        image: parsedUser.image
          ? parsedUser.image
          : `https://ui-avatars.com/api/?name=${parsedUser.fullName}&background=random`,
      };

      setUser(userWithImage);
    };

    fetchUserData();
  }, []);

  const value = useMemo(() => ({ user, setUser }), [user]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

// Call this function whenever you want to use the context
export const useUserCtx = () => {
  const ctx = useContext(UserContext);

  if (!ctx) {
    throw new Error("useUserCtx must be used within a UserContextProvider");
  }
  return ctx;
};

export default UserContextProvider;
