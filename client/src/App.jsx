import {
  createBrowserRouter, 
  createRoutesFromElements,
  Route, 
  RouterProvider
} from 'react-router-dom'


// layouts
import MainLayout from './Layouts/MainLayout'
import Dashboard from "./components/DashBoard";
import Expenses from "./components/Expenses";
import NotFound from './components/NotFound';
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" errorElement={<NotFound/>} element={<MainLayout />}>
      <Route index element={<Dashboard />} />
      <Route path='expenses' element={<Expenses />} />
    </Route>
  )
)

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App