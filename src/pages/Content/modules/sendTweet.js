function sleep(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

const findTab = (tabs , innerTextRequired) => {
    for(let tab of tabs){
        if(tab.innerText.toLowerCase().includes(innerTextRequired)){
            return tab;
        }
    }
    return null
}

const refresh = async () => {
    if(window.location.href.startsWith("https://twitter.com/home")){
        document.querySelector('a[href="/explore"]').click();
        await sleep(500)
        document.querySelector('a[href="/home"]').click();
        await sleep(3000)
        const loadMoreButton = document.querySelector('section[aria-labelledby] div[role="button"]');
        if(loadMoreButton && loadMoreButton.innerText) {
            if(loadMoreButton.innerText.toLowerCase().includes('show')) {
                loadMoreButton.click();
                await sleep(1000)
            }
        }
    }else if(window.location.href.startsWith('https://twitter.com/hashtag/')){
        const tabs = document.querySelectorAll('div[role="presentation"] a[role="tab"]');
        const topTab = findTab(tabs , 'top');
        if(topTab) {
            topTab.click();
            await sleep(1000)
        }
        const latest = findTab(tabs , 'latest');
        latest.click();
        await sleep(1000)
    }
}

const getAllTweets = () => {
    return document.querySelectorAll('article[data-testid="tweet"]');
}

export const sendTweet = async (hashtags) => {
    await refresh();
    const allTweets = getAllTweets();
    for(let tweet of allTweets){
        for(let hashtag of hashtags){
            if(tweet.innerText && tweet.innerText.toLowerCase().includes(`#${hashtag}`.toLowerCase())){
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