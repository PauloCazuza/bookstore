import { NativeBaseProvider } from "native-base";
import renderer from "react-test-renderer";
import DetailBook from "../../../src/screens/DetailBook";

it('renders correctly DetailBook', () => {
    const tree = renderer.create(<NativeBaseProvider><DetailBook key={"test"} /></NativeBaseProvider>).toJSON();
    expect(tree).toMatchSnapshot();
});