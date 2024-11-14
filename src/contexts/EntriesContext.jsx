// src/contexts/EntriesContext.jsx

import React, { createContext, useState, useContext } from 'react';

const EntriesContext = createContext();

export const useEntries = () => {
    return useContext(EntriesContext);
};

export const EntriesProvider = ({ children }) => {
    const [entries, setEntries] = useState([]);

    return (
        <EntriesContext.Provider value={{ entries, setEntries }}>
            {children}
        </EntriesContext.Provider>
    );
};
