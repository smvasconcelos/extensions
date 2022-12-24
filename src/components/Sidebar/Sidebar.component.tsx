import manhwaLogo from "assets/logo.png";
import { Button } from "../Button/Button.component";
import { ButtonContainer, Logo, StatsContainer, StatsItem, StatsText, Wrapper } from "./Sidebar.styles";
import { ISidebarProps } from "./Sidebar.types";

export function Sidebar({ stats, email }: ISidebarProps): JSX.Element {
  return <Wrapper>
    <Logo src={manhwaLogo} />
    <ButtonContainer>
      <Button link="https://reaperscans.com" text="Reaper Scans" />
      <Button link="https://asurascans.com" text="Asura Scans" />
      <Button link="https://readm.org" text="Readm" />
    </ButtonContainer>
    <StatsContainer>
      <StatsItem>
        <StatsText>Manhwa List</StatsText>
        <StatsText>50</StatsText>
      </StatsItem>
      <StatsItem>
        <StatsText>History List</StatsText>
        <StatsText>50</StatsText>
      </StatsItem>
    </StatsContainer>

  </Wrapper>
}
