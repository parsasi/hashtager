function sleep(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

const refresh = async () => {
    document.querySelector('a[href="/explore"]').click();
    await sleep(500)
    document.querySelector('a[href="/home"]').click();
    await sleep(3000)
    const loadMoreButton = document.querySelector('section[aria-labelledby="accessible-list-13"] div[role="button"]');
    if(loadMoreButton) {
        loadMoreButton.click();
        await sleep(1000)
    }
}

const getAllTweets = () => {
    return document.querySelectorAll('article[data-testid="tweet"]');
}

export const sendTweet = async (hashtags) => {
    console.log(hashtags)
    await refresh();
    const allTweets = getAllTweets();
    for(let tweet of allTweets){
        for(let hashtag of hashtags){
            if(tweet.innerText && tweet.innerText.toLowerCase().includes(`#${hashtag} `.toLowerCase())){
                console.log(`${hashtag} found in ${tweet.innerText}`);
                const retweetButton = tweet.querySelector('div[role="button"][data-testid="retweet"]');
                if(retweetButton) {
                    retweetButton.click();
                    await sleep(1000 * 1);
                    document.querySelector('div[data-testid="retweetConfirm"]').click();
                    await sleep(1000 * 1);
                    break;
                }
            }
        }
    }        
}