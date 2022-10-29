import { NativeBaseProvider } from "native-base"
import Router from "./src/routes/Router";

export default function App() {
  return (
    <NativeBaseProvider>
      <Router />
    </NativeBaseProvider>
  );
}
