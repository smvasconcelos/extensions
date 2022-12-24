export interface ICardProps {
  description?: string
  title: string
  lastChapter: number
  id: string
  imgUrl: string
  action: (id: string) => void
  chapterUrl: string
}
