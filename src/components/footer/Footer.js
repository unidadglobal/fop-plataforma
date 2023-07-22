import React, { useEffect } from 'react'
import './_footer.scss'
import { useSelector, useDispatch } from 'react-redux'
import { getWebInfo } from '../../redux/actions/webinfo.action'

function Footer() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getWebInfo())
    }, [dispatch])

    const { webinfo } = useSelector(
        state => state.webinfo
    )
    return (
        <footer className="main-footer">
            <strong>&copy; 2021 {webinfo && webinfo.footer ? webinfo.footer : ""}</strong>
        </footer>
    )
}

export default Footer