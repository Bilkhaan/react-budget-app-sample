import { firebase, googleAuthProvider } from '../firebase/firebase';

export const login = (uid) => {
  return {
    type: 'LOGIN',
    uid
  }
};

export const onLogout = () => {
  return {
    type: 'LOGOUT'
  }
};

export const startLogin = () => {
  return () => {
    return firebase.auth().signInWithPopup(googleAuthProvider);
  }
}

export const logout = () => {
  return () => {
    return firebase.auth().signOut();
  }
}