import { Content } from "../../components/Content/Content.component";
import { Sidebar } from "../../components/Sidebar/Sidebar.component";
import { Wrapper } from "./Home.styles";

export function Home(): JSX.Element {
  return <Wrapper>
    <Content />
    <Sidebar />
  </Wrapper>
}
