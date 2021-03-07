import { createContext } from "react";

const Context = createContext({
  user: {},
  signInWithGoogle: () => {},
  signOut: () => {},
});

export default Context;
