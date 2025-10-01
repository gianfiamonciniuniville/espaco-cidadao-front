import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Cadastro } from "./pages/Cadastro";
import Login from "./pages/Login";
import { CadastroRelato } from "./pages/CadastroRelato";
import { EdicaoRelato } from "./pages/EdicaoRelato";
import { Relato } from "./pages/Relato";
import { ListaRelatos } from "./pages/ListaRelatos";
import { Mapa } from "./pages/Mapa";
import { ListaMeusRelatos } from "./pages/ListaMeusRelatos";

function App() {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/cadastro" element={<Cadastro />} />
			<Route path="/login" element={<Login />} />
			<Route path="/mapa" element={<Mapa />} />
			<Route path="/cadastro-relato" element={<CadastroRelato />} />
			<Route path="/edicao-relato" element={<EdicaoRelato />} />
			<Route path="/relato" element={<Relato />} />
			<Route path="/relatos" element={<ListaRelatos />} />
			<Route path="/my-relatos" element={<ListaMeusRelatos />} />
		</Routes>
	);
}

export default App;
