// Hooks
import { useState, useEffect } from "react";

// Axios
import blogFetch from "../axios/config";

// React Router Dom
import { Link } from "react-router-dom";

// Estilos
import "./home.css";

const Home = () => {
  const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    try {
      const response = await blogFetch.get("/posts");

      const apiPosts = response.data;

      // Pega os novos posts criados e salvos localmente
      const storedPosts = JSON.parse(localStorage.getItem("newPosts")) || [];

      // Junta os novos posts (acima) com os da API
      const allPosts = [...storedPosts, ...apiPosts];

      setPosts(allPosts);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="home">
      <h1>Últimos posts</h1>
      {posts.length === 0 ? (
        <p>Carregando...</p>
      ) : (
        posts.map((post) => (
          <div className="post" key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
            <Link to={`/posts/${post.id}`} className="btn">
              Ler mais
            </Link>
          </div>
        ))
      )}
    </div>
  );
};

export default Home;