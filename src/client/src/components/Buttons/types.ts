import { MouseEventHandler } from 'react'

export interface ButtonProps {
    text: string
    link?: string
    clickHandler?: MouseEventHandler
    disabled?: boolean
}