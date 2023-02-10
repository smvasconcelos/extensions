import tw, { styled } from "twin.macro";

export const Wrapper = styled.div`
  ${tw`w-80 h-80 bg-background p-10`}
`

export const Logo = styled.img`
  width: 200px;
  height: auto;
  margin: 0 auto;
`

export const EmailInput = styled.input`
  ${tw`shadow appearance-none bg-searchbar  rounded w-full py-2 px-3 text-text_2 mb-6 leading-tight focus:shadow-highlight`}
`

export const ButtonContainer = styled.div`
  ${tw`flex flex-col gap-4`}
`
