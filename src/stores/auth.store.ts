import { create } from 'zustand';
import Cookies from 'js-cookie';
import { persist } from 'zustand/middleware';

type User = {
    id: number;
    email: string;
    password: string;
    name: string;
    role: string;
    avatar: string;
};

type AuthStoreState = {
    isAuth: boolean;
    user: User | null;
    onSetToken: (accessToken: string, refreshToken: string) => void;
    onSetUser: (user: any) => void;
    onRemoveToken: () => void;
};

const useAuthStore = create<AuthStoreState>()(
    persist(
        (set) => {
            return {
                isAuth: false,
                user: null,
                onSetToken: async (accessToken: string, refreshToken: string) => {
                    if (accessToken) {
                        Cookies.set('accessToken', accessToken);
                        const resProfile = await fetch(
                            'https://api.escuelajs.co/api/v1/auth/profile',
                            {
                                headers: {
                                    Authorization: `Bearer ${accessToken}`,
                                },
                            },
                        );
                        if (resProfile.ok) {
                            const data = await resProfile.json();
                            set((state) => {
                                return {
                                    user: data,
                                };
                            });
                        }
                    }

                    if (refreshToken) {
                        Cookies.set('refreshToken', refreshToken);
                    }
                },
                onSetUser: (user: any) => {
                    set((state) => {
                        return {
                            user,
                        };
                    });
                },
                onRemoveToken: () => {
                    Cookies.remove('accessToken');
                    Cookies.remove('refreshToken');
                    set((state) => {
                        return {
                            isAuth: false,
                            user: null,
                        };
                    });
                },
            };
        },
        {
            name: 'auth-store',
            version: 1,
        },
    ),
);

export default useAuthStore;
