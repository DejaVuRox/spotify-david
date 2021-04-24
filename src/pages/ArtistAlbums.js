import React from 'react';
import {connect} from "react-redux";
import ItemList from "../components/items/ItemList";
import {selectAAlbum} from "../store/actions/spotifyActions";
import {Col, Row} from "../components/antd/antd";


const ArtistAlbums = (props) => {
    const hasArtistAlbums = props.artistAlbums.length > 0
    const artistAlbums = hasArtistAlbums &&
        <ItemList items={props.artistAlbums} navigateTo={'/albums/album'} onItemClick={props.selectAAlbum}/>

    console.log('ArtistAlbums rendered')

    return (
        <Row align={'middle'} justify={'center'}>
            <Col span={24}>
                <Row justify={'center'}>
                    <span style={{fontSize: '48px', textShadow: '2px 2px #ffff'}}>Artist Albums</span>
                </Row>
            </Col>
            <Col>
                {artistAlbums}
            </Col>
        </Row>
    );
}

const mapStateToProps = (state) => ({
    artistAlbums: state.spotify.artistAlbums
})

export default connect(mapStateToProps, {selectAAlbum})(ArtistAlbums);
