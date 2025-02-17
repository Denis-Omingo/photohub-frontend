
import { createRoot } from 'react-dom/client'
import './index.css'
import {BrowserRouter as Router} from "react-router-dom"
import AppRoutes from './AppRoutes'
import {persistor, store} from './redux/store'
import {Provider} from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import {QueryClient, QueryClientProvider} from 'react-query'
import { Toaster } from './components/ui/sonner'

const queryClient=new QueryClient({
  defaultOptions:{
    queries:{
      refetchOnWindowFocus:false,
    }
  }
});

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <QueryClientProvider client={queryClient}>
              <AppRoutes/>
              <Toaster visibleToasts={1} position="top-right"/>
          </QueryClientProvider>
        </Router>
      </PersistGate>
  </Provider>
)
