import { getAuth,createUserWithEmailAndPassword, signInWithEmailAndPassword,onAuthStateChanged,signOut,currentUser } from "firebase/auth";
import app from '../../firebase/config'
import { authSlice } from "./authReducer";

const { updateUserProfile, authStateChange, authSignOut } = authSlice.actions;

const auth = getAuth(app)

// Реєстрація користувача
export const authSignUpUser = ({email, password, nickname }) => async (dispatch, getSatte) => { 
    try {
        await createUserWithEmailAndPassword(auth, email, password)
        const user = await currentUser(auth);
        await user.updateProfile({
        displayName: nickname,
        });
        const { displayName, uid } = await currentUser(auth);
        const userUpdateProfile = {
        nickName: displayName,
        userId: uid,
    };
        dispatch(updateUserProfile(userUpdateProfile));
        console.log('user', user)
    } catch (error) {
        console.log("error", error);
        console.log('error.message',error.message)
    }
};

 // Вхід користувача
export const authSignInUser = ({email, password}) => async (dispatch, getSatte) => { 
    try {
        const user = await signInWithEmailAndPassword(auth, email, password)
        console.log('user2', user)
    } catch (error) {
        console.log("error", error);
        console.log("error.code", error.code);
        console.log("error.message", error.message);
    }
};

// Вихід користувача
export const authSignOutUser = () => async (dispatch, getSatte) => {
    await signOut(auth);
    dispatch(authSignOut());
};

//Зміна стану користувача
export const authStateChangeUser = () => async (dispatch, getState) => {
    await onAuthStateChanged(auth, (user) => {
        if (user) {
            const userUpdateProfile = {
                nickName: user.displayName,
                userId: user.uid,
            };
            dispatch(authStateChange({ stateChange: true }));
            dispatch(updateUserProfile(userUpdateProfile));
        }
    })
};
