import {StyleSheet} from "react-native";

export default function Styles() {

    return StyleSheet.create(
        {
            avatar: {
                alignSelf: "center",
                paddingRight: 10,
                // width: 30,
                // height: 30,
            },
            button: {
                backgroundColor: "#483d8b",
                padding: 20,
                marginTop: 20,
                marginHorizontal: 10,

                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,

                elevation: 5,
            },
            card: {
                marginVertical: 25,
                marginHorizontal: 25,
                display: "flex",
                backgroundColor: '#FFFFFE',
                borderRadius: 4,
            },
            error: {
                color: "red",
                textAlign: "center",
            },
            forgot: {
                textDecorationLine: "underline",
                textAlign: "center",
                marginTop: 10
            },
            google: {
                display: "flex",
                alignItems: "center",
            },
            header: {
                display: "flex",
                backgroundColor: "#222",
                flexDirection: "row",
                justifyContent: "space-between",
            },
            heading: {
                fontSize: 50,
                color: "white",
            },
            input: {
                margin: 10,
                padding: 10,
            },
            list_item: {
                marginVertical: 15,
                marginHorizontal: 25,
            },
            list_media: {
                width: 80,
                height: 50,
                marginRight: 10,
            },
            media: {
                height: 300,
                flex: 1,
                width: null
            },
            page_title: {
                textAlign: "center",
                fontSize: 50,
            },
            shadow: {
                backgroundColor: '#FFFFFE',
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,

                elevation: 5,
            },
            space: {
                width: 48,
            },
            text_title: {
                fontSize: 25,
            },
        }
    )
}
