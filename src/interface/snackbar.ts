import { IconProp } from '@fortawesome/fontawesome-svg-core'

export type SnackbarMessageType = 'Info' | 'Success' | 'Warning' | 'Error'
export type Truncate = 'truncate-1-lines' | 'truncate-2-lines' | 'truncate-3-lines'

export type Snackbar = {
 id: string
 lifetime: number
 message: string | React.ReactNode
 type?: SnackbarMessageType
 truncate?: Truncate
 icon?: IconProp
 header?: string
}
