const setDarkTheme = (theme) =>{
    return{
        type: "SET_DARKTHEME",
        payload: theme
    }
}

const isAuthenticated = (status) =>{
    return{
        type: 'SET_ISAUTHENTICATED',
        payload: status
    }
}

const setBaseUrl = (url) =>{
    return{
        type: "SET_BASEURL",
        payload: url
    }
}

const setUserData = (data)=>{
    return{
        type: 'SET_USERDATA',
        payload: data
    }
}

const setUserId =(id) =>{
    return{
        type: "SET_USERID",
        payload: id
    }
}

const setCompanyCode =(code) =>{
    return{
        type: "SET_COMPANYCODE",
        payload: code
    }
}

const setUserRole = (role) =>{
    return{
        type: 'SET_USERROLE',
        payload: role
    }
}

 export default{
    setDarkTheme,
    setUserData,
    isAuthenticated,
    setBaseUrl,
    setUserId,
    setCompanyCode,
    setUserRole
}