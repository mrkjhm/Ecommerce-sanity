import type { Rule } from 'sanity';

export default {
    name: 'user',
    title: 'User',
    type: 'document',
    fields: [
        {
            name: 'name',
            type: 'string',
            title: 'Name',
            validation: (Rule: Rule) => Rule.required(),
        },
        {
            name: 'email',
            type: 'string',
            title: 'Email',
            validation: (Rule: Rule) => Rule.required().email(),
        },
        {
            name: 'avatar',
            type: 'image',
            title: 'Avatar',
            options: {hotspot: true},
        },
        {
            name: 'createdAt',
            type: 'datetime',
            title: 'Registered At',
        },
        {
            name: 'isVerified',
            type: 'boolean',
            title: 'Email Verified',
            initialValue: false,
        },
        {
            name: 'role',
            type: 'string',
            title: 'User Role',
            options: {
                list: ['customer', 'admin'],
                layout: 'radio',
            },
            initialValue: 'customer',
        },
    ],
}
