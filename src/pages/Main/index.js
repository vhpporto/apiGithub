import React, { useEffect, useState, useRef } from "react";
import { FaGithubAlt, FaPlus, FaSpinner } from "react-icons/fa";
import { Container, Form, SubmitButton, List } from "./styles";
import { Link } from "react-router-dom";
import api from "../../services/api";

function Main() {
  const [loading, setLoading] = useState(false);
  const [repo, setRepo] = useState("");
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    const repos = localStorage.getItem("repositories");

    if (repos) {
      setRepositories(JSON.parse(repos));
    }
  }, []);

  useEffect(() => {
    console.log(repositories);
    localStorage.setItem("repositories", JSON.stringify(repositories));
  });

  // useEffect((_, prevState) => {
  //   if (!mounted.current) {
  //     mounted.current = true;
  //   } else {
  //     if (prevState.repositories !== repositories) {
  //       localStorage.setItem("repositories", JSON.stringify(repositories));
  //     }
  //   }
  // });

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.get(`${repo}`);

      const data = {
        name: response.data.full_name,
      };
      setRepositories([...repositories, data]);
      setRepo("");
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  }

  return (
    <Container>
      <h1>
        <FaGithubAlt />
        Repositórios
      </h1>
      <Form onSubmit={handleSubmit}>
        <input
          required
          type="text"
          placeholder="Adicionar repositório"
          value={repo}
          onChange={(e) => setRepo(e.target.value)}
        />
        <SubmitButton loading={loading}>
          {loading ? (
            <FaSpinner color="#FFF" size={14} />
          ) : (
            <FaPlus color="#FFF" size={14} />
          )}
        </SubmitButton>
      </Form>
      <List>
        {repositories.map((repo) => (
          <li key={repo.name}>
            <span>{repo.name}</span>
            <Link to={`/repository/${encodeURIComponent(repo.name)}`}>
              Detalhes
            </Link>
          </li>
        ))}
      </List>
    </Container>
  );
}

export default Main;
