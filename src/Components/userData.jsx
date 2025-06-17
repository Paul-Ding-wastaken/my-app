import { createContext, use, useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import LoggedContext from './loggedContext';


export const UserContext = createContext();

export function UserProvider({ children }) {
    const [user, setUser] = useState();
    const [genres, setGenres] = useState([]);
    const [curgenre, setCurgenre] = useState(28);
    const { setLogged } = useContext(LoggedContext);
    const [purchased, setPurchased] = useState([]);
    const navigate = useNavigate();

    
    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
            setLogged(true);
            setUser(storedUser);
        }
    }, []);

    useEffect(() => {
        
        if (user) {
            if (localStorage.getItem(user.uid + '_genres')) {
                setGenres(JSON.parse(localStorage.getItem(user.uid + '_genres')));
            }
            localStorage.setItem('user', JSON.stringify(user));
        }
    }, [user]);

    useEffect(() => {
        if (user) {
            localStorage.setItem(user.uid + '_genres', JSON.stringify(genres));
        }

    }, [genres]);
    return (
        <UserContext.Provider value={{ user, setUser, genres, setGenres, curgenre, setCurgenre, purchased, setPurchased }}>
            {children}
        </UserContext.Provider>
    );
}

export default UserContext