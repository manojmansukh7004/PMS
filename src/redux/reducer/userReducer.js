 const initialState ={
    primaryColor: "#082b68",
    secColor: "#f27024",
    F1: 18, 
    F2: 16,
    F3: 14,
    userData: [],
    baseUrl: null,
    darkTheme: false,
    isAuthenticated: "null",
    userId: '',
    companyCode: '',
    userRole: '',
}

const userReducer = (state= initialState, action)=>{
    switch(action.type) {

        case "SET_DARKTHEME":
            return{
                ...state,
                darkTheme: action.payload
            };

        case "SET_ISAUTHENTICATED":
            return{
                ...state,
                isAuthenticated: action.payload,
            }

        case "SET_BASEURL":
            return{
                ...state,
                baseUrl: action.payload
            }

        case "SET_USERDATA":
            return{
                ...state,
                userData: action.payload
            }

        case "SET_USERID":
            return{
                ...state,
                userId: action.payload
            }
        
        case "SET_COMPANYCODE": 
            return{
                ...state,
                companyCode: action.payload
            }

        case "SET_USERROLE":
            return{
                ...state,
                userRole: action.payload,
            }

        default:
            return state;
    }
}

 export default userReducer