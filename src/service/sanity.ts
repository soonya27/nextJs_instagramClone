import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

export const client = createClient({
    projectId: process.env.SANITY_PROJECT_ID,
    dataset: process.env.SANITY_DAYASET,
    useCdn: false,
    apiVersion: '2024-02-24',
    token: process.env.SANITY_SECRET_TOKEN
})



// export async function getUsers() {
//     const users = await client.fetch('*[_type == "user"]');
//     console.log(users)
//     return users
// }



const builder = imageUrlBuilder(client);
export function urlFor(source: SanityImageSource) {
    return builder.image(source).width(800).url();
}
