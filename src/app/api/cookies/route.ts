import { cookies } from 'next/headers';

type CookiesGetParams = {
    key: string;
};

export const POST = async (req: Request) => {
    const data = await req.json();
    const { email, password } = data;
};

export const GET = async (req: Request, segmentData: { params: CookiesGetParams }) => {
    const params = segmentData.params;
    const key = params.key;

    const cookiesStore = await cookies();

    if (!key) {
        return new Response('Key is required', { status: 400 });
    }

    const cookieValue = cookiesStore.get(key)?.value;

    if (!cookieValue) {
        return new Response('Cookie not found', { status: 404 });
    }

    return new Response(JSON.stringify({ [key]: cookieValue }), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
        },
    });
};
