import React, { useState, useEffect } from 'react';
import { Timeline, eagerLoadTwitterLibrary } from 'react-twitter-widgets';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import changelogData from "./changelog.json";

eagerLoadTwitterLibrary();

const Home = () => {
    const [pokemon, setPokemon] = useState(null);
    const [keptPokemon, setKeptPokemon] = useState(() => {
        const storedPokemon = localStorage.getItem('keptPokemon');
        return storedPokemon ? JSON.parse(storedPokemon) : [];
    });
    const [changelog, setChangelog] = useState([]);

    useEffect(() => {
        const reversedChangelog = changelogData.slice().reverse();
        setChangelog(reversedChangelog);
    }, []);

    const pokemonData = async () => {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon/${name}');
        const pokemon = response.data;
        pokemon.name = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
        setPokemon(pokemon);
    }

    return (
        <>
        <br/>
        <div className="container-fluid" style={{ fontFamily: 'MyCustomFont' }}>
            <div className="row">
                {/* Row 1 */}
                <div className="col-sm-1 col-md-1" />
                <div className="col-sm-3 col-md-4">
                    <h1 className="homeTitle">More From Pokemon</h1>
                    <div id="twtTimeline">
                        <Timeline
                            dataSource={{
                            sourceType: 'profile',
                            screenName: 'Pokemon'
                            }}
                            options={{
                            height: '400',
                            width: '100%'
                            }}
                        />
                    </div>
                </div>
            
                <div className="col-sm-2 col-md-2" />
            
                <div className="col-sm-3 col-md-4 homeText">
                    <h1 className="homeTitle">Your Pokemon</h1>
                    <div className="homeList">
                        <div >
                        {keptPokemon.map((p) => (
                            <div key={p.id} className="PC">
                                
                                <img src={p.sprites.front_default} alt={p.name} />  
                                <h4>{p.name}</h4>
                            </div>
                        ))}
                        </div>
                    </div>
                </div>
                <div className="col-sm-1 col-md-1" />

                {/* Row 2 */}
                <div className="col-sm-4 col-md-3" />
                <div className="col-sm-4 col-md-6 mx-2 my-2">
                    <h2 className="homeTitle">Changelog</h2>
                    <div className="changelog">
                    {changelog.map((entry, index) => (
                        <div key={index}>
                            <h3>Version {entry.version} ({entry.date})</h3>
                            
                            <ul>
                                {entry.changes.map((change, i) => (
                                    <li key={i}>{change}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                    </div>
                </div>
                <div className="col-sm-4 col-md-3" />
            </div>
        </div>
        <br className="d-none d-sm-block" />
        <br className="d-none d-sm-block" />
        </>
    );
}

export default Home;