export default (state = null, {type, payload}) => {
    switch (type) {
        case 'hello':
            return null
    
        default:
            return state;
    }
}