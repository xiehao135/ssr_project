import Link from "next/link";
import { useContext } from "react";
import { FC } from "react";

import cName from "classnames";
import styles from "./related.module.scss"

interface realtedLink {
    title: string
    link?: string
}

export interface RelatedProps {
    title: string
    list: realtedLink[]
}
export const RelatedArticle: FC<RelatedProps> = ({
    title, 
    list
}) => {
    return (
        <div className={styles.list}>
            <div className={styles.Title}>
                <h3>{title}</h3>
            </div>
            <div className={styles.Body}>
                {
                    list?.map((item, index) => {
                        return (
                            <div
                                className={cName({
                                    [styles.link]: item.link
                                })}
                                onClick={(): void => {
                                    item.link && window.open(item.link, "blank", "noopener=yes,noreferrer=yes")
                                }}
                                key={`link${index}`}
                            >
                                {item.title}
                            </div>
                        )
                    })
                }
            </div>
        </div>
        // <Card title={title} style={{width:300}}>
        //     <div className={styles.list}>
        //         {
        //             list?.map((item, index) => {
        //                 return (
        //                     <div
        //                         className={cName({
        //                             [styles.link]: item.link
        //                         })}
        //                         onClick={(): void => {
        //                             item.link && window.open(item.link, "blank", "noopener=yes,noreferrer=yes")
        //                         }}
        //                         key={`link${index}`}
        //                     >
        //                         {item.title}
        //                     </div>
        //                 )
        //             })
        //         }
        //     </div>
        // </Card>
        
    )
}