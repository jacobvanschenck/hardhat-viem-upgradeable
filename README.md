# Hardhat-Upgrades with Viem

This template shows how to use the [openzeppelin-upgrades](https://github.com/OpenZeppelin/openzeppelin-upgrades) library alongside a [**viem**](https://github.com/wevm/viem) focused hardhat solidity project.

## The Secret Sauce

The magic happens in `lib/helpers.ts`

```javascript
export async function deployProxy(contractName: string, args?: unknown[], options?: DeployProxyOptions){
  ...
}
export async function upgradeProxy(contractAddress: string, newContractName: string){
  ...
}
```

These functions use `upgrades` from `@openzeppelin/hardhat-upgrades` to deploy/upgrade an **ethers** instance of the Proxy contract and then return back a **viem** instance of the Proxy to work with.

## Getting Started

Try running some of the following tasks:

```shell
pnpm install
pnpm hardhat compile
pnpm hardhat test
```

## Contributing
If you're intereseted in contributing, open up [a new issue](https://github.com/jacobvanschenck/hardhat-viem-upgradeable/issues) and let's talk.

## Credit
Shout out to [@time-holder](https://github.com/time-holder) in [this thread](https://github.com/wevm/viem/discussions/1917#discussioncomment-8722898) for the `deployProxy` and `upgradeProxy` functions that inspired this template.
