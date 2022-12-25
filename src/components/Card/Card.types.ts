export interface ICardProps {
  title: string
  lastChapter: number
  id: string
  imgUrl: string
  action: (id: string) => void
  chapterUrl: string
}
