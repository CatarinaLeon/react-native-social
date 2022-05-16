import { getAuth,createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import app from '../../firebase/config'

const auth = getAuth(app)

// Реєстрація користувача
export const authSignUpUser = ({email, password, name}) => async (dispatch, getSatte) => { 
    try {
    const user  =  await createUserWithEmailAndPassword(auth, email, password)
        console.log('user', user)
    } catch (error) {
        console.log(error.message)
    }
};

 // Вхід користувача
export const authSignInUser = ({email, password}) => async (dispatch, getSatte) => { 
    try {
        const user = await signInWithEmailAndPassword(auth, email, password)
        console.log('user2', user)
    } catch (error) {
        console.log(error.message);
    }
};

// Вихід користувача
export const authSignOutUser = () => async (dispatch, getSatte) => { };
