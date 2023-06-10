import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Switch,
  Route,
} from "react-router-dom";


//Components/Filmler
import KaydedilenlerListesi from './Filmler/KaydedilenlerListesi';
import FilmListesi from './Filmler/FilmListesi';
import FilmCard from './Filmler/FilmCard';
import Film from './Filmler/Film';

export default function App () {
  const [saved, setSaved] = useState([]); // Stretch: the ids of "saved" movies
  const [movieList, setMovieList] = useState([]);


  useEffect(() => {
    const FilmleriAl = () => {
      axios
        .get('http://localhost:5001/api/filmler') // Burayı Postman'le çalışın
        .then(response => {
          // Bu kısmı log statementlarıyla çalışın
          console.log("response",response.data)
          // ve burdan gelen response'u 'movieList' e aktarın
          setMovieList(response.data);
        })
        .catch(error => {
          console.error('Sunucu Hatası', error);
        });
    }
    FilmleriAl();
  }, []);

  // Kaydedilenler listesinde tum movie oldugu icin id @den movie degistirdim
  const KaydedilenlerListesineEkle = (movie) => {
    // Burası esnek. Aynı filmin birden fazla kez "saved" e eklenmesini engelleyin
    console.log("KaydedilenlerListesineEkle",movie)
    saved.filter(item =>movie.id=== item.id ).length === 0 ? setSaved([...saved,movie]): setSaved([...saved]);
  };
  useEffect(()=>{
    console.log("saved",saved)

  },[saved])
  return (
    <div>
      
      <KaydedilenlerListesi list={saved} />
        <Switch>
        <Route path = {`/filmler/:id`}>
                <Film KaydedilenlerListesineEkle ={KaydedilenlerListesineEkle}/>
          </Route>
          <Route path="/">
            <FilmListesi movies={movieList} />
          </Route>
        </Switch>
    </div>
  );
}
