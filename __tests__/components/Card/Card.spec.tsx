import { NativeBaseProvider } from "native-base";
import renderer from "react-test-renderer";
import Card from "../../../src/components/Card/index";

it('renders correctly Card undefined', () => {
    const tree = renderer.create(<NativeBaseProvider><Card book={undefined} /></NativeBaseProvider>).toJSON();
    expect(tree).toMatchSnapshot();
});