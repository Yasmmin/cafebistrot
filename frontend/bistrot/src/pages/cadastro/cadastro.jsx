import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

function Cadastro() {
 
  const navigate = useNavigate()
    const [values, setValues] = useState({
        nome: '',
        email: '',
        senha: '',
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:8081/cadastro', values)
            .then(res => {
                if (res.data.Status === "Sucesso!") {
                    navigate('/login')
                } else {
                    alert("Erro")
                }
            })
            .catch(err => console.log(err));
    }

    return (
        <div className="d-flex justify-content-center align-items-center bg-primary vh-100">
            <div className="bg-white p-3 rounded w-25">
                <h1>Cadastro</h1>
                <form onSubmit={handleSubmit}>

                    {/*Campo nome usuário*/}
                    <div className="mb-3">
                        <input
                            type="text"
                            placeholder="nome completo"
                            name="nome"
                            className="form-control rounded-0"
                            onChange={e => setValues({ ...values, nome: e.target.value })}
                        />
                    </div>

                    {/*Campo email*/}
                    <div className="mb-3">
                        <input
                            type="email"
                            placeholder="email"
                            name="email"
                            className="form-control rounded-0"
                            onChange={e => setValues({ ...values, email: e.target.value })}
                        />
                    </div>

                    {/*Campo senha*/}
                    <div className="mb-3">
                        <input
                            type="password"
                            placeholder="senha"
                            name="senha"
                            className="form-control rounded-0"
                            onChange={e => setValues({ ...values, senha: e.target.value })}
                        />
                    </div>

                    {/*Botão cadastro*/}
                    <button type="submit" className="btn btn-success w-100 rounded-0 mb-3">Cadastro</button>

                    {/*Rota/botão página de login*/}
                    <Link to="/Login" className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">Login</Link>
                </form>
            </div>
        </div>
    )
}

export default Cadastro;
