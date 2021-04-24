import React from 'react';
import {searchMusic, selectArtist} from "../store/actions/spotifyActions";
import {connect} from "react-redux";
import ItemList from "../components/items/ItemList";
import Search from "../components/search/Search";
import InfiniteScroll from "react-infinite-scroll-component";
import {Row} from "../components/antd/antd";

const ArtistSearch = (props) => {
    const hasSearchResult = props.searchResult.length > 0
    const hasMoreResults = props.searchResult.length !== props.totalResults

    if (hasSearchResult) {
        return (
            <div>
                <Search/>
                <InfiniteScroll
                    dataLength={props.searchResult.length}
                    hasMore={hasMoreResults}
                    loader={''}
                    next={() => props.searchMusic(props.searchValue, 15, false)}
                >
                    <ItemList items={props.searchResult} onItemClick={props.selectArtist} navigateTo={'/albums'}/>
                </InfiniteScroll>
            </div>
        );
    }
    return (
        <div>
            <Search/>
            <Row justify={'center'}>
                {'no results'}
            </Row>
        </div>
    );
}

const mapStateToProps = (state) => ({
    searchResult: state.spotify.searchResult,
    searchValue: state.spotify.searchValue,
    totalResults: state.spotify.totalResults
})

export default connect(mapStateToProps, {selectArtist, searchMusic})(ArtistSearch);
