import {StyleSheet} from "react-native";

export default function Styles() {

    return StyleSheet.create(
        {
            card: {
                marginVertical: 0,
                marginHorizontal: 10,
                display: "flex",
                justifyContent: "space-between",
                backgroundColor: '#FFFFFE',
            },
            list_item: {
                marginVertical: 15,
                marginHorizontal: 25,
                backgroundColor: '#FFFFFE',
            },
            media: {
                width: 80,
                height: 50,
                marginRight: 10,
            },
            page_title: {
                textAlign: "center",
                fontSize: 50,
            },
            shadow: {
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
