import { Fragment, useState } from "react";
import CardMarvel from "./Card";
import Card from "./Card";

export const Search = () => {
  const baseUrl = "http://gateway.marvel.com/v1/public/";
  const API_key = "f680d16d1c5e7b9177e5a9e37378f8ac";
  const hash = "fe128e49c557a766af0a11b83249cd6a";

  const [searchCharacter, setSearchCharacter] = useState("");
  const [character, setCharacter] = useState([]);

  const handleInputChange = (e) => {
    setSearchCharacter(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchCharacter();
  };

  const fetchCharacter = async () => {
    try {
      const response = await fetch(
        `${baseUrl}characters?nameStartsWith=${searchCharacter}&ts=1&apikey=${API_key}&hash=${hash}`
      );
      const data = await response.json();
      setCharacter(data.data.results); // Update the character state with the fetched data
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <CardMarvel />
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search Character"
        value={searchCharacter}
        onChange={handleInputChange}
      />
      <button type="submit" className="search-button">
        Buscar
      </button>
      {/* Display search results */}
      {character.map((char) => (
        <div key={char.id}>
          <h2>{char.name}</h2>
          <img
            src={`${char.thumbnail.path}/standard_xlarge.${char.thumbnail.extension}`}
            alt={char.name}
          />
        </div>
      ))}
    </form>
    </>
    
  );
};
