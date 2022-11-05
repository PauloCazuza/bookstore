import { NativeBaseProvider } from "native-base";
import renderer from "react-test-renderer";
import Home from "../../../src/screens/Home";

it('renders correctly Home', () => {
    const tree = renderer.create(<NativeBaseProvider><Home key={"test"} /></NativeBaseProvider>).toJSON();
    expect(tree).toMatchSnapshot();
});