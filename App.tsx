import { NativeBaseProvider } from "native-base";
import { LoadingProvider } from "./src/contexts/Loading";
import { BookProvider } from "./src/contexts/SearchBooks";
import Router from "./src/routes/Router";

export default function App() {
  return (
    <NativeBaseProvider>
      <LoadingProvider>
        <BookProvider>
          <Router />
        </BookProvider>
      </LoadingProvider>
    </NativeBaseProvider>
  );
}
