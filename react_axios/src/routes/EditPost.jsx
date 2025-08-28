// Hooks
import { useState, useEffect } from "react";

// React Router Dom
import { useNavigate, useParams } from "react-router-dom";

// Axios
import blogFetch from "../axios/config";

// Estilos
import "./NewPost.css";

const EditPost = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const getPost = async () => {
    const localPosts = JSON.parse(localStorage.getItem("newPosts")) || [];
    const localPost = localPosts.find((post) => post.id === Number(id));

    if (localPost) {
      // Se o post for local
      setTitle(localPost.title);
      setBody(localPost.body);
    } else {
      // Se o post for da API
      try {
        const response = await blogFetch.get(`/posts/${id}`);
        const data = response.data;
        setTitle(data.title);
        setBody(data.body);
      } catch (error) {
        console.log("Erro ao carregar post:", error);
      }
    }
  };

  const editPost = async (e) => {
    e.preventDefault();

    const updatedPost = {
      id: Number(id),
      title,
      body,
      userId: 1,
    };

    const localPosts = JSON.parse(localStorage.getItem("newPosts")) || [];
    const isLocal = localPosts.some((post) => post.id === Number(id));

    if (isLocal) {
      const updatedLocalPosts = localPosts.map((post) =>
        post.id === Number(id) ? updatedPost : post
      );
      localStorage.setItem("newPosts", JSON.stringify(updatedLocalPosts));
    } else {
      try {
        await blogFetch.put(`/posts/${id}`, updatedPost);
      } catch (error) {
        console.log("Erro ao editar post da API:", error);
      }
    }

    navigate("/");
  };

  useEffect(() => {
    getPost();
  }, []);

  return (
    <div className="new-post">
      <h2>Editando: {title}</h2>
      <form onSubmit={editPost}>
        <div className="form-control">
          <label htmlFor="title">Título</label>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Digite o título"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-control">
          <label htmlFor="body">Conteúdo:</label>
          <textarea
            name="body"
            id="body"
            placeholder="Digite o conteúdo"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          ></textarea>
        </div>
        <input type="submit" value="Salvar" className="btn" />
      </form>
    </div>
  );
};

export default EditPost;
