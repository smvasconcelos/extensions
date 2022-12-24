import { Wrapper } from "./Button.styles";
import { IButtonProps } from "./Button.types";

export function Button({ text, callback, link }: IButtonProps): JSX.Element {
  return <Wrapper target={"_blank"} {...link ? { href: link } : { onClick: callback }}>
    {text}
  </Wrapper>
}
