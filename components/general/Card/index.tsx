import type { FC } from "react";
import type { CardProps } from "@arco-design/web-react";
import { Card as ArcoCard } from "@arco-design/web-react";

export const Card: FC<CardProps> = (props) => {
    return (
        <ArcoCard {...props} style={{backgroundColor: "white", ...props.style}} />
    )
}