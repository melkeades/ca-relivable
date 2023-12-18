export type metaDb = {
    names: string;
    description: string;
    profileImage: string;
};
export const mediaDb = {
    'Moment Name a': [
        {
            id: 1,
            type: 'video',
            360: true,
            src: 'v1.mp4',
            thumb: 'v1.jpg',
            favorite: true,
        },
        {
            id: 2,
            type: 'video',
            360: true,
            src: 'v2.mp4',
            thumb: 'v2.jpg',
            favorite: false,
        },
    ],
    'Moment Name b': [
        {
            id: 3,
            type: 'image',
            360: true,
            src: 'w1.webp',
            thumb: '',
            favorite: true,
        },
        {
            id: 4,
            type: 'image',
            360: true,
            src: 'w3.webp',
            thumb: '',
            favorite: false,
        },
    ],
};
export const metaDb = {
    names: 'Casey &Peter',
    description:
        'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.',
    profileImage: 'profile.webp',
};
