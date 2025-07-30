export default {
    name: 'product',
    title: 'ProductList',
    type: 'document',
    fields: [
        {
            name: 'image',
            title: 'Image',
            type: 'array',
            of: [{ type: 'image' }],
            options: { hotspot: true },
        },
        {
            name: 'title',
            title: 'Title',
            type: 'string',
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 90,
            },
        },
        {
            name: 'price',
            title: 'Price',
            type: 'number',
        },
        {
            name: 'discount',
            title: 'Discount (%)',
            type: 'number',
            description: 'Enter discount percentage (e.g. 20 for 20%)',
        },
        {
            name: 'details',
            title: 'Details',
            type: 'string',
        },
    ],
}
