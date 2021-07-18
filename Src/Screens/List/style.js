import { StyleSheet, Dimensions } from "react-native"

const styles = StyleSheet.create({
    loadingView:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        flex: 1,
        backgroundColor: '#121212'
    },
    headerContainer:{ 
        backgroundColor: '#24292e',
        borderBottomWidth: 0,
        borderBottomRightRadius: 50,
    }
})

export default styles;