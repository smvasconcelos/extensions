import tw, { styled } from "twin.macro";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  box-sizing: border-box;
  min-width: fit-content;
  width: 400px;
  height: auto;
  ${tw`bg-card shadow-highlight shadow rounded`}
`

export const CardTitle = styled.p`
  ${tw`text-text text-center mb-5`}
`

export const CardDescription = styled.p`
  ${tw`text-text text-justify mb-5`}
`

export const CardImage = styled.img`
  width: 200px;
  height: 100%;
`

export const CardContainer = styled.div`
  width: fit-content;
  position: relative;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  justify-content: space-between;
  ${tw`p-8`}
`

export const CardButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  ${tw`gap-5`}
`
