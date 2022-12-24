import tw, { styled } from "twin.macro";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  box-sizing: border-box;
  ${tw`m-2`}
`

export const SearchInput = styled.input`
  ${tw`shadow appearance-none bg-searchbar  rounded w-full py-2 px-3 text-highlight mb-3 leading-tight focus:shadow-highlight`}
`
