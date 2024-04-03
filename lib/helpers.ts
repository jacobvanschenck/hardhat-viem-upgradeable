import type { DeployProxyOptions } from "@openzeppelin/hardhat-upgrades/src/utils";
import { ethers, upgrades, viem } from "hardhat";
import { getAddress } from "viem";

export async function deployProxy(
  contractName: string,
  args?: unknown[],
  options?: DeployProxyOptions
) {
  const contract = await upgrades.deployProxy(
    await ethers.getContractFactory(contractName),
    args,
    options
  );
  return viem.getContractAt(
    contractName,
    getAddress(contract.target as string)
  );
}

export async function upgradeProxy(
  contractAddress: string,
  newContractName: string
) {
  const patch = await ethers.getContractFactory(newContractName);
  const upgrade = await upgrades.upgradeProxy(contractAddress, patch);
  return viem.getContractAt(
    newContractName,
    getAddress(upgrade.target as string)
  );
}
