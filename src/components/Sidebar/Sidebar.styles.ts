import tw, { styled } from "twin.macro";

export const Wrapper = styled.div`
  width: 30%;
  min-height: 100vh;
  ${tw`bg-sidebar p-5`}
`
export const Logo = styled.img`
  width: 80%;
  min-width: 200px;
  max-width: 300px;
  height: auto;
  margin: 0 auto;
  margin-top: 10px;
`

export const StatsContainer = styled.div`
  width: 70%;
  margin: 0 auto;
  ${tw`p-4 bg-background rounded`}
`
export const StatsItemContainer = styled.div`
  width: 100%;
  ${tw``}
`

export const StatsItem = styled.div`
  ${tw`p-2 text-text flex flex-row justify-between`}
`

export const StatsText = styled.span``

export const ButtonContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  ${tw`justify-center flex flex-row gap-3 mb-10`}
`
