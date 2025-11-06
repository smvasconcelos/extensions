import { useEffect } from "react";
import { Button } from "../Button/Button.component";
import { CardButtonContainer, CardContainer, CardImage, CardTitle, Wrapper } from "./Card.styles";
import { ICardProps } from "./Card.types";
import fallbackImage from "assets/default.gif";

export function Card({ title, lastChapter, id, imgUrl, action, chapterUrl }: ICardProps): JSX.Element {

  useEffect(() => {
    const images = document.querySelectorAll("img");

    for (var i = 0; i < images.length; i++) {
      images[i].onerror = function() {
        this.src = fallbackImage;
      };
    }
  }, []);
  
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
