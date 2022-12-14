// DO NOT import React in this file. This file is also used by worker.
import type { Plugin } from '../types'
import { memoize } from 'lodash-unified'
import type { Web3Helper } from '../web3-helpers'

const __registered = new Map<string, Plugin.DeferredDefinition>()

export const registeredPlugins: Iterable<Plugin.DeferredDefinition> = { [Symbol.iterator]: () => __registered.values() }
export const registeredPluginIDs: Iterable<string> = { [Symbol.iterator]: () => __registered.keys() }

export function getPluginDefine(id: string) {
    return __registered.get(id)
}

export function registerPlugin<
    ChainId = unknown,
    SchemaType = unknown,
    ProviderType = unknown,
    NetworkType = unknown,
    Signature = unknown,
    GasOption = unknown,
    Block = unknown,
    Transaction = unknown,
    TransactionReceipt = unknown,
    TransactionDetailed = unknown,
    TransactionSignature = unknown,
    TransactionParameter = unknown,
    Web3 = unknown,
>(
    def: Plugin.DeferredDefinition<
        ChainId,
        SchemaType,
        ProviderType,
        NetworkType,
        Signature,
        GasOption,
        Block,
        Transaction,
        TransactionReceipt,
        TransactionDetailed,
        TransactionSignature,
        TransactionParameter,
        Web3
    >,
) {
    if (__registered.has(def.ID)) return
    if (!__meetRegisterRequirement(def)) return
    // @ts-ignore
    __registered.set(def.ID, def)
    getRegisteredWeb3Networks_memo.cache.clear?.()
    getRegisteredWeb3Providers_memo.cache.clear?.()
}

function getRegisteredPluginsSort_EVM_Ahead() {
    return [...__registered.values()].sort(sort_EVM_ahead)
}

function sort_EVM_ahead(a: Plugin.DeferredDefinition, b: Plugin.DeferredDefinition) {
    if (a.ID.includes('evm')) return -1
    if (b.ID.includes('evm')) return 1
    return 0
}
const getRegisteredWeb3Networks_memo = memoize(() => {
    return getRegisteredPluginsSort_EVM_Ahead().flatMap((x) => x.declareWeb3Networks || [])
})
const getRegisteredWeb3Providers_memo = memoize(() => {
    return getRegisteredPluginsSort_EVM_Ahead().flatMap((x) => x.declareWeb3Providers || [])
})

export function getRegisteredWeb3Networks() {
    return getRegisteredWeb3Networks_memo() as Web3Helper.NetworkDescriptorAll[]
}

export function getRegisteredWeb3Providers() {
    return getRegisteredWeb3Providers_memo() as Web3Helper.ProviderDescriptorAll[]
}

function __meetRegisterRequirement(def: Plugin.Shared.Definition) {
    // arch check
    if (process.env.architecture === 'app' && !def.enableRequirement.architecture.app) return false
    if (process.env.architecture === 'web' && !def.enableRequirement.architecture.web) return false

    // build variant check
    if (process.env.NODE_ENV === 'production') {
        try {
            if (process.env.channel === 'stable' && def.enableRequirement.target !== 'stable') {
                return false
            } else if (process.env.channel === 'beta' && def.enableRequirement.target === 'insider') {
                return false
            }
        } catch {
            // process.env.channel might not be possible in each build environment.
            if (def.enableRequirement.target !== 'stable') return false
        }
    }
    return true
}
