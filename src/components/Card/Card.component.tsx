import { Button } from "../Button/Button.component";
import { CardButtonContainer, CardContainer, CardImage, CardTitle, Wrapper } from "./Card.styles";
import { ICardProps } from "./Card.types";

export function Card({ title, lastChapter, id, imgUrl, action, chapterUrl }: ICardProps): JSX.Element {
  return <Wrapper>
    <CardImage src={imgUrl} />
    <CardContainer>
      <CardTitle>
          {title}
      </CardTitle>
      <CardButtonContainer>
        <Button link={chapterUrl} text={`Chapter ${lastChapter}`} />
        <Button remove={true} callback={action} text={`Delete`} />
      </CardButtonContainer>
    </CardContainer>
  </Wrapper>
}
