import React from 'react';

export default function KaydedilenlerListesi(props) {
  console.log("KaydedilenlerListesi",props.list)
  return (
    <div className="saved-list">
      <h3>Kaydedilen Filmler:</h3>
      {props.list.map(movie => (
         <span className="saved-movie">{movie.title}</span>
      ))}
      <div className="home-button">Anasayfa</div>
    </div>
  );
}
