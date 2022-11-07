

import { useState, createContext } from "react";
import { IFormatList } from "../../interfaces/FormatData";
import { CLIENT_ID, REDIRECT_URI } from "../../keys/keyGoogle";
import { Text, View, Button, ActivityIndicator } from "react-native";
import * as AuthSession from "expo-auth-session";
import axios from "axios";

type AuthReponse = {
    params: {
        access_token: string;
    };
    type: string;
}

type User = {
    id: string;
    email: string;
    name: string;
    picture: string;
}

interface IAuthGoogleContext {
    user?: User;
    setUser: React.Dispatch<React.SetStateAction<User>>;
    handleGoogleSignIn(): Promise<void>
}

type AuthGoogleProviderProps = {
    children: JSX.Element;
}

export const AuthGoogleCtx = createContext<IAuthGoogleContext>({} as IAuthGoogleContext);


export default function AuthGoogleProvider({ children }: AuthGoogleProviderProps) {
    const [user, setUser] = useState<User | undefined>();

    async function handleGoogleSignIn() {
        try {

            const SCOPE = encodeURI("profile email");
            const RESPONSE_TYPE = "token";

            const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

            const { type, params } = await AuthSession.startAsync({ authUrl }) as AuthReponse;

            if (type === "success") {
                const response = await axios.get<User>(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`);
                const { data } = response;

                setUser(data);
            }

        } catch (error) {
            console.log(error);

        }
    }

    return (
        <AuthGoogleCtx.Provider value={{ user, setUser, handleGoogleSignIn }}>
            {children}
        </AuthGoogleCtx.Provider>
    )
}