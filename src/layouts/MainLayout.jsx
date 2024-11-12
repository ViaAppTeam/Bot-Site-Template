import React from 'react'
import Proptypes from "prop-types"

const MainLayout = ({ children }) => {
    if (!localStorage.getItem("token")) {
        return (
            <React.Fragment>
                {children}
            </React.Fragment>
        )
    } else {
        window.location = '/dashboard'
    }
}

export default MainLayout

MainLayout.propTypes = {
    children: Proptypes.node
}