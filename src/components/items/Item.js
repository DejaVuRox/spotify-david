import React from 'react'
import nocover from '../../assets/nocover.jpg'
import format from 'format-duration'
import {Link} from "react-router-dom";
import {Col, Image, Space} from "../antd/antd";

export const Item = (props) => {
    if (props.duration) {
        return (
            <Col span={24} key={props.id}>
                <span>{`${props.band} ${format(props.duration)}`}</span>
            </Col>
        )
    }

    const image = props.image.length > 0 ? props.image[0].url : nocover
    if (props.navigateTo) {
        return (
            <Col
                xs={{span: 6, offset: 8}} lg={{span: 5, offset: 1}}
                key={props.id}
                onClick={() => props.itemClick(props.id)}
            >
                <Space align={'center'} direction={'vertical'}>
                    <Image width={300} height={300} src={image} alt={''}/>
                    <Link to={props.navigateTo}>
                        <p>{props.band}</p>
                    </Link>
                </Space>
            </Col>
        )
    }

    return (
        <div key={props.id} onClick={() => props.itemClick(props.id)}>
            <p>{props.band}</p>
            <img src={image} alt={''}/>
        </div>
    )
}

export default Item
