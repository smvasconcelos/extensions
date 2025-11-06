import { useEffect, useRef, useState } from "react";
import { Button } from "../Button/Button.component";
import { CardButtonContainer, CardContainer, CardImage, CardTitle, Wrapper } from "./Card.styles";
import { ICardProps } from "./Card.types";
import default_1 from "assets/default_1.jpg";
import default_4 from "assets/default_4.jpg";

export function Card({ title, lastChapter, imgUrl, date, onDelete, chapterUrl }: ICardProps): JSX.Element {
  const defaultImages = [default_1, default_4];
  const imgRef = useRef<HTMLImageElement>(null);

  const [hasFallback, setHasFallback] = useState(false);

  useEffect(() => {
    const imgEl = imgRef.current;
    if (!imgEl) return;

    // Quando der erro ao carregar a imagem...
    imgEl.onerror = () => {
      // Se já caiu no fallback antes, não faz outra vez
      if (hasFallback) return;

      const randomImage = defaultImages[Math.floor(Math.random() * defaultImages.length)];
      imgEl.src = randomImage;
      setHasFallback(true); // Marca que já aplicou fallback
    };

  }, [hasFallback, defaultImages]);

  return (
    <Wrapper alwaysActive={hasFallback}>
      <CardImage ref={imgRef} src={imgUrl} />

      <CardContainer>
        <CardTitle>{title}</CardTitle>

        <CardButtonContainer>
          <Button link={chapterUrl} >{`Chapter ${lastChapter}`}</Button>
          <Button isActive callback={onDelete}>Delete</Button>
          <span>{date}</span>
        </CardButtonContainer>
      </CardContainer>
    </Wrapper>
  );
}

