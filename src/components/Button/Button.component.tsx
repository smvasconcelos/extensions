import { Wrapper } from "./Button.styles";
import { IButtonProps } from "./Button.types";

export function Button({ children, callback, link, isActive }: IButtonProps): JSX.Element {
  return <Wrapper isActive={isActive} target={"_blank"} {...link ? { href: link } : { onClick: callback }}>
    {children}
  </Wrapper>
}
