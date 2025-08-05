// 'use client';

import { fetcherPlatzi } from '@/libs/https/platzi-htpp';

const ProfilePage = async () => {
    const getProfile = async () => {
        const response = await fetcherPlatzi.get('/auth/profile');
        if (response.data) {
            console.log('Profile Data:', response.data);
        }
    };

    // useEffect(() => {
    //     getProfile();
    // }, []);
    await getProfile();
    return <div>ProfilePage</div>;
};

export default ProfilePage;
