import React, { useEffect, useState } from "react";
import app from "../config/firebaseConfig.js";
import { newTeacher } from "../helpers/queries";
import { newTeacher as createTeacher } from "../helpers/factories";

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
  await auth
    .createUserWithEmailAndPassword(username, password)
    .then(snapshot => console.log(snapshot))
    .catch(e => console.log(e));
};

export { AuthContext, AuthProvider, CreateUser };
