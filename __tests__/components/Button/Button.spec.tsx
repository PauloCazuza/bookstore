import { NativeBaseProvider } from "native-base";
import renderer from "react-test-renderer";
import Button from "../../../src/components/Button/index";

it('renders correctly button', () => {
    const tree = renderer.create(<NativeBaseProvider><Button title="test" /></NativeBaseProvider>).toJSON();
    expect(tree).toMatchSnapshot();
});