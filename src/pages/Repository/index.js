import React, { useEffect, useState } from "react";
import api from "../../services/api";
// import { Container } from './styles';

function Repository({ match }) {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function getRepos() {
      const repoName = decodeURIComponent(match.params.repository);
      const [repository, issues] = await Promise.all([
        api.get(`${repoName}`),
        api.get(`${repoName}/issues`, {
          params: {
            state: "open",
            per_page: 5,
          },
        }),
      ]);
      setLoading(false);
      console.log(repository, issues);
    }
    getRepos();
  }, []);
  return <h2>repos: {decodeURIComponent(match.params.repository)}</h2>;
}

export default Repository;
