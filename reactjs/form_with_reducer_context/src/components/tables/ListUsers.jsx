
import { useContext } from 'react'
import { Contexts } from '../../contexts/AppContext'
import { useNavigate } from 'react-router-dom'
function ListUsers() {
  const Navigate = useNavigate()
  const datasContext = useContext(Contexts)
  return (
    <div id="listUser">
      <div className='text-center'>
        <h1>List User</h1>
        <button onClick={() => Navigate('/')}>Home</button>
      </div>

      <table>
        <tbody>
          <tr>
            <th>#</th>
            <th>UserName</th>
            <th>Email</th>
            <th>Password</th>
            <th>Gender</th>
            <th>Date</th>
            <th>PhoneNumber</th>
            <th>Address</th>
            <th>Description</th>
            <th>option</th>
          </tr>
          {datasContext.listUser.map(user => {
            return (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.UserName}</td>
                <td>{user.Email}</td>
                <td>{user.Password}</td>
                <td>{user.Gender}</td>
                <td>{user.Date}</td>
                <td>{user.PhoneNumber}</td>
                <td>{user.Address}</td>
                <td>{user.Description}</td>
                <td><button type='button' onClick={() => Navigate(`/edit_user/${user.id}`)}>edit</button>
                  <button type='button' onClick={() => datasContext.removeUser(user.id)}>remove</button></td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
export default ListUsers