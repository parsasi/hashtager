import React , {useState} from 'react';
import { useMemo } from 'react';
import { useEffect } from 'react';
import logo from '../../assets/img/logo.png';
import './Popup.css';

const cleanUpHashtag = (newHashtag) => {
  newHashtag = newHashtag.replace(' ', '_');
  // newHashtag = newHashtag.replace('ـ', '_');
  return newHashtag
}

const copy = async (text) => {
  if(window?.navigator?.clipboard){
    await navigator.clipboard.writeText(text)
  }else{
    document.execCommand(text)
  }
}

const hashtagRegex = new RegExp('^(\w*[0-9a-zA-Z_آابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهیئـ]+\w*[0-9a-zA-Z_ـآابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهیئ])$' , 'g')
const maxNumberOfHashtags = 5;

const Popup = () => {
  const [hashtags ,  setHashtags] = useState([]);
  const [newHashtag , setNewHashtag] = useState('');
  const [isOn , setIsOn] = useState(null);
  
  const copyHashtags = async () => {
    const allHashtags = hashtags.reduce((allHashtags , current) => {
      const currentHashtag = `#${current}\n `;
      return allHashtags + currentHashtag;
    } , '')
    await copy(allHashtags)
  }

  const addHashtag = () => {
    if(newHashtag && hashtagRegex.test(newHashtag) && hashtags.length < maxNumberOfHashtags){
      setHashtags(prevHashtags => {
        if(prevHashtags.includes(newHashtag)){
          return prevHashtags
        }
        return [...prevHashtags, newHashtag]
      })
      setNewHashtag('')
    }
  }

  const removeHashtag = (hashtag) => {
    if(hashtags.length > 1){
      setHashtags(prevHashtags => {
        return prevHashtags.filter(prevHashtag => prevHashtag !== hashtag)
      })
    }
  }

  useEffect(() => {
    if(hashtags.length > 0){
      chrome.storage.sync.set({hashtags})
    }
  } , [hashtags])

  useEffect(() => {
    if(isOn !== null){
      chrome.storage.sync.set({active : isOn})
    }
  } , [isOn])
  

  useEffect(() => {
    if(hashtags.length === 0){
      chrome.storage.sync.get('hashtags', function({hashtags}) {
        if(hashtags){
          setHashtags(hashtags);
        }
      });
    }

    if(isOn === null){
      chrome.storage.sync.get('active', function({active}) {
        if(active){
          setIsOn(active);
        }
      });
    }
  } , []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button style={{border : 'none', backgroundColor: '#F2CD5D' , color : '#3a1772', margin : '20px auto' , cursor : 'pointer'}}
          onClick={copyHashtags}
        >
          هشتگ ها را کلیک کپی کنید
        </button>
        <button style={{border : 'none', backgroundColor: isOn ? '#F2CD5D' : '#3a1772' , color : isOn ? '#3a1772' : '#fff', margin : '20px auto' , cursor : 'pointer'}}
          onClick={() => setIsOn(prevIsOn => !prevIsOn)}
        >
          {isOn ?  'غیر فعال کنید' : 'فعال کنید'}
        </button>
        <p style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
          flexWrap: 'wrap-reverse',
          lineHeight : 1
        }}>
          {
            hashtags.map((hashtag, index) =>
            (<button
              onClick={() => removeHashtag(hashtag)}
              style={{
              border: 'none',
              padding:'0',
              margin: '10px 5px',
              background:'none',
              height : '20px',
              cursor : 'pointer'
            }}><p key={`showing_${hashtag}`}>#{hashtag}&nbsp;</p></button>))
          }
        </p>
        <form onSubmit={(e) => {e.preventDefault();addHashtag();}}>
          <input style={{
            width: '100px',
            outline: 'none',
            borderRadius : '5px',
            padding: "5px",
            border: 'none',
            color: '#fff',
            backgroundColor: '#3a1772',
            fontSize: '12px',
            direction : 'rtl'
          }} type="text" id="hashtag" placeholder="هشتگ شما" value={newHashtag} onChange={e => setNewHashtag(cleanUpHashtag(e.target.value))} />
          </form>
      </header>
    </div>
  );
};

export default Popup;
