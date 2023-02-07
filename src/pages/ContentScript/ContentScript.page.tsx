import logoAction from 'assets/icon128.png'
import React from 'react'
import ReactDOM from 'react-dom'
import { ActionButton, Wrapper } from './ContentScript.styles'

export function ContentScript(): JSX.Element {
  return <Wrapper>
    <ActionButton src={chrome.runtime.getURL(logoAction)} />
  </Wrapper>
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
