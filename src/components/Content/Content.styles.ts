import tw, { css, styled } from "twin.macro";

export const Wrapper = styled.div`
  width: 70%;
  min-height: 100vh;
  max-height: fit-content;
  ${tw` max-h-full bg-background p-28`}
`

export const ButtonContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  ${tw`justify-center flex flex-row gap-3 mb-10`}
`

export const CardsContainer = styled.div<{ card: boolean }>`
  grid-template-columns: repeat(auto-fit, minmax(210px, max-content));
  ${({ card }) => !card && css`max-height: 60vh;`}
  ${({ card }) => card ? tw`[grid-gap: 16px] justify-center p-0 grid` : tw`flex flex-col gap-2 overflow-auto p-2`}
`

export const SearchInput = styled.input`
  color: #000;
  ${tw`shadow appearance-none bg-searchbar  rounded w-full py-2 px-3 mb-3 leading-tight focus:shadow-highlight`}
`
