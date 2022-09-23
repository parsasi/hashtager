function isScreenLockSupported() {
    return ('wakeLock' in navigator);
   }

async function getScreenLock() {
    if(isScreenLockSupported()){
      let screenLock;
      try {
         screenLock = await navigator.wakeLock.request('screen');
      } catch(err) {
         console.log(err.name, err.message);
      }
      return screenLock;
    }
  }

  export function release() { 
    let screenLock = getScreenLock();
    if(typeof screenLock !== "undefined" && screenLock != null) {
      screenLock.release()
      .then(() => {
        console.log("Lock released 🎈");
        screenLock = null;
      });
    }
  }

  export const keepScreenAwake = () => {
    let screenLock = getScreenLock();
    document.addEventListener('visibilitychange', async () => {
        if (screenLock !== null && document.visibilityState === 'visible') {
          screenLock = await navigator.wakeLock.request('screen');
        }
      });
  }