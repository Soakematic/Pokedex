import React, { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { Pagination } from "react-bootstrap";

const Pokedex = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState('kanto');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  

   const fetchPokemon = async (region, page) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokedex/${region}`
      );
      const regionPokemonUrls = response.data.pokemon_entries.map(
        (entry) => entry.pokemon_species.url
      );
      const regionTotalPages = Math.ceil(regionPokemonUrls.length / 10);
      setTotalPages(regionTotalPages);

      const offset = (page - 1) * 10;
      const pagePokemonUrls = regionPokemonUrls.slice(offset, offset + 10);

      const pokemonPromises = pagePokemonUrls.map((url) => axios.get(url));
      const pokemonResponses = await Promise.all(pokemonPromises);
      const pokemonData = pokemonResponses.map((response) => response.data);
      setPokemonList((prevPokemon) => [...prevPokemon, ...pokemonData]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
      document.documentElement.offsetHeight
    )
      return;
    if (loading) return;
    if (currentPage >= totalPages) return;
    setCurrentPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    fetchPokemon(selectedRegion, currentPage);
  }, [selectedRegion, currentPage]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });


  const handleRegionChange = async (region) => {
    setPokemonList([]);
    setSelectedRegion(region);
    setCurrentPage(1);
  };

  


  const handlePokemonClick = async (pokemonName) => {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    const selectedPokemon = response.data;
    selectedPokemon.name = selectedPokemon.name.charAt(0).toUpperCase() + selectedPokemon.name.slice(1);
    setSelectedPokemon(selectedPokemon);
  };

  

  return (
  <>
    
    <div className="container-fluid " style={{ fontFamily: 'MyCustomFont' }}>
        <div className="col-md d-none d-md-block">
            <br />    
            <div className="row">
            
                <div className="col-sm-1 col-md-1 col-lg-1" />
                <div className="dexList col-sm-5 col-md-5">
                    <br/>                
                    <br/>
                    <div class="container-fluid ">
                        <div className="row">
                            <div className="col-sm-2 col-md-2 pokedexBack" />
                            <div className="col-sm-1 col-md-1 pokedexBack1-11" />
                            <div className="col-sm-1 col-md-1 pokedexBack1-12" />
                            <div className="col-sm-1 col-md-1 pokedexBack1-13" />
                            <div className="col-sm-1 col-md-3" />
                            <div className="col-sm-4 col-md-4 pokedexBack1" />

                            <div className="col-sm-1 col-md-1" />
                            <div className="col-sm-10 col-md-11  pokedexBack1-2">
                                <div className="dexScroll">
                                    {pokemonList.map((pokemon) => (
                                        <>
                                            <div className="container-fluid" key={pokemon.name}>
                                                <div className="row">
                                                    <Button className="col-sm-2" variant="contained" onClick={() => handlePokemonClick(pokemon.name)}
                                                    sx={{mx : 'auto', width: 325, marginBottom: 1, border: 1, borderRadius: '10px' }} style={{ fontFamily: 'MyCustomFont' , fontSize: 20}}>
                                                        {pokemon.name}
                                                    </Button>
                                                </div>
                                            </div>
                                        </>
                                    ))}
                                    {loading && <p>Loading...</p>}
                                    {currentPage < totalPages && 
                                        <Pagination.Item disabled={loading} active={false} onClick={() => setCurrentPage(currentPage + 1)}>
                                            <Button variant="contained" sx={{mx : 'auto', width: 200, border: 1, borderRadius: '10px', textAlign: 'center', fontFamily: 'MyCustomFont' , fontSize: 20 }}>
                                                <p>Load More</p>
                                            </Button>
                                        </Pagination.Item>
                                    }
                                </div>
                                <br />
                                <div className="pokedexRegionButton" >
                                    <button class="btn btn-primary" onClick={() => handleRegionChange('kanto')} disabled={selectedRegion === 'kanto'} >
                                        KANTO
                                    </button>
                                    <button class="btn btn-primary" onClick={() => handleRegionChange('updated-johto')} disabled={selectedRegion === 'updated-johto'} >
                                        JOHTO
                                    </button>
                                    <button class="btn btn-primary" onClick={() => handleRegionChange('hoenn')} disabled={selectedRegion === 'hoenn'} >
                                        HOENN
                                    </button>
                                    <button class="btn btn-primary" onClick={() => handleRegionChange('extended-sinnoh')} disabled={selectedRegion === 'extended-sinnoh'} >
                                        SINNOH
                                    </button>
                                    <button class="btn btn-primary" onClick={() => handleRegionChange('updated-unova')} disabled={selectedRegion === 'updated-unova'} >
                                        UNOVA
                                    </button>
                                    <button class="btn btn-primary" onClick={() => handleRegionChange('kalos-central')} disabled={selectedRegion === 'kalos-central'} >
                                        KALOS
                                    </button>
                                    <button class="btn btn-primary" onClick={() => handleRegionChange('original-alola')} disabled={selectedRegion === 'original-alola'} >
                                        ALOLA
                                    </button>
                                </div>
                            </div>
                            <div className="col-sm-1 col-md-1 pokedexBack1-3" />
                        </div> 
                    </div>
                </div>

                <div className="col-sm-5 col-md-5">
                    <br/>
                    <br/>
                    <div className="row">
                        <div className="col-sm-4 col-md-4 pokedexBack2" />
                        
                        <div className="col-sm-8 col-md-8" />

                        <div classname="col-sm-1 col-md-1" />

                        <div className="col-sm-10 col-md-10 pokedexBack2-2">
                            
                            <div className="pokemon-details">
                            {selectedPokemon &&  (
                                <div className="container-fluid" style={{fontSize: 20}}>
                                    <div className="row">
                                        <div className="col-md-3">
                                            <img className="pokemonPortrait" src={selectedPokemon.sprites.front_default} alt={selectedPokemon.name} />
                                        </div>
                                        <div className="col-md-9" style={{lineHeight: 0.3}}>
                                            <div className="row">
                                                <div className="col-md-2" />
                                                <div className="col-md-8">
                                                    <h2>{selectedPokemon.name}</h2>
                                                    <p>{selectedPokemon.order}</p>
                                                    {selectedPokemon.types.map((type) => (
                                                        <p key={type.type.name} className={'badge text-wrap bg-dark m-1'}>{type.type.name}</p>

                                                    ))}
                                                </div>
                                                <div className="col-md-2" />
                                            </div>
                                        </div>
                                        
                                        <div className="col-md-12"><br/></div>

                                        <div className="col-md-6">
                                            <h3>Size:</h3>
                                            <p style={{lineHeight: 0.7}}>Height: {selectedPokemon.height}</p>
                                            <p style={{lineHeight: 0.7}}>Weight: {selectedPokemon.weight}</p>
                                        </div>

                                        <div className="col-md-6">
                                            <h3>Abilities:</h3>
                                            {selectedPokemon.abilities.map((ability) => (
                                                <p style={{lineHeight: 0.7}} key={ability.ability.name}>{ability.ability.name}</p>
                                            ))}
                                        </div>
                                        
                                        

                                    </div>
                                </div>
                            )}
                            </div>
                        </div>
                        <div classname="col-sm-1 col-md-1" />
                    </div>                
                </div>
            </div>
            <br />
            <br />
            <br />
            <br/>
        </div>

        <div className="d-sm-block d-md-none d-lg-none">
            <br/>
            <div className="col-sm-1 smDexBack1">
                <div className="container-fluid">
                    <br />
                        <div className="col-sm-1 smDexBack1-1">
                            <br />
                            <div className="container-fluid">
                                <div className="smDexDetail">
                                {selectedPokemon &&  (
                                    <div style={{fontSize: 15}}>
                                        <h2>{selectedPokemon.name}</h2>
                                        <img src={selectedPokemon.sprites.front_default} alt={selectedPokemon.name} />
                                        <p>Height: {selectedPokemon.height}</p>
                                        <p>Weight: {selectedPokemon.weight}</p>
                                        <h3>Abilities:</h3>
                                        {selectedPokemon.abilities.map((ability) => (
                                            <p key={ability.ability.name}>{ability.ability.name}</p>
                                        ))}
                                    </div>
                                )}
                                </div>
                            </div>
                        </div>
                    
                </div>
            </div>

            <div className="col-sm-1 smDexBack2">
                <div className="container-fluid">
                    <div className="col-sm-1 smDexBack2-1">
                        <br/>
                        <div className="container-fluid">
                                <div className="smDexList">
                                    {pokemonList.map((pokemon) => (
                                        <>
                                            <div className="container-fluid" key={pokemon.name}>
                                                <div className="row">
                                                    <Button className="col-sm-2" variant="contained" onClick={() => handlePokemonClick(pokemon.name)}
                                                    sx={{mx : 'auto', width: 325, marginBottom: 1, border: 1, borderRadius: '10px' }} style={{ fontFamily: 'MyCustomFont' , fontSize: 20}}>
                                                        {pokemon.name}
                                                    </Button>
                                                </div>
                                            </div>
                                        </>
                                    ))}
                                    {loading && <p>Loading...</p>}
                                    {currentPage < totalPages && 
                                        <Pagination.Item disabled={loading} active={false} onClick={() => setCurrentPage(currentPage + 1)}>
                                            <Button variant="contained">
                                                Load More
                                            </Button>
                                        </Pagination.Item>
                                    }
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
                            <div className="container-fluid">
                                <div clasName="row">
                                <br/>
                                <div className="pokedexRegionButton">
                                    <button class="btn btn-primary" onClick={() => handleRegionChange('kanto')} disabled={selectedRegion === 'kanto'} >
                                        KANTO
                                    </button>
                                    <button class="btn btn-primary" onClick={() => handleRegionChange('updated-johto')} disabled={selectedRegion === 'updated-johto'} >
                                        JOHTO
                                    </button>
                                    <button class="btn btn-primary" onClick={() => handleRegionChange('hoenn')} disabled={selectedRegion === 'hoenn'} >
                                        HOENN
                                    </button>
                                    <button class="btn btn-primary" onClick={() => handleRegionChange('extended-sinnoh')} disabled={selectedRegion === 'extended-sinnoh'} >
                                        SINNOH
                                    </button>
                                    <button class="btn btn-primary" onClick={() => handleRegionChange('updated-unova')} disabled={selectedRegion === 'updated-unova'} >
                                        UNOVA
                                    </button>
                                    <button class="btn btn-primary" onClick={() => handleRegionChange('kalos-central')} disabled={selectedRegion === 'kalos-central'} >
                                        KALOS
                                    </button>
                                    <button class="btn btn-primary" onClick={() => handleRegionChange('original-alola')} disabled={selectedRegion === 'original-alola'} >
                                        ALOLA
                                    </button>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
           
            
            
            
            
        </div>
    </div>
    
    
    
  </>
  );
};

export default Pokedex;
