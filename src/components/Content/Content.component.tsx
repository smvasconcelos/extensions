import { manhwaApi, ManhwaDataType } from "@/api/manhwa/manhwa";
import { useEffect, useState } from "react";
import { Button } from "../Button/Button.component";
import { Card } from "../Card/Card.component";
import { HistoryItem } from "../HistoryItem/HistoryItem.component";
import { Searchbar } from "../Searchbar/Searchbar.component";
import { ButtonContainer, CardsContainer, Wrapper } from "./Content.styles";
import { IContentProps } from "./Content.types";

export function Content({ }: IContentProps): JSX.Element {
  const [tab, setTab] = useState<Number>(0);
  const [manhwaData, setManhwaData] = useState<ManhwaDataType[]>([]);
  const [manhwaHistory, setManhwaHistory] = useState<ManhwaDataType[]>([]);

  useEffect(() => {

    const getManhwaData = async () => {
      const data = await manhwaApi.getManhwaHistorySaved();
      if (!data)
        return
      setManhwaData(data);
    }

    const getManhwaHistory = async () => {
      const data = await manhwaApi.getManhwaHistory();
      console.log(data);
      setManhwaData(data || []);
    }

    getManhwaData();
    getManhwaHistory();

  }, []);

  const listCard = (): JSX.Element => {
    return (
      <>
        {
          manhwaData.length !== 0 && manhwaData.map((item) => {
            return (
              <Card
                key={item.title}
                action={(id) => console.log(id)}
                id={item.id}
                lastChapter={item.chapter}
                chapterUrl={item.title}
                title={item.name}
                imgUrl={item.img} />
            )
          })
        }
      </>
    )
  }

  const listHistory = (): JSX.Element => {
    return (
      <>
        {
          manhwaHistory.length !== 0 && manhwaHistory.map((item) => {
            return (
              <HistoryItem
                chapter={item.chapter}
                title={item.name}
                link={item.title} />
            )
          })
        }
      </>
    )

  }

  return <Wrapper>
    <Searchbar />
    <ButtonContainer>
      <Button callback={() => setTab(1)} text="Manhwa History" />
      <Button callback={() => setTab(0)} text="Manhwa List" />
    </ButtonContainer>
    <CardsContainer card={tab === 0}>
      {
        tab === 0 ? listCard() : listHistory()
      }
    </CardsContainer>
  </Wrapper>
}
