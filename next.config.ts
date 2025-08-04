import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    // image configurations
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'flowbite.s3.amazonaws.com',
                pathname: '/**',
            },
        ],
    },
};

export default nextConfig;
