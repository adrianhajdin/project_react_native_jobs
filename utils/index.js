export const checkImageURL = (url) => {
    if (!url) return false
    else {
        const pattern = new RegExp('^http:\\/\\/books.google.com\\/books\\/content\\?id=\\w+&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api$', 'i');
        return pattern.test(url);
    }
};
