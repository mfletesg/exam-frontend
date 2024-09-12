import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Employe } from './Employe'
import { Figures } from './Figures'
import { BankAccounts } from './BankAccounts'
import 'bootstrap/dist/css/bootstrap.min.css';

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Employe />} />
        <Route path="/figures" element={<Figures />} />
        <Route path="/bankAccounts" element={<BankAccounts />} />
      </Routes>
    </BrowserRouter>
  )
}
