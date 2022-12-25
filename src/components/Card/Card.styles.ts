import tw, { styled } from "twin.macro";

export const CardTitle = styled.p`
  ${tw`text-text text-center mb-5`}
`

export const CardImage = styled.img`
  width: 200px;
  height: 100%;
  ${tw`rounded`}
`

export const CardContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  justify-content: space-between;
  transition: all 200ms ease-in-out;
  ${tw`p-8 absolute left-0 bg-card opacity-0 z-10`}
`

export const CardButtonContainer = styled.div`
  width: 100%;
  ${tw`flex flex-col gap-2`}
`

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  box-sizing: border-box;
  width: fit-content;
  height: auto;
  transition: all 200ms ease-in-out;
  &:hover div{
    opacity: 1;
  }
  ${tw`bg-card rounded relative`}
`
