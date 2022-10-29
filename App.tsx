import { NativeBaseProvider } from "native-base"
import Router from "./src/routes/router";

export default function App() {
  return (
    <NativeBaseProvider>
      <Router />
    </NativeBaseProvider>
  );
}
