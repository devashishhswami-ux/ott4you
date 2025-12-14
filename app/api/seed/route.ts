export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Product from '@/models/Product';

// Seed script to populate initial products
export async function GET() {
    try {
        await connectDB();

        // Check if products already exist
        const existingProducts = await Product.countDocuments();
        if (existingProducts > 0) {
            return NextResponse.json({
                success: false,
                message: 'Products already exist. Delete all products first to re-seed.',
            });
        }

        const products = [
            {
                name: 'Prime Video Premium',
                platform: 'Prime Video',
                description: 'Watch thousands of movies, TV shows, and Prime Originals. Enjoy unlimited streaming with ad-free experience.',
                logo: 'https://m.media-amazon.com/images/G/01/digital/video/web/Logo-min.png',
                durations: [
                    { months: 1, price: 149 },
                    { months: 3, price: 399 },
                    { months: 6, price: 699 },
                ],
                features: [
                    'Unlimited movies & TV shows',
                    'Prime Originals',
                    'Ad-free streaming',
                    'Download & watch offline',
                    '4K Ultra HD available',
                ],
                active: true,
            },
            {
                name: 'Spotify Premium',
                platform: 'Spotify',
                description: 'Ad-free music streaming with over 100 million songs. Download and listen offline anytime, anywhere.',
                logo: 'https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_Green.png',
                durations: [
                    { months: 1, price: 59 },
                    { months: 3, price: 149 },
                    { months: 6, price: 279 },
                ],
                features: [
                    '100M+ songs ad-free',
                    'Download music',
                    'High quality audio',
                    'Listen offline',
                    'Skip unlimited songs',
                ],
                active: true,
            },
            {
                name: 'YouTube Premium',
                platform: 'YouTube Premium',
                description: 'YouTube without ads, background playback, and YouTube Music Premium included. Download videos to watch offline.',
                logo: 'https://www.gstatic.com/youtube/img/promos/growth/ytp_lp2_logo_premium_1x.png',
                durations: [
                    { months: 1, price: 79 },
                    { months: 3, price: 199 },
                    { months: 6, price: 349 },
                ],
                features: [
                    'Ad-free videos',
                    'Background playback',
                    'YouTube Music Premium',
                    'Download videos',
                    'Picture-in-picture mode',
                ],
                active: true,
            },
            {
                name: 'JioHotstar Premium',
                platform: 'JioHotstar',
                description: 'Watch live sports, movies, TV shows, and Hotstar Specials. Premium access to Disney+ content and more.',
                logo: 'https://secure-media.hotstarext.com/web-assets/prod/images/brand-logos/disney-hotstar-logo-dark.svg',
                durations: [
                    { months: 1, price: 149 },
                    { months: 3, price: 399 },
                    { months: 6, price: 699 },
                ],
                features: [
                    'Live sports streaming',
                    'Disney+ content',
                    'Hotstar Specials',
                    'Latest movies',
                    'Multiple device support',
                ],
                active: true,
            },
            {
                name: 'Jio Saavn Pro',
                platform: 'Jio Saavn',
                description: 'Unlimited music streaming with 80M+ songs in 15+ languages. Ad-free listening experience with high quality audio.',
                logo: 'https://www.jiosaavn.com/_i/3.0/artist-default-music.png',
                durations: [
                    { months: 1, price: 49 },
                    { months: 3, price: 129 },
                    { months: 6, price: 229 },
                ],
                features: [
                    '80M+ songs',
                    'Ad-free music',
                    'High quality audio',
                    'Unlimited downloads',
                    '15+ languages',
                ],
                active: true,
            },
            {
                name: 'SonyLIV Premium',
                platform: 'SonyLIV',
                description: 'Watch exclusive shows, live sports, movies, and international content. Stream WWE, UEFA, and more sports live.',
                logo: 'https://www.sonyliv.com/images/sony_liv_logo.png',
                durations: [
                    { months: 1, price: 149 },
                    { months: 3, price: 349 },
                    { months: 6, price: 599 },
                ],
                features: [
                    'Live sports streaming',
                    'Exclusive shows',
                    'Latest movies',
                    'WWE & UEFA coverage',
                    'International content',
                ],
                active: true,
            },
        ];

        await Product.insertMany(products);

        return NextResponse.json({
            success: true,
            message: `Successfully seeded ${products.length} products`,
        });
    } catch (error) {
        console.error('Error seeding products:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to seed products' },
            { status: 500 }
        );
    }
}
