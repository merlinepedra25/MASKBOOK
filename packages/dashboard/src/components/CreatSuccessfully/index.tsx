import { memo } from 'react'
import { Button, styled, Typography } from '@mui/material'
import { Icon } from '@masknet/icons'
import { MaskColorVar } from '@masknet/theme'
import { useDashboardI18N } from '../../locales'
export interface CreateSuccessfully {
    onUnlock(): void
}

export const CreateSuccessfully = memo((props: CreateSuccessfully) => {
    const { onUnlock } = props

    const t = useDashboardI18N()
    return (
        <Container>
            <Icon type="success" size={64} />
            <SuccessTitle>{t.wallets_create_successfully_title()}</SuccessTitle>
            <SuccessTips>{t.wallets_create_successfully_tips()}</SuccessTips>
            <UnlockButton onClick={onUnlock}>{t.wallets_create_successfully_unlock()}</UnlockButton>
        </Container>
    )
})

const Container = styled('div')`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const SuccessTitle = styled(Typography)(({ theme }) => ({
    fontSize: theme.typography.h5.fontSize,
    color: theme.palette.success.main,
    fontWeight: theme.typography.fontWeightMedium as any,
    margin: theme.spacing(2, 0),
}))

const SuccessTips = styled(Typography)(({ theme }) => ({
    fontSize: theme.typography.fontSize,
    color: MaskColorVar.normalText,
}))

const UnlockButton = styled(Button)(
    ({ theme }) => `
    width: 124px;
    height: 32px;
    border-radius: 6px;
    margin-top: ${theme.spacing(7)}
`,
)
