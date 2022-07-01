import type { TransactionContext } from '@masknet/web3-shared-base'
import type { ChainId } from '@masknet/web3-shared-evm'
import type { TransactionDescriptor } from '../types'

export class ERC721Descriptor implements TransactionDescriptor {
    async compute(context: TransactionContext<ChainId>) {
        if (!context.name) return

        switch (context.name) {
            case 'setApprovalForAll':
                return {
                    chainId: context.chainId,
                    title: context.parameters?.approved === false ? 'Revoke' : 'Unlock',
                    description: `${
                        context.parameters?.approved === false ? 'Revoke the approval for' : 'Unlock'
                    } the token.`,
                }

            default:
                return
        }
    }
}