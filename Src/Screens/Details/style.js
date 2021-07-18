import { StyleSheet, Dimensions } from "react-native"
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
    loadingView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        flex: 1,
        backgroundColor: '#121212'
    },
    headerContainer: {
        borderBottomRightRadius: 50,
        backgroundColor: '#24292e',
        borderBottomWidth: 0
    },
    webviewHeader: {
        borderBottomColor: '#24292e',
        backgroundColor: '#24292e'
    },
    container2: {
        flex: 1,
        padding: 10,
        marginTop: 20,
        alignItems: 'center'
    },
    sideContainer: {
        margin: 20,
        flexDirection: 'row'
    },
    sideContainerText: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 10
    },
    flexDirectionRow: { 
        flexDirection: 'row', 
    },
    imageStyle: {
        height: 100,
        width: 100,
        borderRadius: 7,
        borderWidth: 1,
        borderColor: '#f1f1f1'
    },
    container3: { 
        flex: 1, 
        marginTop: 30 
    },
    buttonContainer: { 
        marginTop: 50, 
        width: wp(60), 
        alignSelf: 'center'
    }
})

export default styles;