import { NativeBaseProvider } from "native-base";
import renderer from "react-test-renderer";
import Input from "../../../src/components/Input/index";

it('renders correctly Input', () => {
    const tree = renderer.create(<NativeBaseProvider><Input value="teste" /></NativeBaseProvider>).toJSON();
    expect(tree).toMatchSnapshot();
});