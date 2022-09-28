import {setHashtags } from './modules/setHashtags'
import { sendTweet } from './modules/sendTweet'
import { keepScreenAwake } from './modules/lock'
import {getHashtagsAndActive} from './modules/getHashtagsAndActive'

setHashtags();
keepScreenAwake();


setInterval(async () => {
    const {active , hashtags} = await getHashtagsAndActive();
    if (active) {
        await sendTweet(hashtags)
    }
} , 1000 * 60 * 3);