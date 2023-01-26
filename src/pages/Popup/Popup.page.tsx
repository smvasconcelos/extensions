import { userApi } from "api/user/user";
import manhwaLogo from "assets/logo.png";
import { Button } from "components/Button/Button.component";
import $ from "jquery";
import { useEffect, useState } from "react";
import { useHref } from "react-router-dom";
import { ButtonContainer, EmailInput, Logo, Wrapper } from "./Popup.styles";
const AMBIENT = import.meta.env.VITE_AMBIENT;

export function PopupPage(): JSX.Element {

  const [user, setUser] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const homeHref = useHref('home');

  useEffect(() => {
    const getUser = async () => {
      const userEmail = await userApi.getUser();
      setUser(userEmail);
      setEmail(email);
    }
    getUser();
  }, []);

  const openHome = () => {
    const AMBIENT = import.meta.env.VITE_AMBIENT;
    if (email === '') return
    $.get(`https://manhwa-tracker.onrender.com/check_and_create_user/?&email=${email}`).then((res) => {
      userApi.logInLocal(email);
      setUser(email);
      setEmail(email);
      if (AMBIENT == 'DEV') return
      window.open(homeHref, '_blank')
      window.close();
    }).catch((res) => {
      setUser('');
    })
  }

  return <Wrapper>
    <Logo {...user !== '' && { onClick: () => AMBIENT ? '' : chrome.tabs.create({ url: chrome.runtime.getURL("./home/index.html") }) }} src={manhwaLogo} />
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
          if (AMBIENT == 'DEV') return
          window.close();
        }} />
        <Button text="Open Collection" callback={() => window.open(homeHref, '_blank')} />
      </ButtonContainer>
    }
  </Wrapper>
}
