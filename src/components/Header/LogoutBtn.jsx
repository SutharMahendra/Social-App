import React from 'react'
import authService from '../../Appwrite/Auth'
import { logout } from '../../Feature/AuthSlice'
import { useDispatch } from 'react-redux'


// logout button only appear when users loged in other wise we disappear it


function LogoutBtn() {

    const dispatch = useDispatch()

    const handleLogout = () => {
        //here authservice return promise for method (here that method is logout)
        // so to handle that promise we required .then propertie 
        // that why we use .then
        authService.logout()
            .then(() => {
                dispatch(logout())
            }).catch(error)(
                console.log('error in logout btn', error)
            )
    }

    return (
        <button
            className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
            onClick={handleLogout}
        >
            Logout
        </button>
    )
}

export default LogoutBtn
