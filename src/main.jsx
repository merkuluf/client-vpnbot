import ReactDOM from 'react-dom/client'
import TelegramProvider from './App.tsx'
import '@styles/index.scss'
import { Provider } from 'react-redux'
import { store } from './redux/store.js'

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <TelegramProvider />
    </Provider>
)
