import { User } from "@/types";
import React, {
  SetStateAction,
  createContext,
  useContext,
  startTransition,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";
import { getme } from "@/actions/user";
import { useSession } from "next-auth/react";
// Add Your Props here
interface UserContextProps {
  user: User;
  setUser: React.Dispatch<SetStateAction<User>>;
  updateUser: () => void;
}
export const UserContext = createContext({} as UserContextProps);

const UserContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User>({} as User);
  const { data: userSession } = useSession();

  useLayoutEffect(() => {
    if (!userSession?.user) return;
    // @ts-expect-error
    setUser({
      ...userSession?.user,
    });
  }, [userSession]);

  useLayoutEffect(() => {
    const userFromLocal = window.localStorage.getItem("user");
    const updatedUserFromLocal = window.localStorage.getItem("updatedUser");

    if (!updatedUserFromLocal) {
      if (userFromLocal) {
        const parsedUser: User = JSON.parse(userFromLocal);
        const userWithImage = {
          ...parsedUser,
          image: parsedUser.image
            ? parsedUser.image
            : `https://ui-avatars.com/api/?name=${parsedUser.fullName}&background=random`,
        };
        setUser(userWithImage);
      }
      return;
    }

    const parsedUpdatedUser: User = JSON.parse(updatedUserFromLocal);
    const updatedUserWithImage = {
      ...parsedUpdatedUser,
      image: parsedUpdatedUser.image
        ? parsedUpdatedUser.image
        : `https://ui-avatars.com/api/?name=${parsedUpdatedUser.fullName}&background=random`,
    };

    setUser(updatedUserWithImage);
    localStorage.removeItem("user");
  }, []);

  useLayoutEffect(() => {
    const ferchData = async () => {
      startTransition(() =>
        getme().then((res) => {
          setUser({
            ...res.user,
            image: res.user.image
              ? res.user.image
              : `https://ui-avatars.com/api/?name=${res.user.fullName}&background=random`,
          });
        })
      );
    };
    ferchData();
    const interval = setInterval(ferchData, 5000);
    return () => clearInterval(interval);
  }, []);

  const updateUser = async () => {
    startTransition(() =>
      getme().then((res) => {
        setUser({
          ...res.user,
          image: res.user.image
            ? res.user.image
            : `https://ui-avatars.com/api/?name=${res.user.fullName}&background=random`,
        });
      })
    );
  };

  const value = useMemo(() => ({ user, setUser, updateUser }), [user]);

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
