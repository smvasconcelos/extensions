import { Button } from "../Button/Button.component";
import { CardButtonContainer, CardContainer, CardDescription, CardImage, CardTitle, Wrapper } from "./Card.styles";
import { ICardProps } from "./Card.types";

export function Card({ title, description, lastChapter, id, imgUrl, action }: ICardProps): JSX.Element {
  return <Wrapper>
    <CardImage src={imgUrl} />
    <CardContainer>
      <>
        <CardTitle>
          {title}
        </CardTitle>
        <CardDescription>
          {description || 'lorem'}
        </CardDescription>
      </>
      <CardButtonContainer>
        <Button callback={() => action(id)} text={`Last chatper ${lastChapter}`} />
        <Button callback={() => alert(id)} text={`Last chatper ${lastChapter}`} />
      </CardButtonContainer>
    </CardContainer>
  </Wrapper>
}
