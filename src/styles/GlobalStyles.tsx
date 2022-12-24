import { createGlobalStyle } from 'styled-components'
import tw, { GlobalStyles as BaseStyles } from 'twin.macro'

const Global = createGlobalStyle({
  body: {
    ...tw`antialiased`,
    BaseStyles,
  },
})


export default Global
