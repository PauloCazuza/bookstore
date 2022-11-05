import { NativeBaseProvider } from "native-base";
import renderer from "react-test-renderer";
import FormSearch from "../../../src/components/FormSearch/index";

it('renders correctly FormSearch Void Function', () => {
    const tree = renderer.create(<NativeBaseProvider><FormSearch handleClick={async () => { }} /></NativeBaseProvider>).toJSON();
    expect(tree).toMatchSnapshot();
});