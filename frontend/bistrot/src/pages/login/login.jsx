import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import logoLogin from '../../assets/LogoLogin (2).svg'

function Login() {
  const navigate = useNavigate()
  axios.defaults.withCredentials = true;

  const [values, setValues] = useState({
    email: '',
    senha: '',
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:8081/login', values)
      .then(res => {
        if (res.data.Status === "Sucesso!") {
          navigate('/')
        } else {
          alert(res.data.Error)
        }
      })
      .catch(err => console.log(err));
  }

  return (
    <div className="d-flex flex-column vh-100">

      <div className="d-flex flex-column align-items-center mb-4">
        <img src={logoLogin} alt="Logo de cadastro" className="img-fluid no-select mb-2 mt-" />
        <h2 className="text-center fw-bold ">Vamos fazer login</h2>
      </div>

      <form onSubmit={handleSubmit} className="w-100 mx-4">

        {/* Campo email */}
        <div className="mb-3">
          <input
            type="email"
            placeholder="email"
            name="email"
            className="form-control rounded-0"
            onChange={e => setValues({ ...values, email: e.target.value })}
          />
        </div>

        {/* Campo Senha */}
        <div className="mb-3">
          <input
            type="password"
            placeholder="senha"
            name="senha"
            className="form-control rounded-0"
            onChange={e => setValues({ ...values, senha: e.target.value })}
          />
        </div>

        {/* Botão login */}
        <button type="submit" className="btn btn-success w-100 rounded-0 mb-3" >Login </button>

        {/* Rota/botão criar uma conta */}
        <Link
          to="/Cadastro"
          className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">
          Crie uma conta
        </Link>

      </form>
    </div>
  );
}

export default Login;
