import { Link, Stack, Tooltip, Typography } from '@mui/material'
import type { TokenSecurity } from './Common'
import { useSharedI18N } from '../../../../locales'
import React from 'react'
import { makeStyles, usePortalShadowRoot } from '@masknet/theme'
import { explorerResolver, formatEthereumAddress } from '@masknet/web3-shared-evm'
import { formatCurrency, formatSupply } from '@masknet/web3-shared-base'
import { Icons } from '@masknet/icons'

const useStyles = makeStyles()((theme) => ({
    card: {
        padding: theme.spacing(1.5),
        borderRadius: 9,
        boxShadow:
            theme.palette.mode === 'light'
                ? '0px 0px 20px rgba(0, 0, 0, 0.05)'
                : '0px 0px 20px rgba(255, 255, 255, 0.12)',
    },
    subtitle: {
        color: theme.palette.maskColor.second,
        fontWeight: 400,
        fontSize: 16,
    },
    cardValue: {
        color: theme.palette.maskColor.main,
        fontSize: 16,
        fontWeight: 700,
    },
    tooltip: {
        fontSize: 12,
    },
    linkIcon: {
        height: 18,
        width: 18,
        color: theme.palette.maskColor.main,
    },
}))

const DEFAULT_PLACEHOLDER = '--'

function formatTotalSupply(total?: number) {
    if (!total) return DEFAULT_PLACEHOLDER
    return formatCurrency(total)
}

interface TokenPanelProps {
    tokenSecurity: TokenSecurity
    tokenMarketCap?: string
}

export const TokenPanel = React.forwardRef(({ tokenSecurity, tokenMarketCap }: TokenPanelProps, ref) => {
    const t = useSharedI18N()
    const { classes } = useStyles()

    const totalSupply = usePortalShadowRoot((container) => {
        const supply = tokenSecurity.total_supply ? formatSupply(tokenSecurity.total_supply) : DEFAULT_PLACEHOLDER
        return (
            <Tooltip
                PopperProps={{ container }}
                arrow
                title={
                    <Typography color={(theme) => theme.palette.info.contrastText} className={classes.tooltip}>
                        {supply}
                    </Typography>
                }>
                <Typography className={classes.cardValue}>{supply}</Typography>
            </Tooltip>
        )
    })

    return (
        <Stack className={classes.card} spacing={2}>
            <Stack height={128} justifyContent="space-between" flex={1}>
                <Stack direction="row" justifyContent="space-between">
                    <Typography className={classes.subtitle}>{t.token_info_token_name()}</Typography>
                    <Typography className={classes.cardValue}>
                        {tokenSecurity.token_symbol}
                        {tokenSecurity.token_name && `(${tokenSecurity.token_name})`}
                    </Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between">
                    <Typography className={classes.subtitle}>{t.token_info_token_contract_address()}</Typography>
                    <Stack display="inline-flex" direction="row" alignItems="center" spacing={0.625}>
                        <Typography className={classes.cardValue}>
                            {tokenSecurity.contract
                                ? formatEthereumAddress(tokenSecurity.contract, 4)
                                : DEFAULT_PLACEHOLDER}
                        </Typography>
                        <Link
                            lineHeight="14px"
                            href={explorerResolver.fungibleTokenLink(tokenSecurity.chainId, tokenSecurity.contract)}
                            target="_blank"
                            rel="noopener noreferrer">
                            <Icons.LinkOut className={classes.linkIcon} />
                        </Link>
                    </Stack>
                </Stack>
                <Stack direction="row" justifyContent="space-between">
                    <Typography className={classes.subtitle}>{t.token_info_contract_creator()}</Typography>
                    <Stack display="inline-flex" direction="row" alignItems="center" spacing={0.625}>
                        <Typography className={classes.cardValue}>
                            {tokenSecurity.creator_address
                                ? formatEthereumAddress(tokenSecurity.creator_address ?? '', 4)
                                : DEFAULT_PLACEHOLDER}
                        </Typography>
                        {tokenSecurity.creator_address && (
                            <Link
                                lineHeight="14px"
                                href={explorerResolver.addressLink(
                                    tokenSecurity.chainId,
                                    tokenSecurity.creator_address,
                                )}
                                target="_blank"
                                rel="noopener noreferrer">
                                <Icons.LinkOut className={classes.linkIcon} />
                            </Link>
                        )}
                    </Stack>
                </Stack>
                <Stack direction="row" justifyContent="space-between">
                    <Typography className={classes.subtitle}>{t.token_info_contract_owner()}</Typography>
                    <Stack display="inline-flex" direction="row" alignItems="center" spacing={0.625}>
                        <Typography className={classes.cardValue}>
                            {tokenSecurity.owner_address
                                ? formatEthereumAddress(tokenSecurity.owner_address ?? '', 4)
                                : DEFAULT_PLACEHOLDER}
                        </Typography>
                        {tokenSecurity.owner_address && (
                            <Link
                                lineHeight="14px"
                                href={explorerResolver.addressLink(tokenSecurity.chainId, tokenSecurity.owner_address)}
                                target="_blank"
                                rel="noopener noreferrer">
                                <Icons.LinkOut className={classes.linkIcon} />
                            </Link>
                        )}
                    </Stack>
                </Stack>
                <Stack direction="row" justifyContent="space-between">
                    <Typography className={classes.subtitle}>{t.token_info_total_supply()}</Typography>
                    <Typography className={classes.cardValue}> {totalSupply} </Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between">
                    <Typography className={classes.subtitle}>{t.token_info_market_cap()}</Typography>
                    <Typography className={classes.cardValue}>
                        {tokenMarketCap ? `$${formatSupply(tokenMarketCap)}` : DEFAULT_PLACEHOLDER}
                    </Typography>
                </Stack>
            </Stack>
        </Stack>
    )
})
