import { Wrapper } from "./HistoryItem.styles";
import { IHitoryItemProps } from "./HistoryItem.types";

export function HistoryItem({ link, title, id, chapter }: IHitoryItemProps): JSX.Element {
  return <Wrapper target={"_blank"} href={link}><span>{title}</span> <span>Chapter {chapter}</span></Wrapper>
}
