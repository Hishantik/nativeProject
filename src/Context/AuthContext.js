import React, { createContext, useState } from 'react';
import { firebase } from '../../config.js';
// import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider value={{
      user,
      setUser,
      login: async (email, password) => {
        try {
          await firebase.auth().signInWithEmailAndPassword(email, password);
        } catch (err) {
          alert("Please enter valid Email and password");
        }
      },


      signup: async (email, password, userName, dobLabel) => {
        await firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(() => {
            firebase.auth().currentUser.sendEmailVerification({
              handleCodeInApp: true,
              url: 'https://crypto-46376.web.app',
            })
              .then(() => {
                alert('Verification email sent please check it in your gmail spam section')
              }).catch((err) => {
                alert(err)
              })
              .then(() => {
                firebase.firestore().collection('users')
                  .doc(firebase.auth().currentUser.uid)
                  .set({
                    userName,
                    email,
                    dobLabel,
                  })
              })
              .catch((err) => {
                console.log(err)
              })
          })
          .catch((err) => {
            console.log(err)
          })
      },



      logout: async () => {
        try {
          await firebase.auth().signOut();
        } catch (err) {
          console.log(err);
        }
      }
    }}>
      {children}
    </AuthContext.Provider >

  );
}









// const [userToken, setUserToken] = useState(null);

//   const login = () => {
//     setIsLoading(true);
//     setUserToken('hsgjjs8668');
//     AsyncStorage.setItem('userToken', 'hsgjjs8668');
//     setIsLoading(false);
//     try {
//       auth().signInWithEmailAndPassword()
//     }
//   }

//   const logout = () => {
//     setIsLoading(true);
//     setUserToken(null);
//     AsyncStorage.removeItem('userToken');
//     setIsLoading(false);
//   }

//   const isLoggedIn = async () => {
//     try {
//       setIsLoading(true);
//       let userToken = AsyncStorage.getItem('userToken');
//       setUserToken(userToken);
//       setIsLoading(false);
//     } catch (err) {
//       console.log(`isLogged in error ${err}`);
//     }
//   }

//   useEffect(() => {
//     isLoggedIn();
//   }, []);

