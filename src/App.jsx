import { WebApp, color, isTelegram } from '@utils/settings'
import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './routes/Home'
import { useGetValidationQuery } from './redux/api'

import Admin from './routes/Admin'
import Loading from '@components/Loading/Loading'
import PlainMessage from '@components/Message/PlainMessage'
import Clicker from './routes/Clicker'

function App() {
    if (!isTelegram) return <PlainMessage />

    const [localLoading, setLocalLoading] = useState(true)

    const tokenExist = localStorage.getItem('token')

    useEffect(() => {
        WebApp.setHeaderColor(color.background)
        WebApp.setBackgroundColor(color.background)
        WebApp.expand()
        WebApp.enableClosingConfirmation()
    }, [])

    const {
        data: token,
        isLoading: isValidating,
        isError: isValidatingError,
        error: validatingError,
        isSuccess: isValidated,
    } = useGetValidationQuery(WebApp.initData, {
        skip: tokenExist,
    })

    useEffect(() => {
        if (tokenExist) {
            setLocalLoading(false)
        }
        if (isValidated) {
            localStorage.setItem('token', token)
            setLocalLoading(false)
        }
    }, [isValidated])

    useEffect(() => {
        const observer = new MutationObserver(() => {
            const specificElement = document.querySelector('.modal-parent')
            if (specificElement) {
                document.body.classList.add('blur-active')
            } else {
                document.body.classList.remove('blur-active')
            }
        })

        observer.observe(document.body, { childList: true, subtree: true })

        return () => {
            observer.disconnect()
        }
    }, [])

    if (isValidating || localLoading) return <Loading />
    if (isValidatingError) return <PlainMessage description="Не можем вас валидировать" />

    // return <LoaderBar />
    return (
        <Router>
            <Routes>
                <Route
                    path="/"
                    element={<Home />}
                />
                <Route
                    path="/admin"
                    element={<Admin />}
                />
                <Route
                    path="/clicker"
                    element={<Clicker />}
                />
            </Routes>
        </Router>
    )
}

export default App
