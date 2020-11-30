import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  /**
   * Requisição GET quando o componente for montado
   */
  useEffect(() => {
    api.get("repositories").then((response) => {
      setRepositories(response.data);
    });
  }, []);

  /**
   * Função para adicionar novos repositórios
   */
  async function handleAddRepository() {
    const response = await api.post("repositories", {
      title: "New repository",
      url: "http://github.com/",
      techs: ["Node.js", "Javascript"],
    });

    const repository = response.data;

    setRepositories([...repositories, repository]);
  }

  /*
   *  Remoção do repositório usando o id como base.
   */
  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    setRepositories(repositories.filter((repo) => repo.id !== id));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(({ id, title }) => (
          <li key={id}>
            {title}
            <button onClick={() => handleRemoveRepository(id)}>Remover</button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
