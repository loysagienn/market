import React from 'react';
import {Tile} from '../';
import style from './buildCssMap';

export default ({model, offer, routeTo}) => (
    <div
        key={model ? model.id : offer.id}
        className={style.main}
    >
        {
            model ? renderModel(model, routeTo) : renderOffer(offer, routeTo)
        }
    </div>
);


function renderOffer({name, description, previewPhotos, url, shopInfo, price}, routeTo) {
    const previewPhotoUrl = previewPhotos && previewPhotos.length > 0
        ? previewPhotos[0].url
        : '';

    return (
        <Tile
            className={style.tile}
            href={url}
            target="_blank"
        >
            {renderPreview(previewPhotoUrl)}
            <div className={style.price}>
                {price.value} {price.currencyName}
            </div>
            <div className={style.info}>
                <div className={style.name}>{name}</div>
                <div className={style.description}>{description}</div>
                <div className={style.shop}>Магазин: {shopInfo.name}</div>
            </div>
        </Tile>
    )
}

function renderModel({name, description, previewPhoto = {}, mainPhoto = {}, vendor, link, prices}, routeTo) {

    const previewPhotoUrl = previewPhoto.url || mainPhoto.url || '';

    // onClick={() => routeTo({path: `model?id=${id}`})}

    return (
        <Tile
            className={style.tile}
            href={link}
            target="_blank"
        >
            {renderPreview(previewPhotoUrl)}
            <div className={style.price}>
                ~{prices.avg} {prices.curName}
            </div>
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
