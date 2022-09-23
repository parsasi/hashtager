export const getHashtagsAndActive = async () => {
    return new Promise((resolve) => {
        chrome.storage.sync.get(['active' , 'hashtags'], async ({active , hashtags}) => {
            resolve({active , hashtags})
        })
    })
}