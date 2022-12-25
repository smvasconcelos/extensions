import { userApi } from "api/user/user";
import manhwaLogo from "assets/logo.png";
import { Button } from "components/Button/Button.component";
import $ from "jquery";
import { useEffect, useState } from "react";
import { ButtonContainer, EmailInput, Logo, Wrapper } from "./Popup.styles";

export function PopupPage(): JSX.Element {

  const [user, setUser] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  useEffect(() => {
    const getUser = async () => {
      const userEmail = await userApi.getUser();
      setUser(userEmail);
      setEmail(email);
    }
    getUser();
  }, []);

  const openHome = () => {
    if (email === '') return
    $.get(`https://manhwa-tracker.onrender.com/check_and_create_user/?&email=${email}`).then((res) => {
      userApi.logInLocal(email);
      setUser(email);
      setEmail(email);
      chrome.tabs.create({ url: chrome.runtime.getURL("./home/index.html") });
      window.close();
    }).catch((res) => {
      setUser('');
    })
  }

  return <Wrapper>
    <Logo {...user !== '' && { onClick: () => chrome.tabs.create({ url: chrome.runtime.getURL("./home/index.html") }) }} src={manhwaLogo} />
    <EmailInput
      disabled={user !== ''}
      value={email}
      placeholder={email}
      onChange={(event) => {
        setEmail(event.target.value);
      }} />
    {
      user === '' ? <ButtonContainer><Button text="Set Key" callback={openHome} /></ButtonContainer> : <ButtonContainer>
        <Button text="Reset Key" callback={() => {
          userApi.resetUser();
          window.close();
        }} />
        <Button text="Open Collection" callback={() => chrome.tabs.create({ url: chrome.runtime.getURL("./home/index.html") })} />
      </ButtonContainer>
    }
  </Wrapper>
}
