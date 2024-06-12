import { WebApp, color, isTelegram } from './utils/settings'
import { useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './routes/Home'
import { useGetValidationQuery } from './redux/api'
import Text from './components/Text/Text'
import FlexContainer from './components/layout/FlexContainer'
import { useDispatch } from 'react-redux'
import { setToken } from './redux/tokenSlice'

function App() {
    if (!isTelegram)
        return (
            <Text subtitle align='center'>
                Please use telegram
            </Text>
        )

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
        isSuccess: validated,
    } = useGetValidationQuery(WebApp.initData, {
        skip: tokenExist,
    })

    useEffect(() => {
        if (validated) {
            localStorage.setItem('token', token)
        }
    }, [validated])

    if (isValidating) return <Text>Loading...</Text>
    if (isValidatingError) return <Text>Ошибка авторизации</Text>

    return (
        <Router>
            <Routes>
                <Route path='/' element={<Home />} />
            </Routes>
        </Router>
    )
}

export default App
