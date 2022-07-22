import type { BN, IdlTypes, Program } from '@project-serum/anchor'
import type {
  Idl,
  IdlAccountItem,
  IdlEvent,
  IdlType,
  IdlTypeArray,
  IdlTypeCOption,
  IdlTypeDefined,
  IdlTypeOption,
  IdlTypeVec,
} from '@project-serum/anchor/dist/cjs/idl'
import type { SimulateResponse } from '@project-serum/anchor/dist/cjs/program/namespace/simulate'
import type {
  AccountMeta,
  ConfirmOptions,
  Keypair,
  PublicKey,
  Transaction,
  TransactionInstruction,
  TransactionSignature,
} from '@solana/web3.js'

import { FixedArray } from './fixedArray'

/*
eslint-disable no-unused-vars
*/

/**
 * This is a helper file to support better types on Anchor.
 *
 * This file gives us full typing on the contract RPC & the new methods API
 * that was released in 0.21.0
 * (https://github.com/project-serum/anchor/blob/master/CHANGELOG.md#0210---2022-02-07)
 *
 * The goal is to move these changes upstream into Anchor so everyone can enjoy
 * them, but until that happens, we type cast our program as a `TypedProgram`
 *
 * See `./getProgram.ts` for usage
 */

type ExtractNamedFields<T extends { name: string }> = {
  [P in T['name']]: Extract<T, { name: P }>
}

// from https://github.com/project-serum/anchor/blob/master/ts/src/program/namespace/types.ts#L97
type TypeMap = {
  bool: boolean
  // todo: buffer is not in the anchor repo - need to add
  byte: Buffer
  publicKey: PublicKey
  string: string
} & {
  [K in 'u8' | 'i8' | 'u16' | 'i16' | 'u32' | 'i32' | 'f32' | 'f64']: number
} & {
  [K in 'u64' | 'i64' | 'u128' | 'i128']: BN
}

type IDLBaseTypeToTS<T extends IdlType> = T extends 'bool'
  ? TypeMap['bool']
  : T extends 'u8'
  ? TypeMap['u8']
  : T extends 'i8'
  ? TypeMap['i8']
  : T extends 'u16'
  ? TypeMap['u16']
  : T extends 'i16'
  ? TypeMap['i16']
  : T extends 'u32'
  ? TypeMap['u32']
  : T extends 'i32'
  ? TypeMap['i32']
  : T extends 'f32'
  ? TypeMap['f32']
  : T extends 'u64'
  ? TypeMap['u64']
  : T extends 'i64'
  ? TypeMap['i64']
  : T extends 'f64'
  ? TypeMap['f64']
  : T extends 'u128'
  ? TypeMap['u128']
  : T extends 'i128'
  ? TypeMap['i128']
  : T extends 'string'
  ? TypeMap['string']
  : T extends 'bytes'
  ? Buffer
  : T extends 'publicKey'
  ? TypeMap['publicKey']
  : T extends IdlTypeDefined
  ? string
  : T extends IdlTypeOption
  ? // todo add optional arg
    IDLBaseTypeToTS<T['option']>
  : T extends IdlTypeCOption
  ? // todo add coption arg
    IDLBaseTypeToTS<T['coption']>
  : T extends IdlTypeVec
  ? IDLBaseTypeToTS<T['vec']>[]
  : T extends IdlTypeArray
  ? FixedArray<IDLBaseTypeToTS<T['array'][0]>, T['array'][1]>
  : never

type NullableEvents<IDL extends Idl> = IDL['events'] extends undefined
  ? IdlEvent
  : NonNullable<IDL['events']>[number]

type AccountParamsToCorrectType<T extends { [x: string]: IdlAccountItem }> = {
  [P in keyof T]: PublicKey
}

// typescript is being picky about our FlattenTuple type being an object
// so we need to specify that it's an array (should always pass)
type ToArray<T> = T extends any[] ? T : unknown[]

// flatten the tuple type to an array of resolved IDL types
type FlattenTuple<T extends any[] = []> = ToArray<{
  [K in keyof T]: T[K] extends { type: IdlType }
    ? IDLBaseTypeToTS<T[K]['type']>
    : unknown
}>

type Instructions<IDL extends Idl> = IDL['instructions'][number]
type BrokenOut<IDL extends Idl> = ExtractNamedFields<Instructions<IDL>>

type ArgParams<IDL extends Idl, T extends keyof BrokenOut<IDL>> = FlattenTuple<
  BrokenOut<IDL>[T]['args']
>

type Accounts<
  IDL extends Idl,
  T extends keyof BrokenOut<IDL>,
> = BrokenOut<IDL>[T]['accounts'][number]

type AccountParams<
  IDL extends Idl,
  T extends keyof BrokenOut<IDL>,
  isBuilder = false,
> = Omit<
  AccountParamsToCorrectType<ExtractNamedFields<Accounts<IDL, T>>>,
  // no longer needed for builder API
  // (https://twitter.com/anchorlang/status/1491906358026907648)
  isBuilder extends true ? 'tokenProgram' | 'rent' | 'systemProgram' : ''
>

type TypedInstruction<IDL extends Idl, Return> = {
  [T in keyof BrokenOut<IDL>]: (
    ...args: [
      ...ArgParams<IDL, T>,
      { accounts: AccountParams<IDL, T>; signers?: Keypair[] },
    ]
  ) => Return
}

type ReturnTypedMethods<
  IDL extends Idl,
  T extends keyof BrokenOut<IDL>,
  Omits extends keyof BrokenOut<IDL> = '',
> = {
  accounts: (
    accounts: AccountParams<IDL, T, true>,
  ) => Omit<ReturnTypedMethods<IDL, T, Omits | 'accounts'>, Omits | 'accounts'>
  instruction: () => Promise<TransactionInstruction>
  postInstructions: (
    transactionInstructions: TransactionInstruction[],
  ) => Omit<
    ReturnTypedMethods<IDL, T, Omits | 'postInstructions'>,
    Omits | 'postInstructions'
  >
  preInstructions: (
    transactionInstructions: TransactionInstruction[],
  ) => Omit<
    ReturnTypedMethods<IDL, T, Omits | 'preInstructions'>,
    Omits | 'preInstructions'
  >
  remainingAccounts: (
    accounts: AccountMeta[],
  ) => Omit<
    ReturnTypedMethods<IDL, T, Omits | 'remainingAccounts'>,
    Omits | 'remainingAccounts'
  >
  rpc: () => Promise<TransactionSignature>
  signers: (
    signers: Keypair[],
  ) => Omit<ReturnTypedMethods<IDL, T, Omits | 'signers'>, Omits | 'signers'>
  simulate: (options?: ConfirmOptions) => Promise<SimulateResponse<any, any>>
  transaction: () => Promise<Transaction>
}

type TypedMethods<IDL extends Idl> = {
  [T in keyof BrokenOut<IDL>]: (
    ...args: ArgParams<IDL, T>
  ) => ReturnTypedMethods<IDL, T>
}

export type TypedProgram<IDL extends Idl> = Omit<
  Program<IDL>,
  'rpc' | 'instruction' | 'transaction' | 'simulate' | 'methods'
> & {
  /** @deprecated */
  instruction: TypedInstruction<IDL, TransactionInstruction>
  methods: TypedMethods<IDL>
  /** @deprecated */
  rpc: TypedInstruction<IDL, Promise<TransactionSignature>>
  /** @deprecated */
  simulate: TypedInstruction<
    IDL,
    Promise<SimulateResponse<NullableEvents<IDL>, IdlTypes<IDL>>>
  >
  /** @deprecated */
  transaction: TypedInstruction<IDL, Transaction>
}
