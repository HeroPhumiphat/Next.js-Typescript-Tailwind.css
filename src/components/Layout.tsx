import React, {ReactNode} from 'react';
import Header from "./Header";

interface LayoutProps { 
    children: ReactNode;
}

export default function Layout ({ children }: LayoutProps) {
    return (
        <>
            <div className='z-40'>
                <Header />
            </div>
            <div className='z-20 h-ful'>
                {children}
            </div>
        </>
    )
}