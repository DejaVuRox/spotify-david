import React, {useEffect, useState} from 'react';
import {getToken, resetSearch, searchMusic} from "../../store/actions/spotifyActions";
import {connect} from "react-redux";
import {Row, Col, Input} from '../../components/antd/antd'

const {Search: AntdSearch} = Input;

const Search = (props) => {
    const [searchField, setSearchField] = useState('')
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        props.getToken()
    }, [props]);

    const onChangeHandler = (e) => {
        const value = e.target.value
        setSearchField(value)
    }

    const onSubmitHandler = async (offset) => {
        try {
            setLoading(true)
            props.resetSearch()
            await props.searchMusic(searchField, offset, true)
            setLoading(false)
        }
        catch (e) {
            console.log('Search', e)
        }
    }

    return (

        <Row justify={'center'}>
            <Col>
                <AntdSearch
                    placeholder={'Search Artist'}
                    size={'large'}
                    value={searchField}
                    onChange={onChangeHandler}
                    onSearch={() => onSubmitHandler(0)}
                    enterButton="Search"
                    loading={loading}
                />
            </Col>
        </Row>
    );
}

const mapStateToProps = (state) => ({
    searchResult: state.spotify.searchResult
})


export default connect(mapStateToProps, {getToken, searchMusic, resetSearch})(Search);
