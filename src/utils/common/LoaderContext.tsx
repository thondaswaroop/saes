// src/contexts/LoaderContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface LoaderContextType {
    isLoading: boolean;
    showLoader: () => void;
    hideLoader: () => void;
}

const LoaderContext = createContext<LoaderContextType | undefined>(undefined);

export const LoaderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const showLoader = () => {
        setIsLoading(true);
    };
    
    const hideLoader = () => {
        setIsLoading(false);
    };

    return (
        <LoaderContext.Provider value={{ isLoading, showLoader, hideLoader }}>
            {children}
        </LoaderContext.Provider>
    );
};

export const useLoader = () => {
    const context = useContext(LoaderContext);
    if (context === undefined) {
        throw new Error('useLoader must be used within a LoaderProvider');
    }
    return context;
};
