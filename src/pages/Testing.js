import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

const getRandomNumber = () => {
  return Math.floor(Math.random() * 500) + 1;
};

const CardGame = () => {
  const [playerCard, setPlayerCard] = useState(getRandomNumber());
  const [opponentCard, setOpponentCard] = useState(null); // Opponent card initially hidden
  const [showOpponentCard, setShowOpponentCard] = useState(false); // To reveal opponent card value
  const [pokemon, setPokemon] = useState(null);
  const [keptPokemon, setKeptPokemon] = useState(() => {
    const storedPokemon = localStorage.getItem('keptPokemon');
    return storedPokemon ? JSON.parse(storedPokemon) : [];
  });
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  const handleMenuSelection = (pokemon) => {
    setSelectedPokemon(pokemon);
  };

  const handleFight = () => {
    setShowOpponentCard(true); // Reveal opponent card value
    if (playerCard > opponentCard) {
      const opponentHasHigherCard = Math.random() <= 0.4;
      if (opponentHasHigherCard) {
        setPlayerCard(playerCard + opponentCard * 0.001);
      } else {
        setPlayerCard(playerCard + opponentCard);
      }
      if (selectedPokemon) {
        const updatedKeptPokemon = keptPokemon.filter((p) => p.id !== selectedPokemon.id);
        setKeptPokemon(updatedKeptPokemon);
        setSelectedPokemon(null);
      }
      setOpponentCard(getRandomNumber());
    } else {
      if (selectedPokemon) {
        const updatedKeptPokemon = keptPokemon.filter((p) => p.id !== selectedPokemon.id);
        setKeptPokemon(updatedKeptPokemon);
        setSelectedPokemon(null);
      }
    }
  };

  const handleNewCard = () => {
    setPlayerCard(getRandomNumber());
    setOpponentCard(null); // Hide opponent card value
    setShowOpponentCard(false); // Reset to hide revealed value
  };

  const handleContinue = () => {
    if (selectedPokemon) {
      const updatedKeptPokemon = keptPokemon.filter((p) => p.id !== selectedPokemon.id);
      setKeptPokemon(updatedKeptPokemon);
      setSelectedPokemon(null);
    }
  };

  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Player Card</h5>
              <p className="card-text">Value: {playerCard}</p>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Opponent Card</h5>
              <p className="card-text">
                Value: {showOpponentCard ? opponentCard : '???'}
              </p>
              <button className="btn btn-danger" onClick={handleNewCard}>
                Draw New Card
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-3">
        <div className="col-md-12">
          <h4>Select a Pokémon from your collection:</h4>
          <div className="pokemonList container-fluid" style={{ fontSize: 25 }}>
            {keptPokemon.map((p) => (
              <div key={p.id} className="PC d-flex flex-row">
                <div>
                  <div>
                    <h2>{p.name}</h2>
                    <img src={p.sprites.front_default} alt={p.name} />
                  </div>
                  <div>
                    <button className="btn btn-secondary" onClick={() => setPlayerCard(p.id)}>
                      Use as Card
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="row mt-3">
        <div className="col-md-12">
          <button
            className="btn btn-primary"
            onClick={handleFight}
          >
            Fight
          </button>
          {playerCard <= opponentCard && (
            <button className="btn btn-danger" onClick={handleContinue}>
              Continue
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CardGame;
