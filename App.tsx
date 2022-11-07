import { NativeBaseProvider } from "native-base";
import AuthGoogleProvider from "./src/contexts/AuthGoogle";
import { FavoriteProvider } from "./src/contexts/Favorites";
import { LoadingProvider } from "./src/contexts/Loading";
import { BookProvider } from "./src/contexts/SearchBooks";
import Router from "./src/routes/Router";

export default function App() {
  return (
    <NativeBaseProvider>
      <AuthGoogleProvider>
        <LoadingProvider>
          <FavoriteProvider>
            <BookProvider>
              <Router />
            </BookProvider>
          </FavoriteProvider>
        </LoadingProvider>
      </AuthGoogleProvider>
    </NativeBaseProvider>
  );
}
