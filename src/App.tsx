import { Route, Routes } from "react-router-dom"
import { Home } from "./pages/Home"
import { Cadastro } from "./pages/Cadastro"
import Login from "./pages/Login"
import { CadastroRelato } from "./pages/CadastroRelato"
import { EdicaoRelato } from "./pages/EdicaoRelato"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cadastro" element={<Cadastro />} />
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro-relato" element={<CadastroRelato />} />
      <Route path="/edicao-relato" element={<EdicaoRelato />} />
    </Routes>
  )
}

export default App
