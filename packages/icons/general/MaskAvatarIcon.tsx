import { createPaletteAwareIcon } from '../utils'
import type { SvgIcon } from '@mui/material'

export const MaskAvatarIcon: typeof SvgIcon = createPaletteAwareIcon(
    'MaskAvatarIcon',
    <svg width="30" height="31" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect y=".675" width="30" height="30" rx="15" fill="url(#a)" />
        <rect y=".675" width="30" height="30" rx="15" fill="url(#b)" />
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M23.693 12.272v4.861H8.581c.66 2.95 3.278 5.153 6.408 5.153a6.565 6.565 0 0 0 5.896-3.694h2.808v4.083c0 .966-.778 1.75-1.738 1.75H8.045c-.96 0-1.738-.784-1.738-1.75V12.272h17.386Zm-4.476 6.32a5.105 5.105 0 0 1-4.228 2.247 5.105 5.105 0 0 1-4.229-2.247h8.458Zm-7.936-5.153a2.711 2.711 0 0 0-2.677 2.333h1.482a1.257 1.257 0 0 1 1.195-.875c.559 0 1.032.367 1.195.875h1.482a2.71 2.71 0 0 0-2.677-2.333Zm7.438 0a2.711 2.711 0 0 0-2.678 2.333h1.483a1.257 1.257 0 0 1 1.195-.875c.558 0 1.032.367 1.195.875h1.482a2.71 2.71 0 0 0-2.677-2.333Zm3.236-6.514c.96 0 1.738.784 1.738 1.75v2.139H6.307V8.675c0-.966.778-1.75 1.738-1.75h13.91Z"
            fill="#fff"
        />
        <defs>
            <linearGradient id="maskAvatar1" x1="0" y1="15.675" x2="30" y2="15.675" gradientUnits="userSpaceOnUse">
                <stop offset=".01" stopColor="#6298EA" stopOpacity=".2" />
                <stop offset=".01" stopColor="#6298EA" stopOpacity=".2" />
                <stop offset="1" stopColor="#627EEA" stopOpacity=".2" />
            </linearGradient>
            <linearGradient id="maskAvatar2" x1="15" y1=".675" x2="15" y2="30.675" gradientUnits="userSpaceOnUse">
                <stop stopColor="#fff" stopOpacity="0" />
                <stop offset="1" stopColor="#fff" stopOpacity=".9" />
            </linearGradient>
        </defs>
    </svg>,
    <svg width="30" height="30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="30" height="30" rx="15" fill="#6F6F6F" />
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M23.693 11.597v4.861H8.581c.66 2.95 3.278 5.153 6.408 5.153a6.565 6.565 0 0 0 5.896-3.694h2.808V22c0 .966-.778 1.75-1.738 1.75H8.045c-.96 0-1.738-.784-1.738-1.75V11.597h17.386Zm-4.476 6.32a5.105 5.105 0 0 1-4.228 2.247 5.105 5.105 0 0 1-4.229-2.247h8.458Zm-7.936-5.153a2.71 2.71 0 0 0-2.677 2.333h1.482a1.257 1.257 0 0 1 1.195-.875c.559 0 1.032.367 1.195.875h1.482a2.71 2.71 0 0 0-2.677-2.333Zm7.438 0a2.711 2.711 0 0 0-2.678 2.333h1.483a1.257 1.257 0 0 1 1.195-.875c.558 0 1.032.367 1.195.875h1.482a2.71 2.71 0 0 0-2.677-2.333Zm3.236-6.514c.96 0 1.738.784 1.738 1.75v2.139H6.307V8c0-.966.778-1.75 1.738-1.75h13.91Z"
            fill="#101010"
        />
    </svg>,
    undefined,
    '0 0 31 31',
)
