import { manhwaApi } from '@/api/manhwa/manhwa';
import logoAction from 'assets/icon128.png';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { ActionButton, Wrapper } from './ContentScript.styles';
import { getManhwaInfo } from './useContentScript';

export function ContentScript(): JSX.Element {

  const [isTracker, setIsTracker] = useState(false);
  const [user, setUser] = useState('');

  const tracker = [
    "readm",
    "asura",
    "reaperscans",
    "mangakakalot",
    "readmanganato",
    "mangasee123"
  ];

  const addManhwaToFirebase = async () => {
    // const user = "smvasconcelos11@gmail.com";
    if (user !== "") {
      const title = window.location.href;
      const email = user;
      const data = await getManhwaInfo();

      if (data)
        await manhwaApi.addManhwa(title, email, data);
    }
  }

  useEffect(() => {
    if (tracker.some((item) => window.location.hostname.includes(item))) {
      chrome.storage.onChanged.addListener(async function (changes, namespace) {
        for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
          if (key === "email") {
            await manhwaApi.addManhwaHistory(window.location.href, user);
            setUser(newValue);
            setIsTracker(true);
          }
        }
      });
    }
  }, [])


  return isTracker ? <Wrapper>
    <ActionButton onClick={addManhwaToFirebase} src={chrome.runtime.getURL(logoAction)} />
  </Wrapper> : <></>
}
const root = document.createElement('div')
root.id = 'crx-root'
document.body.append(root)

ReactDOM.render(
  <React.StrictMode>
    <ContentScript />
  </React.StrictMode>,
  root,
)
