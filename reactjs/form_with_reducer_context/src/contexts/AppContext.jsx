import { useReducer } from 'react'
import Reducers from '../reducer/Reducer'
import { createContext } from 'react'
function getDataLocal() {
    var datas = JSON.parse(localStorage.getItem('listUser'))
    return datas ? datas : []
}

const initState = {
    listUser: getDataLocal()
}
export const Contexts = createContext()

const AppContext = ({ children }) => {
    const [dataUsers, disPatch] = useReducer(Reducers, initState)

    return <Contexts.Provider value={
        {
            listUser: dataUsers.listUser,
            addUser: (user) => {
                disPatch({ type: 'adduser', user })
            },
            editUser: (payload) => {
                disPatch({ type: "edituser", payload })
            },
            removeUser: (id) => {
                disPatch({ type: 'removeuser', id })
            }
        }
    }> {children}</Contexts.Provider >
}
export default AppContext