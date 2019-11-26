import React, { useEffect, useState } from "react";
import app from "../config/firebaseConfig.js";

const auth = app.auth();
const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    app.auth().onAuthStateChanged(setCurrentUser);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        currentUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const CreateUser = async (username, password) => {
  return await auth
    .createUserWithEmailAndPassword(username, password)
    .then(snapshot => snapshot.user.uid)
    .catch(e => console.log(e));
};

export { AuthContext, AuthProvider, CreateUser };
