import React, { useState } from 'react';
import axios from 'axios';
import Pokeball from '../asset/img/pokeball.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/dist/js/bootstrap.min.js';
import { green } from '@mui/material/colors';

function Popup(props) {
  return (
    <div className="popup">
      <div className="popup-inner justify-content-center">
        <h1>{props.title}</h1>
        {props.children}
      </div>
    </div>
  );
}


const RandomPokemon = () => {
  const [pokemon, setPokemon] = useState(null);
  const [level, setLevel] = useState(null);
  const [loading, setLoading] = useState(false);
  const [startSafari, setStartSafari] = useState(false);
  const [habitatPicked, setHabitatPicked] = useState(true);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [selectedHabitat, setSelectedHabitat] = useState(null);
  const [keptPokemon, setKeptPokemon] = useState(() => {
    const storedPokemon = localStorage.getItem('keptPokemon');
    return storedPokemon ? JSON.parse(storedPokemon) : [];
  });
  const [selectedSection, setSelectedSection] = useState('');
  const [generateButtonClicked, setGenerateButtonClicked] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [initialCount, setInitialCount] = useState(null);
  const [count, setCount] = useState(null);
  const [countBall, setCountBall] = useState(null);
  const [time, setTime] = useState(false);
  const handlePokemonClick = async (pokemonName) => {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    setSelectedPokemon(response.data);
  };

  const handleHabitatSelection = (section) => {
    setHabitatPicked(false);
    setSelectedSection(section);
    const getHabitat = () => {
      let options = [];

      if (section === 'Forested Lot') {
        options = ['forest', 'grassland', 'urban'];
      } else if (section === 'Mountains') {
        options = ['cave', 'mountain', 'rough-terrain'];
      } else if (section === 'Beach') {
        options = ['sea', 'rare', 'waters-edge'];
      }

      const randomIndex= Math.floor(Math.random() * options.length);
      return options[randomIndex]
    }
    const habitat = getHabitat();
    setSelectedHabitat(habitat);
  };

  const generateRandomPokemon = async () => {
    decreaseCount();
    setStartSafari(false);
    setGenerateButtonClicked(true);
    setLoading(true);

    const habitatResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon-habitat/${selectedHabitat}`);
    const pokemonList = habitatResponse.data.pokemon_species;
    const randomPokemon = pokemonList[Math.floor(Math.random() * pokemonList.length)];

    const power = Math.floor(Math.random() * 201) + 100; // Generate a random power between 100 and 300

    const pokemonResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon/${randomPokemon.name}`);
    const enhancedPokemon = {
      ...pokemonResponse.data,
      power: power,
    };
    enhancedPokemon.name = enhancedPokemon.name.charAt(0).toUpperCase() + enhancedPokemon.name.slice(1);

    setTimeout(() => {
      setPokemon(enhancedPokemon);
      setLevel(power);
      setLoading(false);
    }, 1000);

    handleHabitatSelection(selectedSection);
    setShowPopup(true);
  };

  const decreaseCount = () => {
    setCount((prevCount) => prevCount -1);
    if (count === 0) {
      setTime(true);
      setStartSafari(false);
      setPokemon('');
      setInitialCount('');
      setSelectedHabitat('');
    }
  }

  const handleReleasePC = (pokemon) => {
    const newKeptPokemon = keptPokemon.filter((p) => p !== pokemon);
    setKeptPokemon(newKeptPokemon);
    localStorage.setItem('keptPokemon', JSON.stringify(newKeptPokemon));
  };


  const handleKeep = () => {
    if (keptPokemon.length >= 6) {
      alert('You can only keep up to 6 Pokemon!');
      return;
    }
    const newKeptPokemon = [...keptPokemon, pokemon];
    setKeptPokemon(newKeptPokemon);
    localStorage.setItem('keptPokemon', JSON.stringify(newKeptPokemon));
  };

  const genButtonPressed = () => {
    setStartSafari(true);
    setGenerateButtonClicked(true);
    const initialCount = 10;
    const initialBalls = 5;
    setCount(initialCount);
    setTime(false);
    setPokemon('');
    // setShowPopup(true);
  }

  return (
  <>
    <br />
    <div className="container-fluid" style={{ fontFamily: 'MyCustomFont' }}>
        <div className="col-md d-none d-md-block">
        <div className="row">
          <div className="col-md-1 " />
          <div className="col-md-10 safariBack p-1">
            <div className="col-md-12 container-fluid safariScreen">
              <div className="row">
                <div className="col-md-12 p-1" />
                <div className="col-sm-3 col-md-12 text-center">
                    <div className="safariMainScreen p-1 container-fluid">
                      <div className="row">
                        <div className="col-md-9 ">
                          <div className="safariMainScreen-Map container-fluid">
                          {loading ? (
                              <div className="row">
                                  <div className="col-md-8 safariMapKanto m-1" />
                                  <h2 className="col-md-3 justify-content-center m-4">Loading...</h2>
                              </div>
                          ) : 
                              startSafari ? (
                              <>
                              <div class="row">
                                <div class="col-md-8 safariMapKanto m-1" />
                                <div class="col-md-3 justify-content-center m-4">
                                  <h1>Select a Section</h1>
                                </div>
                              </div>
                              </>
                              ) : 
                              pokemon && showPopup && count > 0 ? (
                              <>
                              <div class="row">
                                <div class="col-md-8 safariMapKanto m-1" />
                                <div class="col-md-3 justify-content-center m-4 ">
                                    <div class="">
                                      <div key={pokemon.name}>
                                          <Popup title={pokemon.name}>
                                              <p>{level}</p>
                                              <img src={pokemon.sprites.front_default} alt={pokemon.name}  height="220" width="220" />   
                                          </Popup>
                                          {pokemon.types.map((type) => (
                                              <h4 key={type.type.name}><span className={'PokeType badge bg-dark'}>{type.type.name}</span></h4>
                                          ))}
                                      </div>
                                    </div>
                                </div>
                              </div>
                              </>
                          ) : 
                          pokemon && showPopup && count === 0 ? (
                            <>
                              <div class="row">
                                <div class="col-md-8 safariMapKanto m-1" />
                                
                              </div>
                            </>
                          ) : null}
                          </div>
                        </div>

                        <div className="col-md-1 safariMapLine">
                          {count > 0 ? (
                          <>
                            <h1>Move Left</h1>
                            <h3>{count}</h3>
                          </>
                          ) : 
                          count === 0 ? (
                          <>
                            <h1>You Have No Move Left!</h1>
                          </>
                          ) : count === null ?(
                          <>
                          </>
                          ) : null}
                        </div>
                        <div className="col-md-2">
                          <div className="popup-pokeball">
                            {generateButtonClicked && count > 0 ? (
                              <>
                                <div className="justify-content-center">
                                <div classname="habitat-section">
                                  <h1>| Section |</h1>
                                  <h3>{selectedSection}</h3>
                                </div>
                                <div>
                                  <button onClick={() => handleHabitatSelection('Forested Lot')}>Forested Lot</button>
                                  <button onClick={() => handleHabitatSelection('Mountains')}>Mountains</button>
                                  <button onClick={() => handleHabitatSelection('Beach')}>Beach</button>
                                  {/* Add more buttons for other habitats */}
                                </div>
      
                                <button onClick={generateRandomPokemon} className="getButton" disabled={habitatPicked}>Search Pokemon</button>
                                <button onClick={handleKeep} className="getButton" disabled={pokemon === ''}>Keep</button>
                                </div>
                              </>
                            ) : startSafari === false ? ( 
                              <>
                                <button onClick={genButtonPressed} className="getButton">Begin Safari</button>    
                              </>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    </div>
                </div>
                
                <div className="col-md-12 p-1" />

                <div className="col-sm-3 col-md-12 text-center homeText ">
                    <div className="pokemonList container-fluid" style={{fontSize: 25}}>
                      {keptPokemon.map((p) => (
                          <>
                              <div className="PC d-flex flex-row ">
                                <div>
                                  <div key={p.id}>
                                      <h2>{p.name}</h2>
                                      <img src={p.sprites.front_default} alt={p.name} />
                                  </div>
                                  <button onClick={() => handleReleasePC(p)}>Release</button>
                                </div>
                              </div>
                          </>
                      ))} 
                    </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-1" />
        </div>
        </div>

          <div className="d-sm-block d-md-none d-lg-none">
              
              <div className="col-sm-1 smDexBack1">
                  <div className="container-fluid">
                    <br />
                    <div className="col-sm-1 smDexBack1-1">
                        <br />
                        <div className="container">
                          <div className="safariMap-sm">
                            <div className="safariMap-sm2 justify-content-center" />
                          </div>
                        </div>
                    </div>
                  </div>
              </div>

              <div className="col-sm-1 smDexBack2">
                  <div className="container-fluid">
                      <div className="col-sm-1 smDexBack2-1">
                          
                          <div className="container-fluid">
                                  <div className="smDexList">
                                  {loading ? (
                                    <div>
                                        <div className="gif" />
                                        <h2>Loading...</h2>
                                    </div>
                                  ) : 
                                    showPopup ? (
                                    <div class="justify-content-center">
                                      <h1>Select a habitat</h1>
                                      <img src='../asset/img/safari.jpeg' />
                                    </div>
                                  ) :
                                    pokemon && showPopup ? (
                                    <div class="justify-content-center">
                                        <div key={pokemon.name}>
                                            <Popup title={pokemon.name} >
                                                <img src={pokemon.sprites.front_default} alt={pokemon.name}  height="150" width="150" />   
                                            </Popup>
                                        </div>
                                    </div>
                                  ) : null}
                                  </div>
                          </div>
                      </div>
                  </div>
              </div>

              <div className="col-sm-1 smDexBack3">
                  <div className="container-fluid">
                      <br/>
                      <div className="row">
                          <div className="col-sm-4 p-4 smDexBack3-1">
                          {generateButtonClicked ? (
                            <>
                            <button onClick={generateRandomPokemon} className="getButton">Catch Again</button>
                            <button onClick={handleKeep} className="getButton">Keep</button>
                            </>
                          ) : (
                            
                            
                            <>
                            <button onClick={generateRandomPokemon} className="getButton">Begin Safari</button>    
                          </>
                          )}
                          </div>
                      </div>
                      
                  </div>
              </div>
          </div>
        
    </div>
    <br/>
    
    
    
    
    
</>
  );
};

export default RandomPokemon;
