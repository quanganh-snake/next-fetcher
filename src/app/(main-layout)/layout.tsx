import Header from '@/components/Header';
import React from 'react';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <main>
            <Header />
            {children}
        </main>
    );
};

export default MainLayout;
