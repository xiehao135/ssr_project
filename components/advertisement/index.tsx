import { FC, useState } from 'react';
import styles from "./styles.module.scss"
import Image from 'next/image';

export interface IAdvertisementProps { 
    advertisementImgs: IAdvertisementImgInfo[];
}

interface IAdvertisementImgInfo {
    image: string;
    text: string;
    jumpUrl: string;
    name: string;
}

export const Advertisement: FC<IAdvertisementProps> = ({
    advertisementImgs,
}) => {
    const [advertisementContent, setAdvertisementContent] = useState(advertisementImgs)

    function closeAdvertisementBlock(e: any) {
        let blockId = e.target.id;
        e.stopPropagation()
        setAdvertisementContent(advertisementContent.filter((item, index) => {
            return item.name !== blockId
        }))
    } 

    function showPromoteAdvertisementText(e: any) {
        e.target.innerHTML = e.type === 'mouseenter' ? '投放广告' : '广告'
    }


    return (
        <div className={styles.advertisement}>
            {advertisementContent?.map((item, index) => (
                <div className={styles.advertisementBlock} style={{backgroundImage: `${item.image}`}} onClick={(): void => {
                    item.jumpUrl && window.open(item.jumpUrl,"blank","noopener=yes,noreferrer=yes")
                }} key={index}>
                    <Image
                        src={item?.image}
                        alt={item?.text}
                        width={224}
                        height={186}>
                    </Image>
                    <div className={styles.closeBt} onClickCapture={closeAdvertisementBlock} id={item?.name}>
                        ×
                    </div>
                    <div className={styles.advertisementTip}
                        onMouseEnter={showPromoteAdvertisementText}
                        onMouseLeave={showPromoteAdvertisementText}
                        onClickCapture={showPromoteAdvertisementText}>
                        广告
                    </div>
                </div>
            ))}
        </div>
    )
}