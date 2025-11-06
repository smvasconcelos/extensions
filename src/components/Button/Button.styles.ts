import tw, { styled } from "twin.macro";

export const Wrapper = styled.a<{ isActive?: boolean }>`
  text-decoration: none;
  ${tw`cursor-pointer hover:bg-highlight hover:text-text_2 text-searchbar py-2 px-4 rounded`}
  ${({ isActive }) => isActive ? tw`bg-highlight text-text_2` : tw`bg-button`}
  font-weight: 500;
`
