import { manhwaApi, ManhwaDataType } from "@/api/manhwa/manhwa";
import { userApi } from "@/api/user/user";
import { useEffect, useState } from "react";
import { MutatingDots } from "react-loader-spinner";
import { Button } from "../Button/Button.component";
import { Card } from "../Card/Card.component";
import { HistoryItem } from "../HistoryItem/HistoryItem.component";
import { ButtonContainer, ContentContainer, SearchInput, Wrapper } from "./Content.styles";
import { IContentProps } from "./Content.types";

export function Content({ }: IContentProps): JSX.Element {
  const [tab, setTab] = useState<number>(0);
  const [manhwaData, setManhwaData] = useState<ManhwaDataType[]>([]);
  const [manhwaDataBackup, setManhwaDataBackup] = useState<ManhwaDataType[]>([]);
  const [manhwaHistory, setManhwaHistory] = useState<ManhwaDataType[]>([]);
  const [manhwaHistoryBackup, setManhwaHistoryBackup] = useState<ManhwaDataType[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const getManhwaData = async () => {
      let manhwaData = await manhwaApi.getManhwaHistorySaved();

      if (!manhwaData) return

      setManhwaData(manhwaData);

      setManhwaDataBackup(manhwaData);

      const historyData = await manhwaApi.getManhwaHistory();

      if (!historyData) return

      setManhwaHistory(historyData);

      setManhwaHistoryBackup(historyData);

      await userApi.setStats(historyData.length, historyData.length);
    }

    getManhwaData();
  }, []);

  const removeFromDOM = (item: object) => {
    var data = manhwaData.filter((val) => {
      return val !== item ? val : null;
    })

    setManhwaData(data);

    data = manhwaDataBackup.filter((val) => {
      return val !== item ? val : null;
    })

    setManhwaDataBackup(data);
  }

  const listCard = (): JSX.Element => {
    return (
      <>
        {
          manhwaData.length !== 0 ? manhwaData.map((item, idx) => {
            return (
              <Card
                key={`${item.title}-manhwa-${idx}`}
                onDelete={async () => {
                  await manhwaApi.removeManhwa(item, await userApi.getUser()).then(() => {
                    removeFromDOM(item);
                  })
                }}
                date={item.date}
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
    if (tab == 1) {
      if (value === '') {
        setManhwaHistory(manhwaHistoryBackup);
        return;
      }

      setManhwaHistory(manhwaHistoryBackup.filter(item => item.name.toUpperCase().indexOf(value.toUpperCase()) > -1));
    } else {
      if (value === '') {
        setManhwaData(manhwaDataBackup);
        return;
      }

      setManhwaData(manhwaDataBackup.filter(item => item.name.toUpperCase().indexOf(value.toUpperCase()) > -1));
    }
  }

  return (
    <Wrapper>
      <SearchInput value={search} onChange={(event) => {
        searchItem(event.target.value)
      }} />

      <ButtonContainer>
        <Button isActive={tab === 1} callback={() => setTab(1)}>Manhwa History</Button>

        <Button isActive={tab === 0} callback={() => setTab(0)}>Manhwa List</Button>
      </ButtonContainer>

      <ContentContainer isCard={tab === 0}>
        {
          tab === 0 ? listCard() : listHistory()
        }
      </ContentContainer>
    </Wrapper>
  )
}
