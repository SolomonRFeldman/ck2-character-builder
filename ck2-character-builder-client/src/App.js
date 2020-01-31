import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import NavBar from './components/NavBar/NavBar';
import CharacterCard from './components/Character/CharacterCard';

export default function App() {
  return (
    <div className="App">
      <header>
        <NavBar />
      </header>
      <CharacterCard />
    </div>
  );
}