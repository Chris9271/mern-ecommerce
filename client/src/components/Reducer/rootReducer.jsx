const initState = {
    isLogin: false,
    userId: null
}

const rootReducer = (state = initState, action) => {
    switch(action.type){
        case "LOGIN":
            return{
                ...state,
                isLogin: true,
                userId: action.payload
            } 
        case "LOGOUT":
            return{
                ...state,
                isLogin: false,
                userId: null
            }
        default:
            return state
    }
}

export default rootReducer;