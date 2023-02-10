import { Wrapper } from "./HistoryItem.styles";
import { IHitoryItemProps } from "./HistoryItem.types";

export function HistoryItem({ link, date }: IHitoryItemProps): JSX.Element {
  return <Wrapper target={"_blank"} href={link}><span>{link}</span> <span>{date}</span></Wrapper>
}
