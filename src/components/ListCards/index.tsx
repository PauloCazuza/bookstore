import { Box, Center, FlatList, HStack, Text, VStack } from "native-base";
import { memo } from "react";
import { IBook } from "../../interfaces/Book/IBook";
import { IFormatList } from "../../interfaces/FormatData";
import Card from "../Card";
import Spinner from "../Spinner";

type ListCardProps = {
    listItems: IFormatList[];
    actionEndReached?: VoidFunction;
    modeView?: "unic" | "double";
    loading?: boolean;
}

function ListCards({ listItems, actionEndReached, modeView = "unic", loading }: ListCardProps) {

    function modeUnic(left: IBook, right: IBook) {
        return (
            <VStack>
                <Box flex={1} py={1} >
                    {left && <Card book={left} />}

                </Box>
                <Box flex={1} py={1} >
                    {right && < Card book={right} />}
                </Box>
            </VStack>
        )
    }

    function modeDouble(left: IBook, right: IBook) {
        return (
            <HStack py={1}>
                <Box flex={1} px={1} >
                    {left && <Card book={left} />}

                </Box>
                <Box flex={1} px={1} >
                    {right && < Card book={right} />}
                </Box>
            </HStack>
        )
    }

    return (
        <FlatList
            data={listItems}
            marginTop={2}
            width="100%"
            initialNumToRender={4}
            removeClippedSubviews
            keyExtractor={item => item.left?.id + item.right?.id}
            flexGrow={1}
            renderItem={({
                item: { left, right }
            }) => {
                return modeView === "unic" ? modeUnic(left, right) : modeDouble(left, right)
            }}
            // ListEmptyComponent={() => <Center> <Text fontSize={30}> Sem Resultados. </Text> </Center>}
            ListFooterComponent={listItems.length > 10 && <Spinner />}
            onEndReached={actionEndReached}
        />
    )
}

export default ListCards;