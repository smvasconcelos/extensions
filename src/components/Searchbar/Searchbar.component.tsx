import { SearchInput, Wrapper } from "./Searchbar.styles";
import { ISearchbarProps } from "./Searchbar.types";

export function Searchbar({ }: ISearchbarProps): JSX.Element {
  return <Wrapper>
    <SearchInput />
  </Wrapper>
}
