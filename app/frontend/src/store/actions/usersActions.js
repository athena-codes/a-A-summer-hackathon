import { SET_USER } from "./sessionAction";

const { doc, getDoc } = require("firebase/firestore");
const { db } = require("../../firebase/firebaseConfig");


export const LOAD_USERS = () => "users/LOAD_USERS";

const setUser = (user) => ({
    type: SET_USER,
    payload: user,
  });

const load = (users) => ({
    type: LOAD_USERS,
    users,
});

export const fetchSingleUser = (uid) => async (dispatch) => {
    try {
      const userDocRef = doc(db, 'users', uid);
      const userDoc = await getDoc(userDocRef);
  
      if (userDoc.exists()) {
        const userData = userDoc.data();
        dispatch(setUser(userData)); // Update Redux state with user data
      } else {
        console.error('User not found');
      }
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

export const fetchUsers = () => async (dispatch) => {
    const response = await fetch("/api/users/all-users");

    if (response.ok) {
        const users = await response.json();
        return dispatch(load(users));
    } else {
        console.log("Internal server error");
    }
};
