import app, { database } from '../../firebase'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import { getDatabase, push, ref, set, onValue, remove } from "firebase/database";

export const actionUserName = () => (dispatch) => {
    setTimeout(() => {
        return dispatch({ type: 'CHANGE_USER', value: 'chocolatos' })
    }, 2000)
}


export const registerUserAPI = (data) => (dispatch) => {
    return new Promise((resolve, reject) => {
        const auth = getAuth()
        dispatch({ type: 'CHANGE_LOADING', value: true })
        createUserWithEmailAndPassword(auth, data.email, data.password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log('success: ', user)
                dispatch({ type: 'CHANGE_LOADING', value: false })
                resolve(true)
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage)
                dispatch({ type: 'CHANGE_LOADING', value: false })
                reject(false)
            })
    })
}

export const loginUserAPI = (data) => (dispatch) => {
    return new Promise((resolve, reject) => {
        const auth = getAuth()
        dispatch({ type: 'CHANGE_LOADING', value: true })
        signInWithEmailAndPassword(auth, data.email, data.password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log('success: ', user)
                const dataUser = {
                    email: user.email,
                    uid: user.uid,
                    emailVerified: user.emailVerified,
                    refreshToken: user.stsTokenManager.refreshToken,
                }
                dispatch({ type: 'CHANGE_LOADING', value: false })
                dispatch({ type: 'CHANGE_ISLOGIN', value: true })
                dispatch({ type: 'CHANGE_USER', value: dataUser })
                resolve(dataUser)
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage)
                dispatch({ type: 'CHANGE_LOADING', value: false })
                dispatch({ type: 'CHANGE_ISLOGIN', value: false })
                reject(false)
            })
    })
}

export const addDataAPI = (data) => (dispatch) => {
    push(ref(database, 'notes/' + data.userId), {
        title: data.title,
        content: data.content,
        date: data.date,
    })
    console.log('data sent')
}

export const getDataAPI = (userId) => (dispatch) => {
    const starCountRef = ref(database, 'notes/' + userId)
    return new Promise((resolve, reject) => {
        onValue(starCountRef, (snapshot) => {
            console.log('get data', snapshot.val())
            const data = []
            Object.keys(snapshot.val()).map(key => {
                data.push({
                    id: key,
                    data: snapshot.val()[key]
                })
            })
            dispatch({ type: 'SET_NOTES', value: data })
            resolve(snapshot.val())
        })
    })
}

export const updateDataAPI = (data) => (dispatch) => {
    const starCountRef = ref(database, `notes/${data.userId}/${data.noteId}`)
    return new Promise((resolve, reject) => {
        set(starCountRef, {
            title: data.title,
            content: data.content,
            date: data.date,
        })
            .then(() => {
                // Data saved successfully!
                resolve(true)
            })
            .catch((error) => {
                // The write failed...
                reject(false)
            });
    })
}

export const deleteDataAPI = (data) => (dispatch) => {
    const starCountRef = ref(database, `notes/${data.userId}/${data.noteId}`)
    return new Promise((resolve, reject) => {
        remove(starCountRef)
    })
}