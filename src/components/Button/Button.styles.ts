import tw, { styled } from "twin.macro";

export const Wrapper = styled.a<{ remove?: boolean }>`
  text-decoration: none;
  ${tw`cursor-pointer hover:bg-highlight hover:text-text_2 text-searchbar font-bold py-2 px-4 rounded`}
  ${({ remove }) => remove ? tw`bg-highlight text-text_2` : tw`bg-button`}
`
