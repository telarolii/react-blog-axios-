// Axios
import blogFetch from "../axios/config";

// Hooks
import { useState, useEffect } from "react";

// React Router Dom
import { Link } from "react-router-dom";

// Estilos
import "./Admin.css";

const Admin = () => {
  const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    try {
      const response = await blogFetch.get("/posts");

      const apiPosts = response.data;

      // Recupera os posts criados localmente
      const localPosts = JSON.parse(localStorage.getItem("newPosts")) || [];

      // Junta os dois arrays (local + API)
      const allPosts = [...localPosts, ...apiPosts];

      setPosts(allPosts);
    } catch (error) {
      console.log(error);
    }
  };

  const deletePost = async (id) => {
    try {
      // Verifica se o post é local ou da API
      const isLocal = posts.find((p) => p.id === id && p.userId === 1);

      if (isLocal) {
        // Remove do localStorage
        const localPosts = JSON.parse(localStorage.getItem("newPosts")) || [];
        const updatedPosts = localPosts.filter((post) => post.id !== id);
        localStorage.setItem("newPosts", JSON.stringify(updatedPosts));
      } else {
        // Tenta deletar da API
        await blogFetch.delete(`/posts/${id}`);
      }

      // Atualiza o estado
      const filteredPosts = posts.filter((post) => post.id !== id);
      setPosts(filteredPosts);
    } catch (error) {
      console.log("Erro ao excluir:", error);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="admin">
      <h1>Gerenciar posts</h1>
      {posts.length === 0 ? (
        <p>Carregando...</p>
      ) : (
        posts.map((post) => (
          <div className="post" key={post.id}>
            <h2>{post.title}</h2>
            <div className="actions">
              <Link to={`/posts/edit/${post.id}`} className="btn edit-btn">
                Editar
              </Link>
              <button
                className="btn delete-btn"
                onClick={() => deletePost(post.id)}
              >
                Excluir
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Admin;
