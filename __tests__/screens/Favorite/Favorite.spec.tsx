import { NativeBaseProvider } from "native-base";
import renderer from "react-test-renderer";
import Favorite from "../../../src/screens/Favorite";

it('renders correctly Favorite', () => {
    const tree = renderer.create(<NativeBaseProvider><Favorite key={"test"} /></NativeBaseProvider>).toJSON();
    expect(tree).toMatchSnapshot();
});