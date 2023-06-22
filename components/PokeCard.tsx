import React from 'react';
import {Card} from 'antd';
import Image from 'next/image';

interface PokeCardProps {
    name: string;
    image: string;
    id: number;
}


export const PokeCard = ({name, image, id}: PokeCardProps) => {
    return (
        <React.Fragment>
            <Card
                hoverable
                style={{ width: 240 }}
                cover={<Image alt={`gambar-${id}`} src={image} width={300} height={300} />}
            >
                <Card.Meta title={name} description={`ID: ${id}`} />
            </Card>
        </React.Fragment>

    )
}