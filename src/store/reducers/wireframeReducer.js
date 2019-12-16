const initState = {
    wireframes: []
};

const wireframeReducer = (state = initState, action) => {
    switch (action.type) {
        /* IF YOU HAVE ANY TODO WIREFRAME EDITING REDUCERS ADD THEM HERE */
        case "CREATE_WIREFRAME":
            console.log("create WIREFRAME", action.wireframe) 
            return state
        case "CREATE_WIREFRAME_ERROR":
            console.log("create WIREFRAME error", action.error)
            return state
        case "EDIT_WIREFRAME":
            console.log("edit WIREFRAME", action.wireframe) 
            return state
        case "EDIT_WIREFRAME_ERROR":
            console.log("edit WIREFRAME error", action.error)
            return state
        case "DELETE_WIREFRAME":
            console.log("delete WIREFRAME", action.wireframe) 
            return state
        case "DELETE_WIREFRAME_ERROR":
            console.log("delete item error", action.error)
            return state
        default:
            return state
    }
}

export default wireframeReducer;