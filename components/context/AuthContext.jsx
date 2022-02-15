import React, { useContext, useEffect, useState } from 'react'
import { auth } from '../../firebase-config';

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)
    console.log(currentUser)

    async function signup(email, password) {
        try {
            await auth.createUserWithEmailAndPassword(email, password)
            return "success"
        } catch(err) {
            console.log(err)
            return "error"
        }
    }

    async function login(email, password){
        try {
            await auth.signInWithEmailAndPassword(email, password);
            return "success"
        } catch(err) {
            console.log(err)
            return "error"
        }
    }

    async function logout(){
        try {
            await auth.signOut();
            return "success"
        } catch(err) {
            console.log(err)
            return "error"
        }
    }

    function updateEmail(email){
        return currentUser.updateEmail(email);
    }

    function updatePassword(password){
        return currentUser.updatePassword(password);
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user);
            setLoading(false);
        })

        return unsubscribe;
    }, [])

    const value = {
        currentUser,
        signup,
        login,
        logout,
        updateEmail,
        updatePassword
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}
