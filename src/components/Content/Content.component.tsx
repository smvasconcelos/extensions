import { manhwaApi, ManhwaDataType } from "@/api/manhwa/manhwa";
import { userApi } from "@/api/user/user";
import FuzzySearch from "fuzzy-search";
import { useEffect, useState } from "react";
import { MutatingDots } from "react-loader-spinner";
import { Button } from "../Button/Button.component";
import { Card } from "../Card/Card.component";
import { HistoryItem } from "../HistoryItem/HistoryItem.component";
import { ButtonContainer, CardsContainer, SearchInput, Wrapper } from "./Content.styles";
import { IContentProps } from "./Content.types";

export function Content({ }: IContentProps): JSX.Element {
  const [tab, setTab] = useState<number>(0);
  const [manhwaData, setManhwaData] = useState<ManhwaDataType[]>([]);
  const [manhwaDataBackup, setManhwaDataBackup] = useState<ManhwaDataType[]>([]);
  const [manhwaHistory, setManhwaHistory] = useState<ManhwaDataType[]>([]);
  const [manhwaHistoryBackup, setManhwaHistoryBackup] = useState<ManhwaDataType[]>([]);
  const [search, setSearch] = useState('');

  const manhwaSearch = new FuzzySearch(manhwaDataBackup || [], ['name', 'chapter'], {
    caseSensitive: false,
  });

  const manhwaHistorySearch = new FuzzySearch(manhwaHistoryBackup || [], ['title', 'date'], {
    caseSensitive: false,
  });

  useEffect(() => {

    const getData = async () => {
      const data = await manhwaApi.getManhwaHistorySaved();
      if (!data)
        return
      setManhwaData(data);
      setManhwaDataBackup(data);

      const hdata = await manhwaApi.getManhwaHistory();
      if (!data)
        return
      setManhwaHistory(data);
      setManhwaHistoryBackup(data);
      await userApi.setStats(data.length, hdata.length);
    }
    getData();
  }, []);

  const listCard = (): JSX.Element => {
    return (
      <>
        {
          manhwaData.length !== 0 ? manhwaData.map((item, idx) => {
            return (
              <Card
                key={`${item.title}-manhwa-${idx}`}
                action={async () => await manhwaApi.removeManhwa(item.title, await userApi.getUser())}
                id={item.id}
                lastChapter={item.chapter}
                chapterUrl={item.title}
                title={item.name}
                imgUrl={item.img} />
            )
          }) : <MutatingDots
            height="100"
            width="100"
            color="#B3CB39"
            secondaryColor='#6D771F'
            radius='12.5'
            ariaLabel="mutating-dots-loading"
            wrapperStyle={{ margin: '0 auto' }}
            wrapperClass=""
            visible={true}
          />
        }
      </>
    )
  }

  const listHistory = (): JSX.Element => {
    return (
      <>
        {
          manhwaHistory.length !== 0 ? manhwaHistory.map((item, idx) => {
            return (
              <HistoryItem
                key={`${item.title}-history-${idx}`}
                date={item.date}
                link={item.title} />
            )
          }) : <MutatingDots
            height="100"
            width="100"
            color="#B3CB39"
            secondaryColor='#6D771F'
            radius='12.5'
            ariaLabel="mutating-dots-loading"
            wrapperStyle={{ margin: '0 auto' }}
            wrapperClass=""
            visible={true}
          />
        }
      </>
    )

  }

  const searchItem = (value: string): void => {
    setSearch(value);
    if (tab == 1)
      setManhwaHistory(manhwaHistorySearch.search(value));
    else
      setManhwaData(manhwaSearch.search(value));
  }

  return <Wrapper>
    <SearchInput value={search} onChange={(event) => {
      searchItem(event.target.value)
    }} />
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
