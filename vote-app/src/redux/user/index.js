// action
export const changeTextAction = {
    type:'CHANGE_TEXT',
    text:'hello'
}
export const buttonClickAction = {
    type:'BUTTON_CLICK',
    text:'hello'
}
// export const changeTextAction = (text) => {
//     return {
//         type:'CHANGE_TEXT',
//         text
//     }
// }
// export const buttonClickAction = (text) => {
//     return {
//         type:'BUTTON_CLICK',
//         text
//     }
// }

//reducer
const initialState = {
    text: 'Hello'
}
export default function reducer (state = initialState, action)  {
    switch (action.type) {
        case 'CHANGE_TEXT':
            return {
                text: state.text==='Hello' ? 'user':'Hello'
            }
        case 'BUTTON_CLICK':
            return {
                text: 'Hello user'
            }
        default:
            return initialState;
    }
}