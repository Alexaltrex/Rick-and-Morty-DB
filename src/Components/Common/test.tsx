import {ReactElement} from "react";
import React from "react";


export interface PropsInterface {
    title?: string,
    children: React.ReactNode
}

export const Component1 = ({title, children}: PropsInterface): ReactElement =>  {
    return (
        <div>
            {title} : {children}
        </div>
    )
}