


const AddUser = 'adduser'
const EditUser = 'edituser'
const RemoveUser = 'removeuser'


const setDatasLocal = (datas) => { localStorage.setItem('listUser', JSON.stringify(datas)) }

const Reducers = (state, action) => {
    let newListUser;
    switch (action.type) {
        case AddUser:
            newListUser = [...state.listUser, action.user]
            break;
        case EditUser:
            let userFilter = state.listUser.map(user => {
                if (user.id == action.payload.id) {
                    user = action.payload.data
                }
                return user
            })
            newListUser = [...userFilter]
            break
        case RemoveUser:
            let filterUser = state.listUser.filter(user => user.id != action.id)
            newListUser = [...filterUser]
            break;
        default: console.log('not action')
    }
    if (newListUser) {
        setDatasLocal(newListUser)
        return {
            ...state,
            listUser: newListUser
        }
    }
    return state
}
export default Reducers