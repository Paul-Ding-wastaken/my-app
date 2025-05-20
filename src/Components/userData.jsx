import { createContext, useState } from 'react';

export const UserContext = createContext();

export function UserProvider({ children }) {
    const [userFirstName, setUserFirstName] = useState("");
    const [userLastName, setUserLastName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userGenres, setUserGenres] = useState([]);

    return (
        <UserContext.Provider value={{userFirstName, setUserFirstName, userLastName, setUserLastName, userEmail, setUserEmail, userGenres, setUserGenres}}> 
            {children}
        </UserContext.Provider>
    );
}

export default UserContext