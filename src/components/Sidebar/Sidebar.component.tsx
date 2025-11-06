import { userApi } from "@/api/user/user";
import manhwaLogo from "assets/logo.png";
import { useEffect, useState } from "react";
import { Button } from "../Button/Button.component";
import { ButtonContainer, Logo, StatsContainer, StatsItem, StatsText, Wrapper } from "./Sidebar.styles";
import { ISidebarProps } from "./Sidebar.types";

export function Sidebar({ }: ISidebarProps): JSX.Element {
  const [stats, setStats] = useState<{ manhwaCount: number, historyCount: number }>({ manhwaCount: 0, historyCount: 0 })

  useEffect(() => {
    const getStats = async () => {
      const stats = await userApi.getStats();
      if (!stats)
        return;
      setStats(stats);
    }
    getStats();
  }, [])

  return <Wrapper>
    <Logo src={manhwaLogo} />
    <ButtonContainer>
      {/* <Button link="https://reaperscans.com" text="Reaper Scans" /> */}
      <Button link="https://asuracomic.net" text="Asura Scans" />
      <Button link="https://nightsup.net/" text="Night Scans" />
      {/* <Button link="https://readm.org" text="Readm" /> */}
      <Button link="https://manhwaclan.com" text="Manhwa Clan" />
      <Button link="https://mangagalaxy.me/" text="Manga Galaxy" />
      {/* <Button link="https://mangasee123.com/" text="Manga See" /> */}
      <Button text="Open All" callback={() => {
        [ 'https://asuracomic.net', 'https://manhwaclan.com', 'https://mangagalaxy.me/', 'https://nightsup.net/'].map((item) => {
          window.open(item);
        })
      }}  />
    </ButtonContainer>
    <StatsContainer>
      <StatsItem>
        <StatsText>Manhwa List</StatsText>
        <StatsText>{stats.manhwaCount}</StatsText>
      </StatsItem>
      <StatsItem>
        <StatsText>History List</StatsText>
        <StatsText>{stats.historyCount}</StatsText>
      </StatsItem>
    </StatsContainer>
  </Wrapper>
}
