import { loadFixture } from "@nomicfoundation/hardhat-toolbox-viem/network-helpers";
import { expect } from "chai";
import hre from "hardhat";
import { getAddress } from "viem";
import { deployProxy, upgradeProxy } from "../lib/helpers";

describe("Box", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployFixture() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await hre.viem.getWalletClients();

    const box = await deployProxy("Box", [42]);

    const publicClient = await hre.viem.getPublicClient();

    return {
      box,
      owner,
      otherAccount,
      publicClient,
    };
  }

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      const { box, owner } = await loadFixture(deployFixture);

      expect(await box.read.owner()).to.equal(
        getAddress(owner.account.address)
      );
    });

    it("Should set the right value", async function () {
      const { box } = await loadFixture(deployFixture);

      expect(await box.read.retrieve()).to.equal(42);
    });

    it("Should keep state when upgraded", async function () {
      const { box } = await loadFixture(deployFixture);

      await expect(box.write.increment()).to.be.rejected;

      const box2 = await upgradeProxy(box.address, "BoxV2");

      expect(await box2.read.retrieve()).to.equal(42);

      await box2.write.increment();
      expect(await box2.read.retrieve()).to.equal(43);
    });
  });
});
