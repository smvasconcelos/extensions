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

export const ContentContainer = styled.div<{ isCard: boolean }>`
  grid-template-columns: repeat(auto-fit, minmax(210px, max-content));

  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    ${tw` bg-sidebar`}
    border-radius: 6px;
  }

  ::-webkit-scrollbar-thumb {
    ${tw` bg-highlight`}
    border-radius: 6px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #666;
  }

  ${({ isCard }) => !isCard && css`max-height: 60vh;`}

  ${({ isCard }) => isCard ? tw`[grid-gap: 16px] justify-center p-0 grid` : tw`flex flex-col gap-2 overflow-auto p-2`}
`

export const SearchInput = styled.input`
  ${tw`shadow appearance-none bg-searchbar rounded w-full py-2 px-3 text-highlight mb-3`}
  color: black;
  outline: none;
`
