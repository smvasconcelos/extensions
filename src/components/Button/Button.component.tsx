import { Wrapper } from "./Button.styles";
import { IButtonProps } from "./Button.types";

export function Button({ text, callback, link, remove }: IButtonProps): JSX.Element {
  return <Wrapper remove={remove} target={"_blank"} {...link ? { href: link } : { onClick: callback }}>
    {text}
  </Wrapper>
}
