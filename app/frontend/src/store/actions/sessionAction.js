import { auth } from '../../firebase/firebaseConfig'
import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut
} from 'firebase/auth'

export const SET_USER = () => "session/SET_USER";

const setUser = user => ({
    type: SET_USER,
    payload: user
})

export const authenticate = () => async dispatch => {
    const user = auth.currentUser
    if (user) {
        dispatch(setUser(user))
    }
}

export const login = (email, password) => async dispatch => {
    try {
        const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
        )
        dispatch(setUser(userCredential.user))
    } catch (error) {
        console.error('Error logging in:', error)
    }
}

export const signUp = (email, password, username, first_name, last_name, locale, level) => async (dispatch) => {
    try {
        const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password,
                username,
                first_name,
                last_name,
                native_language: locale,
                level,
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Error signing up:', errorData.message);
            throw new Error(errorData.message);
        }

        const data = await response.json();
        console.log('User signed up successfully:', data.loginCredential.user.providerData[0]);

        // Set the user in Redux state
        dispatch(setUser({
            uid: data.uid,
            email: data.loginCredential.user.email,
            username,
            first_name,
            last_name,
            native_language: locale,
            level
        }));
        return data;
    } catch (error) {
        console.error('Error during sign up:', error);
        throw error;
    }
};


export const logout = () => async dispatch => {
    try {
        await auth.signOut()
        dispatch(setUser(null))
    } catch (error) {
        console.error('Error logging out', error)
    }
}
