import sanityClient from "@sanity/client";
import ImageUrlBuilder  from "@sanity/image-url";

export const client = sanityClient({
    projectId:"77pcd8x8",
    dataset:"production",
    apiVersion:'2023-04-28',
    useCdn:true,
    token:
    "skGwXPKJjRfIQdq76Csrk74vklYCFPklwXZhbWAc0EvxZkOVmXjBxiSYq1zYrbvXBKcyVQE1aKrDpxMpHloji1cQWB4WPxnztTvD0GPJnr1jTZtl9n8xolaw1fcHP5D2xcQ1baXSkZkqguDSlM91ozZNDqOhMS6TKJJgSXEg56dExtwYqeDh"
})

const builder = ImageUrlBuilder(client);

export const urlFor = (source) => builder.image(source)