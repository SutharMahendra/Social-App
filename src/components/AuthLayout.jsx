import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

// this protected components ensure that only authorized user can access certain pages
// it restricts unauthorized users to specific routes, based on the authStatus(from redux store)

function Protected({ children, authentication = true }) {

    //authStatus: Represents whether the user is authenticated or not.
    const authStatus = useSelector((state) => state.status)
    // this loader is used until check that user is authenticate or not
    const [loader, setLoader] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        // If the route requires authentication, but the user is not logged in:
        if (authentication && !authStatus) {
            navigate("/login"); // Redirect to login page.
        }
        // If the route is public, but the user is logged in:
        else if (!authentication && authStatus) {
            navigate("/"); // Redirect to the homepage.
        }
        // Mark loader as false after determining navigation:
        setLoader(false);
    }, [authStatus, authentication, navigate])


    return loader ? (<h2>Loading...</h2>) : (<div>{children}</div>)
}

export default Protected


// 1. authStatus Check
//     authStatus determines whether the user is logged in or not.
//     authStatus === true: User is authenticated.
//         authStatus === false: User is not authenticated.
// 2. authentication Prop
//      authentication = true: The route is protected(only logged -in users can access it).
//     authentication = false: The route is public(only non - logged -in users can access it).