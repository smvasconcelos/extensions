import { useState } from "react";
import { Button } from "../Button/Button.component";
import { Card } from "../Card/Card.component";
import { Searchbar } from "../Searchbar/Searchbar.component";
import { ButtonContainer, Wrapper } from "./Content.styles";
import { IContentProps } from "./Content.types";

export function Content({ }: IContentProps): JSX.Element {
  const [tab, setTab] = useState<Number>(0);

  const listCard = (): JSX.Element => {
    return (
      <Card
        action={(id) => console.log(id)}
        id="50"
        lastChapter={50}
        chapterUrl="https://readm.org/uploads/chapter_files/cover/tbn/1587154566_198x0.jpg"
        title="Qualquer coisa"
        description="aksdopkasdp akpskdp kapsokd pokaspokdpo aks"
        imgUrl="https://readm.org/uploads/chapter_files/cover/tbn/1587154566_198x0.jpg" />
    )
  }

  const listHistory = (): JSX.Element => {
    return <Card
      action={(id) => alert(id)}
      id="50"
      lastChapter={2}
      chapterUrl="https://readm.org/uploads/chapter_files/cover/tbn/1587154566_198x0.jpg"
      title="Qualquer coisa"
      description="aksdopkasdp akpskdp kapsokd pokaspokdpo aks"
      imgUrl="https://readm.org/uploads/chapter_files/cover/tbn/1587154566_198x0.jpg" />

  }

  return <Wrapper>
    <Searchbar />
    <ButtonContainer>
      <Button callback={() => setTab(1)} text="Manhwa History" />
      <Button callback={() => setTab(0)} text="Manhwa List" />
    </ButtonContainer>
    {
      tab === 0 ? listCard() : listHistory()
    }
  </Wrapper>
}
