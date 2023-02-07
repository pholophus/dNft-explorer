export interface FdbDht {
    cid: string,
    key: string,
    public_key: string
  }
  
export interface KeyPair {
  pk: string,
  sk: string
}
  
export interface DatasetForm {
    key: string
    publicKey: string
    value: string
    signature: string
    name: string
}

export interface IpfsDagGetResult{
  success: boolean
  error: string
  content: string
}