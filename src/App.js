import React from 'react';
import {Route} from 'react-router'
import ArtistSearch from "./pages/ArtistSearch";
import ArtistAlbums from "./pages/ArtistAlbums";
import ArtistAlbum from "./pages/ArtistAlbum";
import backgroundSvg from './assets/svgexport-3.svg'

const App = () => {
    return (
        <div style={{
            padding: '20px',
            backgroundImage: `url(${backgroundSvg})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'contain',

        }}>
            <Route exact path={'/'} render={() => <ArtistSearch/>}/>
            <Route exact path={'/albums'} render={() => <ArtistAlbums/>}/>
            <Route exact path={'/albums/album'} render={() => <ArtistAlbum/>}/>
        </div>
    );
}

export default App;

