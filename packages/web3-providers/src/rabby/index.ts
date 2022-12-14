import urlcat from 'urlcat'
import { omit } from 'lodash-unified'
import { ChainId, chainResolver, SchemaType } from '@masknet/web3-shared-evm'
import {
    isSameAddress,
    NonFungibleContractSpenderAuthorization,
    FungibleTokenSpenderAuthorization,
} from '@masknet/web3-shared-base'
import type { AuthorizationAPI } from '../types'
import { getAllMaskDappContractInfo, resolveNetworkOnRabby } from './helpers'
import { NON_FUNGIBLE_TOKEN_API_URL, FUNGIBLE_TOKEN_API_URL } from './constants'
import type { NFTInfo, RawTokenInfo, TokenSpender } from './types'

export class RabbyAPI implements AuthorizationAPI.Provider<ChainId> {
    async getApprovedNonFungibleContracts(chainId: ChainId, account: string) {
        const maskDappContractInfoList = getAllMaskDappContractInfo(chainId, 'nft')
        const networkType = chainResolver.chainNetworkType(chainId)

        if (!networkType || !account) return []
        const response = await fetch(
            urlcat(NON_FUNGIBLE_TOKEN_API_URL, { id: account, chain_id: resolveNetworkOnRabby(networkType) }),
        )
        const rawData: { contracts: NFTInfo[] } = await response.json()

        return rawData.contracts
            .filter((x) => x.amount !== '0' && x.is_erc721)
            .map((x) => {
                const maskDappContractInfo = maskDappContractInfoList.find((y) =>
                    isSameAddress(y.address, x.spender.id),
                )

                if (maskDappContractInfo) {
                    return {
                        ...x,
                        contract: {
                            address: x.contract_id,
                            name: x.contract_name,
                        },
                        address: x.spender.id,
                        name: maskDappContractInfo.name,
                        logo: maskDappContractInfo.logo,
                        isMaskDapp: true,
                    }
                }

                return {
                    ...x,
                    ...x.spender,
                    address: x.spender.id,
                    contract: {
                        address: x.contract_id,
                        name: x.contract_name,
                    },
                    isMaskDapp: false,
                }
            })
            .sort((a, b) => {
                if (a.isMaskDapp && !b.isMaskDapp) return -1
                if (!a.isMaskDapp && b.isMaskDapp) return 1
                return Number(b.amount) - Number(a.amount)
            }) as Array<NonFungibleContractSpenderAuthorization<ChainId, SchemaType>>
    }

    async getApprovedFungibleTokenSpenders(chainId: ChainId, account: string) {
        const maskDappContractInfoList = getAllMaskDappContractInfo(chainId, 'token')
        const networkType = chainResolver.chainNetworkType(chainId)

        if (!networkType || !account) return []

        const response = await fetch(
            urlcat(FUNGIBLE_TOKEN_API_URL, { id: account, chain_id: resolveNetworkOnRabby(networkType) }),
        )

        const rawData: RawTokenInfo[] = await response.json()

        return rawData
            .reduce<TokenSpender[]>((acc, cur) => {
                const tokenInfo = omit({ ...cur, address: cur.id, logoURL: cur.logo_url }, ['spenders'])
                return acc.concat(
                    cur.spenders.map((rawSpender) => {
                        const spender = omit(
                            {
                                ...rawSpender,
                                name: rawSpender.protocol?.name,
                                logo: rawSpender.protocol?.logo_url,
                                address: rawSpender.id,
                                amount: rawSpender.value,
                                tokenInfo,
                            },
                            ['protocol'],
                        )

                        const maskDappContractInfo = maskDappContractInfoList.find((x) =>
                            isSameAddress(x.address, spender.id),
                        )

                        if (maskDappContractInfo) {
                            return {
                                ...spender,
                                name: maskDappContractInfo.name,
                                logo: maskDappContractInfo.logo,
                                isMaskDapp: true,
                            }
                        }

                        return { ...spender, isMaskDapp: false }
                    }),
                )
            }, [])
            .sort((a, b) => {
                if (a.isMaskDapp && !b.isMaskDapp) return -1
                if (!a.isMaskDapp && b.isMaskDapp) return 1
                return b.exposure_usd - a.exposure_usd
            }) as Array<FungibleTokenSpenderAuthorization<ChainId, SchemaType>>
    }
}
