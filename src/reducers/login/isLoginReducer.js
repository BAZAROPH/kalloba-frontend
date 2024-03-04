const INITIAL_STATE = {
    isLogin: false,
}

export default function isLoginReducer(state=INITIAL_STATE, action){
    
    if(localStorage.getItem('access')){
        return {
            ...state,
            isLogin: true
        }
    }

    //reducer action
    if(action){
        switch(action.type){
            case 'LOGIN': {
                return {
                    ...state,
                    isLogin: true
                }
            }
            case 'LOGOUT': {
                return {
                    ...state,
                    isLogin: false
                }
            }
            default: {
                return {
                    ...state,
                    isLogin: false
                }
            }
        }
    }

    return state;
}