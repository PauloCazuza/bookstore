import React, { createContext, ReactNode, useEffect, useState } from "react";
import api from "../../config/api";

interface ILoadingContext {
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const LoadingCtx = createContext<ILoadingContext>({} as ILoadingContext);

type LoadingProps = {
    children: JSX.Element;
}

export function LoadingProvider({ children }: LoadingProps) {
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        configureIntercption();

        return () => {
            setLoading(false);
        }
    }, []);

    function configureIntercption() {
        api.interceptors.request.use((config) => {
            try {
                setLoading(true);
            }
            catch (e) {
                setLoading(false);
            }

            return config;
        });

        api.interceptors.response.use((config) => {
            try {
                setLoading(false);
            }
            catch (e) {
                setLoading(false);
            }

            return config;
        }, function (error) {
            setLoading(false);
            return Promise.reject(error);
        }

        );
    }

    return (
        <LoadingCtx.Provider
            value={{ loading, setLoading }}
        >
            {children}
        </LoadingCtx.Provider>

    )

}