import React from 'react'
import Item from './Item'
import {v4 as uuidv4} from 'uuid';
import {Row} from "../antd/antd";

export const ItemList = (props) => {
    let data
    if (props.items) {
        data = props.items.map(item => (
            <Item
                key={uuidv4()}
                id={item.id}
                image={item.images}
                band={item.name}
                href={item.href}
                itemClick={props.onItemClick}
                navigateTo={props.navigateTo}
            />
        ))
    }

    if (props.tracks) {
        data = props.tracks.map(item => (
            <Item
                key={uuidv4()}
                id={item.id}
                band={item.name}
                duration={item.duration_ms}
            />
        ))
    }

    return (
        <Row style={{marginTop: '20px'}}>
            {data}
        </Row>
    )
}
export default ItemList
