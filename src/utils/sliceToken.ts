export const sliceToken = (token: string | undefined) : string =>
    (token || '').replace(/Bearer\s?/, '')
