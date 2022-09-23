import { defaultHashtags  } from '../../../data/defaults';

export const setHashtags = () => {
    chrome.storage.sync.get('hashtags' , ({hashtags}) => {
        if(!(hashtags && hashtags.length > 0)) {
            chrome.storage.sync.set({hashtags: defaultHashtags})
        }
    })
}