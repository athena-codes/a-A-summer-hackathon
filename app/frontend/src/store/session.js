const {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
} = require("firebase/auth");
const { doc, setDoc } = require("firebase/firestore");
const { auth, db } = require("../firebase/firebaseConfig");

export const SET_USER = () => "session/SET_USER";

const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

export const authenticate = () => async (dispatch) => {
  const user = auth.currentUser;
  if (user) {
    dispatch(setUser(user));
  }
};

export const login = (email, password) => async (dispatch) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    dispatch(setUser(userCredential.user));
  } catch (error) {
    console.error("Error logging in:", error);
  }
};

export const signUp =
  (email, password, username, first_name, last_name, locale, level) =>
  async (dispatch) => {
    try {
      // Create user with Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const userId = userCredential.user.uid;

      // Update user profile with additional data
      // await user.updateProfile({
      //     displayName: username,
      // });

      const userRef = doc(db, "users", userId);
      await setDoc(userRef, {
        email,
        username,
        first_name,
        last_name,
        native_language: locale,
        level,
      });

      // Set the user in Redux state
      dispatch(
        setUser({
          // uid: user.uid,
          email,
          username,
          first_name,
          last_name,
          native_language: locale,
          level,
        })
      );

      // return user;
    } catch (error) {
      console.error("Error during sign up:", error);
      throw error;
    }
  };

export const logout = () => async (dispatch) => {
  try {
    await auth.signOut();
    dispatch(setUser(null));
  } catch (error) {
    console.error("Error logging out", error);
  }
};

const initialState = { user: null };

export default function sessionReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
    default:
      return state;
  }
}
