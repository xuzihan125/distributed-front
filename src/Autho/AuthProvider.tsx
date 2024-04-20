import React from "react";


// // AuthProvider.js
// import React, { createContext, useState, useContext } from 'react';
// import { redirect } from 'react-router-dom';
//
// const AuthContext = createContext();
//
// export function AuthProvider({ children }) {
//     const [user, setUser] = useState(null);
//
//     const login = (username, password) => {
//         // 实际登录验证逻辑
//         setUser({ username });
//     };
//
//     const logout = () => {
//         setUser(null);
//     };
//
//     return (
//         <AuthContext.Provider value={{ user, login, logout }}>
//             {children}
//         </AuthContext.Provider>
//     );
// }
//
// export function useAuth() {
//     return useContext(AuthContext);
// }
