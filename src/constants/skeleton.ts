export const SkeletonTypes = {
    LOGIN: 'login',
    SIGNUP: 'signup',
    BLOG: 'blog',
} as const;

export type SkeletonType = (typeof SkeletonTypes)[keyof typeof SkeletonTypes];
