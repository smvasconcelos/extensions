import { ReactNode } from "react"

export interface IButtonProps {
  children: ReactNode
  link?: string
  isActive?: boolean
  callback?: () => void
}
