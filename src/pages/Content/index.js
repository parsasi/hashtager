import {setHashtags } from './modules/setHashtags'
import { sendTweet } from './modules/sendTweet'
import { keepScreenAwake } from './modules/lock'
import {getHashtagsAndActive} from './modules/getHashtagsAndActive'

setHashtags();
keepScreenAwake();
console.log('this ran again')

setInterval(async () => {
    const {active , hashtags} = await getHashtagsAndActive();
    console.log('from inside interval',  active , hashtags)
    if (active) {
        await sendTweet(hashtags)
    }
} , 1000 * 20);