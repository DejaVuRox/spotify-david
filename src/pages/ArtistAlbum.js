import React from 'react';
import {connect} from "react-redux";
import ItemList from "../components/items/ItemList";
import {Col, Image, Row} from "../components/antd/antd";


const ArtistAlbum = (props) => {
    const hasArtistAlbum = props.artistAlbum !== null

    if (hasArtistAlbum) {
        const artistAlbum = props.artistAlbum
        const bands = artistAlbum.artists.map(artist => (
            <span key={artist.id}>{artist.name}</span>
        ))


        return (
            <Row>
                <Col span={24}>
                    <Row align={'middle'} justify={'center'} gutter={20}>
                        <Col>
                            <Row>
                                <span style={{fontSize: '48px', textShadow: '2px 2px #ffff'}}>Band/s: {bands}</span>
                            </Row>
                            <Row>
                                <span style={{fontSize: '48px'}}>Album name: {artistAlbum.name}</span>
                            </Row>
                        </Col>
                    </Row>
                    <Row gutter={12} justify={'center'}>
                        <Col style={{marginTop: '25px'}}>
                            <Image src={artistAlbum.images[0].url} alt={''}/>
                        </Col>
                        <Col style={{fontSize: '24px'}} span={13}>
                            <ItemList tracks={artistAlbum.tracks.items}/>
                        </Col>
                    </Row>
                </Col>
            </Row>
        );
    }

    return (
        <div>
            <span>error occurred</span>
            <button>Go Back</button>
        </div>
    );
}

const mapStateToProps = (state) => ({
    artistAlbum: state.spotify.artistAlbum
})

export default connect(mapStateToProps)(ArtistAlbum);
