import { WebApp, color, isTelegram } from '@utils/settings'
import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './routes/Home'
import { useGetValidationQuery } from './redux/api'
import Text from '@components/Text/Text'
import FlexContainer from '@components/layout/FlexContainer'
import { useDispatch } from 'react-redux'
import { setToken } from './redux/tokenSlice'
import Admin from './routes/Admin'
import LoaderBar from '@components/LoaderBar/LoaderBar'
import Loading from '@components/Loading/Loading'

function App() {
    if (!isTelegram)
        return (
            <Text subtitle align='center'>
                Please use telegram
            </Text>
        )

    const [localLoading, setLocalLoading] = useState(false)

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

    // useEffect(() => {
    //     if (isValidatingError) {
    //         console.log('1')
    //         console.log(validatingError)
    //     }
    // }, [isValidatingError])

    useEffect(() => {
        if (validated) {
            setLocalLoading(true)
            localStorage.setItem('token', token)
            setLocalLoading(false)
        }
    }, [validated])

    if (isValidating || localLoading) return <Loading />
    if (isValidatingError) return <Text>Ошибка авторизации</Text>

    // return <LoaderBar />
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/admin' element={<Admin />} />
            </Routes>
        </Router>
    )
}

export default App
