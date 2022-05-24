import {createUserWithEmailAndPassword, signInWithEmailAndPassword,onAuthStateChanged,signOut,currentUser,updateProfile } from "firebase/auth";
import {auth} from '../../firebase/config'
import { authSlice } from "./authReducer";

const { updateUserProfile, authStateChange, authSignOut } = authSlice.actions;

// const auth = getAuth(app)

// Реєстрація користувача
export const authSignUpUser = ({email, password, nickName,userId }) => async (dispatch, getSatte) => { 
    try {
        const data = await createUserWithEmailAndPassword(auth, email, password)
        // console.log('data', data)
        // const user = await ;
        // console.log('user', user)
        await updateProfile(auth.currentUser,{
            displayName: nickName,
            // uid: userId,
        });
        // console.log('user', user)
        const upload = await auth.currentUser;
        // console.log('upload', upload)
        const userUpdateProfile = {
        nickName: upload.displayName,
        userId: upload.uid,
    };
        dispatch(updateUserProfile(userUpdateProfile));
        // console.log('user', user)
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
