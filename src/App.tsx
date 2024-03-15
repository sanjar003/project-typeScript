import './App.css'
import store from './redux/store'
import MainRoutes from './routes/MainRoutes'
import { Provider } from 'react-redux'



function App() {

  return (
    <>
      <Provider store={store}>
        <MainRoutes />

      </Provider>
    </>
  )
}

export default App
