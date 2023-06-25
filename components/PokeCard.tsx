import React from 'react';
import {Card} from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import {PokeCardProps} from '@/interfaces/PokeCardProps';

export const PokeCard = ({name, image, id}: PokeCardProps) => {
    return (
        <React.Fragment>
            <Link href={`/pokemon-detail?id=${id}`}>
                <Card
                    hoverable
                    style={{ width: 240 }}
                    cover={<Image alt={`gambar-${id}`} src={image} width={300} height={300} />}
                >
                    <Card.Meta title={name} description={`ID: ${id}`} />
                </Card>
            </Link>
        </React.Fragment>

    )
}