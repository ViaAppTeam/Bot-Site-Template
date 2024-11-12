import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios'
import { api_url } from '../../config.json'

const GuildsContext = createContext();

export const GuildsProvider = ({ children }) => {
    const [guilds, setGuilds] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            if (localStorage.getItem("token")) {
                try {
                    const response = await axios.post(
                        `${api_url}/guilds`,
                        { token: localStorage.token }
                    )

                    setGuilds(response.data)
                } catch (error) { console.log(error) }
            }
        }

        fetchData();
    }, []);

    return (
        <GuildsContext.Provider value={{ guilds, setGuilds }}>
            {children}
        </GuildsContext.Provider>
    );
};

export const useGuilds = () => useContext(GuildsContext);
