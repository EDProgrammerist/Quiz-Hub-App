import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container:{
        width:"100%",
        height:"100%"
    },
    renderItem:{
        width:"100%",
        minHeight:104,
        alignItems:"center",
        justifyContent:"center"
    },
    box:{
        width:"90%",
        minHeight:84,
        backgroundColor:"#fff",
        borderRadius:10,
        shadowColor: "#FBCEB1",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",
        paddingHorizontal:"8%",
        paddingVertical:14
    },
    questionTextBox:{
        flex:1,
        paddingRight:12
    },
    questionNumber:{
        fontSize:12,
        fontWeight:"800",
        marginBottom:6
    },
    title:{
        fontSize:14,
        fontWeight:"600",
        color:"black"
    },
    emptyState:{
        minHeight:220,
        alignItems:"center",
        justifyContent:"center"
    },
    emptyText:{
        fontSize:14,
        fontWeight:"600"
    }
});

export default styles
