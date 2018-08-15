//action
export const changeScoreAction = {
    type:'CHANGE_SCORE',
}
export const changeStateAction = {
    type:'CHANGE_STATE',
}
export const changeUserInfoAction = {
    type:'CHANGE_USERINFO',
}




//reducer
const initialState = {
    score: '',
    state:1,
    userInfo:'333'
}
export default function reducer (state = initialState, action)  {
    const newState = Object.assign({},state)
    switch (action.type) {
        case 'CHANGE_SCORE':
            return Object.assign(newState,{
                score: action.payload
            })
            
        case 'CHANGE_STATE':
            
            return Object.assign(newState, {
                state: action.payload
            })
        case 'CHANGE_USERINFO':
            
            return Object.assign(newState, {
                state: action.payload
            })
        default:
            return initialState;
    }
}
export function changeScore(data){
	return { type:"CHANGE_SCORE" , payload:data}
}
export function changeState(data){
    return { type:"CHANGE_STATE" , payload:data}
}
export function changeUserInfo(data){
    return { type:"CHANGE_USERINFO" , payload:data}
}
