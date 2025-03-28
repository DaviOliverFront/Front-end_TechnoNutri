import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Para redirecionamento
import axios from "axios";
import "./Home.css";
import { logout } from "../../../registro-login-back/src/controllers/UserController";

function Home() {
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); 


  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/products");
      setProducts(response.data.products);
    } catch (error) {
      console.error("Erro ao obter produtos:", error);
      setMessage("Erro ao obter produtos.");
    }
  };

  const handleLogout = async () => {
    try {
      const response = await axios.logout("http://localhost:3000/auth/logout");
      if (response.status === 200) {
        setMessage("Logout realizado com sucesso!")
        window.location.href = "/Login";
      }
    } catch (error) {
      console.error("Erro ao sair da página.", error);
      setMessage("Erro ao sair da página.");
    }
  };

  // Função para excluir um produto
  const handleDeleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/products/${id}`);
      setMessage("Produto excluído com sucesso!");
      fetchProducts();
    } catch (error) {
      setMessage("Erro ao excluir produto.");
    }
  };

  // Busca os produtos ao carregar o componente
  useEffect(() => {
    fetchProducts();
  }, []);

  // Função para redirecionar à página de adicionar produtos
  const handleNavigateToAddProduct = () => {
    navigate("/products");
  };

  return (
    <div>
      {/* Cabeçalho */}
      <header className="container-fluid bg-home d-flex justify-content-between align-items-center">
        <div className="navbar">
          <ul className="nav">
            <li className="nav-item">
              <a href="#" className="nav-link">Produtos</a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">Contatos</a>
            </li>
          </ul>
        </div>
        <div>
          <img src="../images/TechnoNutri.png" alt="Logo" />
        </div>
        <div className="navbar">
          <ul className="nav">
            <li className="nav-item">
              <a href="#" className="nav-link">Carrinho</a>
            </li>
            <li className="nav-item">
              <button onClick={handleLogout} className="btn btn-add-product">
                Sair
              </button>
            </li>
            <li className="nav-item">
              <button onClick={handleNavigateToAddProduct} className="btn btn-add-product">
                Adicionar Produto
              </button>
            </li>
          </ul>
        </div>
      </header>

      {/* Título */}
      <h1 className="container text-left mt-5">Creatinas</h1>

      {/* Mensagem */}
      {message && <p className="home-message">{message}</p>}

      {/* Lista de Produtos */}
      <section className="container bg-section mt-5 text-center rounded">
        <div className="row row-cols-auto justify-content-center">
          {products.map((product) => (
            <div key={product.id} className="card p-3 m-2">
              <img src={product.image} alt={product.name} className="product-image" />
              <h2 className="card-title">{product.name}</h2>
              <p className="card-subtitle">{product.description}</p>
              <p id="preço"><strong>R$ {product.price}</strong></p>
              <button
                onClick={() => handleDeleteProduct(product.id)}
                className="btn btn-color"
              >
                Excluir
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;