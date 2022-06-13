import {createUserWithEmailAndPassword, signInWithEmailAndPassword,onAuthStateChanged,signOut,currentUser,updateProfile } from "firebase/auth";
import {auth} from '../../firebase/config'
import { authSlice } from "./authReducer";

const { updateUserProfile, authStateChange, authSignOut } = authSlice.actions;

// Реєстрація користувача
export const authSignUpUser = ({email, password, nickName, avatar}) => async (dispatch, getSatte) => { 
    try {
        await createUserWithEmailAndPassword(auth, email, password)
        await updateProfile(auth.currentUser,{
            displayName: nickName,
            email: email,
            photoURL: avatar,
        });
        
        const upload = await auth.currentUser;
        console.log('upload', upload)
        const userUpdateProfile = {
            nickName: upload.displayName,
            userId: upload.uid,
            email: upload.email,
        };

        dispatch(updateUserProfile(userUpdateProfile));
    } catch (error) {
        console.log("error", error);
        console.log('error.message',error.message)
    }
};

 // Вхід користувача
export const authSignInUser = ({email, password}) => async (dispatch, getSatte) => { 
    try {
        // const user =
            await signInWithEmailAndPassword(auth, email, password)
        // console.log('user', user)
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
                email: user.email,
            };
            dispatch(authStateChange({ stateChange: true }));
            dispatch(updateUserProfile(userUpdateProfile));
        }
    })
};


