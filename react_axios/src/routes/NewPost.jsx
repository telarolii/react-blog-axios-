// Hooks
import { useState } from "react";

// React Router Dom
import { useNavigate } from "react-router-dom";

// Axios
import blogFetch from "../axios/config";

// Estilos
import "./NewPost.css";

const NewPost = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState();
  const [body, setBody] = useState();

const createPost = async (e) => {
  e.preventDefault();

  const post = { title, body, userId: 1, id: Date.now() };

  // Simula envio para API
  await blogFetch.post("/posts", {
    body: post,
  });

  // Salva post no localStorage
  const storedPosts = JSON.parse(localStorage.getItem("newPosts")) || [];
  storedPosts.push(post);
  localStorage.setItem("newPosts", JSON.stringify(storedPosts));

  navigate("/");
};

  return (
    <div className="new-post">
      <h2>Inserir novo post:</h2>
      <form onSubmit={(e) => createPost(e)}>
        <div className="form-control">
          <label htmlFor="title">Título</label>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Digite o título"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-control">
          <label htmlFor="body">Conteúdo:</label>
          <textarea
            name="body"
            id="body"
            placeholder="Digite o conteúdo"
            onChange={(e) => setBody(e.target.value)}
          ></textarea>
        </div>
        <input type="submit" value="Criar Post" className="btn" />
      </form>
    </div>
  );
};

export default NewPost;
