import { NativeBaseProvider } from "native-base";
import renderer from "react-test-renderer";
import ListCards from "../../../src/components/ListCards/index";

it('renders correctly ListCards', () => {
    const tree = renderer.create(<NativeBaseProvider><ListCards listItems={[]} /></NativeBaseProvider>).toJSON();
    expect(tree).toMatchSnapshot();
});