
import { makeStyles } from '@material-ui/core/styles'
const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: "20px",
        display: "flex",
        flexGrow: 1,
        width: "100%",
        paddingTop: "50px",
    },
    icon: {
        size: "15px",
        color: '#1579C9',
    },
    flexbox: {
        display: "flex",
        alignItems: "center",
        backgroundColor: "white",

    },

    wrapper: {

        marginTop: "20px",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    selectedItemsSpan: {
        marginLeft: "10px"
    },
    selectedItems: {
        width: "119px",
        height: "19x"
    },
    filter: {
        display: "flex",
        alignItems: "center",
        width: "107px",
        minWidth: "107px",
        maxWidth: "107px",
        height: "19x"
    },

    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
        width: "100%"
    },
    button: {
        marginRight: theme.spacing(1),
        color: "#1579C9",
        width: "107px",
        minWidth: "107px",
        maxWidth: "107px",
        padding: "5px 5px 5px 5px",
        background: "#FFFFFF 0% 0% no-repeat padding-box",
        borderRadius: "5px",
        opacity: 1
    },
    searchContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: 'flex-end',
        alignItems: "flex-end",
        width: "377px",
        backgroundColor: "white",

    },


}))

export { useStyles }