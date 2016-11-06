import React from 'react';
import {Tile} from '../';
import style from './buildCssMap';

export default ({model, offer, routeTo}) => model ? renderModel(model, routeTo) : renderOffer(offer, routeTo);


function renderOffer({id, name, description, previewPhotos, url, shopInfo}, routeTo) {
    const previewPhotoUrl = previewPhotos && previewPhotos.length > 0
        ? previewPhotos[0].url
        : '';

    return (
        <Tile
            key={id}
            className={style.main}
            href={url}
            target="_blank"
        >
            {renderPreview(previewPhotoUrl)}
            <div className={style.info}>
                <div className={style.name}>{name}</div>
                <div className={style.description}>{description}</div>
                <div className={style.shop}>Магазин: {shopInfo.name}</div>
            </div>
        </Tile>
    )
}

function renderModel({id, name, description, previewPhoto = {}, mainPhoto = {}, vendor, link}, routeTo) {

    const previewPhotoUrl = previewPhoto.url || mainPhoto.url || '';

    // onClick={() => routeTo({path: `model?id=${id}`})}

    return (
        <Tile
            key={id}
            className={style.main}
            href={link}
            target="_blank"
        >
            {renderPreview(previewPhotoUrl)}
            <div className={style.info}>
                <div className={style.name}>
                    {vendor} {name}
                </div>
                <div className={style.description}>{description}</div>
            </div>
        </Tile>
    )
}

function renderPreview(url) {
    return (
        <div
            className={style.preview}
            style={{backgroundImage: `url(${url})`}}
        />
    )
}
