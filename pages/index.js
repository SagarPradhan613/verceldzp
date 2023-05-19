import { ConnectButton } from "@rainbow-me/rainbowkit";
import React, { useState, useEffect } from "react";
import Web3 from "web3";
import { useAccount } from "wagmi";
import MintModal from "./components/MintModal";

const abi = [
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "user", type: "address" },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenid",
        type: "uint256",
      },
    ],
    name: "Claim",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: "uint8", name: "version", type: "uint8" },
    ],
    name: "Initialized",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    inputs: [
      { internalType: "address", name: "_add", type: "address" },
      { internalType: "bool", name: "_value", type: "bool" },
    ],
    name: "Whitelist",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address[]", name: "_add", type: "address[]" }],
    name: "addMultipleWhitelist",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_newvalue", type: "uint256" }],
    name: "changeIcotarget",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_newmax", type: "uint256" }],
    name: "changeMaxInvestment",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_newprice", type: "uint256" }],
    name: "changePrice",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_add", type: "address" }],
    name: "changenftaddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_add", type: "address" }],
    name: "changenftadmin",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_newvalue", type: "uint256" }],
    name: "changeredeemeendlimit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_newvalue", type: "uint256" }],
    name: "changeredeemstartlimit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_user", type: "address" }],
    name: "checkSpecialNFT",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "claimIndex",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "claimenabled",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "existinguser",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getRound",
    outputs: [
      { internalType: "enum DZPMinter.Round", name: "", type: "uint8" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "icoTarget",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_nftAdmin", type: "address" }],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "_price", type: "uint256" },
      { internalType: "address", name: "_nftaddress", type: "address" },
      { internalType: "address", name: "_specialnftadd1", type: "address" },
      { internalType: "address", name: "_specialnftadd2", type: "address" },
      { internalType: "uint256", name: "_icotarget", type: "uint256" },
      { internalType: "uint256", name: "_maxinvestment", type: "uint256" },
      { internalType: "uint256", name: "_nftstartingrange", type: "uint256" },
      { internalType: "uint256", name: "_nftendrange", type: "uint256" },
    ],
    name: "initializeICO",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "investors",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "iswhitelist",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "maxInvestment",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "nftAdmin",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "nftaddress",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "price",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "receivedFund",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "redeemendrange",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "redeemstarttingrange",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_owner", type: "address" }],
    name: "remainigContribution",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "resetICO",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "round",
    outputs: [
      { internalType: "enum DZPMinter.Round", name: "", type: "uint8" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "bool", name: "_status", type: "bool" }],
    name: "setclaimStatus",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "specialNftadd1",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "specialNftadd2",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "startPublicround",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "startSpecialNftround",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "startWhitelistinground",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_noofnfts", type: "uint256" }],
    name: "trade",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "userinvested",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address payable", name: "_admin", type: "address" },
    ],
    name: "withdarw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const nftabi = [
  { inputs: [], stateMutability: "nonpayable", type: "constructor" },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "approved",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      { indexed: false, internalType: "bool", name: "approved", type: "bool" },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "from", type: "address" },
      { indexed: true, internalType: "address", name: "to", type: "address" },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [],
    name: "BASE_URI",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "MAX_SUPPLY",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_approver", type: "address" },
      { internalType: "bool", name: "status", type: "bool" },
    ],
    name: "approveForMinting",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "owner", type: "address" }],
    name: "balanceOf",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "startRange", type: "uint256" },
      { internalType: "uint256", name: "endRange", type: "uint256" },
    ],
    name: "batchMint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "getApproved",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "owner", type: "address" },
      { internalType: "address", name: "operator", type: "address" },
    ],
    name: "isApprovedForAll",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "mintApproved",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "ownerOf",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
    ],
    name: "safeMint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
      { internalType: "bytes", name: "_data", type: "bytes" },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "operator", type: "address" },
      { internalType: "bool", name: "approved", type: "bool" },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "string", name: "_newBaseURI", type: "string" }],
    name: "setBaseURI",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "bytes4", name: "interfaceId", type: "bytes4" }],
    name: "supportsInterface",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "index", type: "uint256" }],
    name: "tokenByIndex",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "owner", type: "address" },
      { internalType: "uint256", name: "index", type: "uint256" },
    ],
    name: "tokenOfOwnerByIndex",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "tokenURI",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
const nftContractAddress = "0x818285BB6BfbA7AB3cA8c2540Bdb9617Fa326878";
const minterContractAddress = "0x09171E61493D6fEdE85f98AedbE4B2eaBAFD8551";

function Home() {
  const [count, setCount] = useState(0);
  const [supply, setSpply] = useState(0);
  const [price, setPrice] = useState(0);
  const [minted, setMinted] = useState(0);
  const [remainingNfts, setremainingNfts] = useState(0);
  const [isdisable, setisDisable] = useState(false);
  const [opentModal, setOpenModal] = useState(false);
  const account = useAccount();
  const accountAddress = account.address;
  const getRpcUrl = () => {
    return "https://polygon-rpc.com";
  };
  let _web3;
  if (typeof window !== "undefined") {
    _web3 = new Web3(window.ethereum);
  } else {
    _web3 = new Web3(new Web3.providers.HttpProvider(getRpcUrl()));
  }
  useEffect(() => {
    async function fetchData() {
      const data = new _web3.eth.Contract(nftabi, nftContractAddress);
      // console.log(data, "data");
      const tsupply = await data.methods.MAX_SUPPLY().call();
      // console.log(tsupply, "synbol");
      setSpply(tsupply);
    }
    console.log("tsupply", supply);
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      const data = new _web3.eth.Contract(abi, minterContractAddress);
      console.log(data, "data");

      const totalmint = await data.methods.claimIndex().call();
      setMinted(totalmint);
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      const data = new _web3.eth.Contract(abi, minterContractAddress);
      let remainingcontri = await data.methods
        .remainigContribution(accountAddress)
        .call();
      let p = await data.methods.price().call();
      let pricee = Number(p) / 10 ** 18;
      let remainingnfts = Number(remainingcontri) / 10 ** 18;
      const remainingnftsvalue = remainingnfts / pricee;
      setremainingNfts(remainingnftsvalue);
    }
    if (accountAddress) {
      fetchData();
    }
  }, [accountAddress]);

  useEffect(() => {
    async function fetchData() {
      const data = new _web3.eth.Contract(abi, minterContractAddress);
      const pri = await data.methods.price().call();
      setPrice(Number(pri) / 10 ** 18);
    }
    fetchData();
  }, []);

  const mint = async () => {
    try {
      setisDisable(true);
      const data = new _web3.eth.Contract(abi, minterContractAddress);

      await data.methods.trade(count).send({
        from: accountAddress,
        value: _web3.utils.toWei((count * price).toString()),
      });
      setisDisable(false);

      alert("Tx Success");
    } catch (e) {
      console.log(e, " error ");
      setisDisable(false);
      alert("Tx Fail");
    }
  };

  const decrementCountHandler = () => {
    if (count == 0) {
      return 0;
    } else {
      setCount(count - 1);
    }
  };

  const incrementCountHandler = () => {
    if (count >= remainingNfts) {
      return remainingNfts;
    } else {
      setCount(count + 1);
    }
  };
  return (
    <main className=" container mx-auto">
      <nav className="flex justify-end mt-10 mb-5 md:mb-0 mr-3">
        {/* <button className="bg-[#DD4C31] p-2">Unlock wallet</button> */}
        <ConnectButton />
      </nav>
      <section>
        <div className=" flex flex-col justify-center items-center  ">
          <img src="/images/headerlogo.png" alt="logo" className="" />

          <h1 className="text-[35px] font-[700] mt-10 text-center">
            ALL ACCE$$ Pass: for the true fans{" "}
          </h1>
          <p className="md:w-[50%] mb-5 px-5">
            NFTs are still in the early stages, but their impact on artists and
            their art is profound. Blockchain technology puts the power back
            into the hands of artists, performers, creators, and true
            collectors.
          </p>
          <a
            href="https://dzpallexcess.com/"
            target="blank"
            className="bg-[#F9A11B] w-[150px] px-5 py-2 rounded-3xl text-white font-[700] mb-5 transition-all hover:bg-[#f3ae47]"
          >
            More Details
          </a>
          <h2 className="mb-3"> ALL ACCE$$ Pass</h2>
          <div className="box-modal md:px-12 px-5 text-center pt-10 pb-5">
            <div className="flex justify-between">
              <p>
                <span className="font-[600]">Supply :</span> {supply}
              </p>
              <p className="text-[16px]">
                <span className="font-[600] md:text-[20px] text-[18px]">
                  Price{" "}
                </span>
                : Free + Gas Fee
              </p>
            </div>
            <div className="flex justify-start py-1">
              <p>
                <span className="font-[600]">Minted :</span> {minted}
              </p>
            </div>
            <h2 className="mt-5">NFT Address:</h2>
            <a
              href="https://polygonscan.com/address/0x818285bb6bfba7ab3ca8c2540bdb9617fa326878"
              target="blank"
              className="md:text-[18px] text-[12px] pt-2 transition-all hover:text-[#3b280cca]"
            >
              {nftContractAddress}
            </a>

            {/* ------------------- */}
            {accountAddress ? (
              <div className="flex justify-center items-center gap-5 mt-8">
                <button
                  onClick={decrementCountHandler}
                  className="bg-[#F9A11B]  px-4 py-2 rounded-full text-white font-[700]"
                >
                  -
                </button>
                <span>{count}</span>
                <button
                  onClick={incrementCountHandler}
                  className="bg-[#F9A11B]  px-4 py-2 rounded-full text-white font-[700]"
                >
                  +
                </button>
                <button
                  onClick={() => setCount(remainingNfts)}
                  className="bg-[#F9A11B]  px-6 py-2 rounded-full text-white font-[700]"
                >
                  Max
                </button>
                <button
                  onClick={mint}
                  className="bg-[#F9A11B]  px-6 py-2 rounded-full text-white font-[700] active:scale-[0.9]"
                >
                  Mint
                </button>
              </div>
            ) : (
              <div className="flex justify-center items-center gap-5 mt-8">
                <button
                  onClick={() => setOpenModal(true)}
                  className="bg-[#F9A11B] w-[150px] px-5 py-2 rounded-3xl text-white font-[700]  transition-all hover:bg-[#f3ae47]"
                >
                  Unlock wallet
                </button>
                {opentModal && (
                  <MintModal setOpenModal={setOpenModal} minted={minted} />
                )}
                <a
                  href="https://paragraph.xyz/@dzpallexcess/about-the-all-excess-pass"
                  target="_blank"
                >
                  <button className="bg-[#F9A11B] w-[150px] px-5 py-2 rounded-3xl text-white font-[700]  transition-all hover:bg-[#f3ae47]">
                    About
                  </button>
                </a>
              </div>
            )}
            {/* ---------------------- */}
          </div>
        </div>
      </section>
      <footer>
        <div className="box-modal my-20 md:p-14 p-5 mx-3 flex lg:flex-row flex-col gap-8 justify-between">
          <div className="">
            <img src="/images/headerlogo.png" alt="logo" className="w-20" />
            <p className="text-start my-5 text-[16px] ">
              "This is a great time to starting sharing the collection with true
              music fans"
              <br /> - Danny Zelisko
            </p>

            <a
              href=" https://www.amazon.com/ALL-EXCESS-Occupation-Concert-Promoter/dp/0578749319"
              target="_blank"
              className="text-start text-[16px] text-[#DD4C31] font-samibold"
            >
              Amazon
            </a>
          </div>
          <div className=" ">
            <p className="text-start my-5 font-semibold">Socials:</p>
            <div className="flex xl:flex-nowrap flex-wrap gap-10">
              {/* <div className=" ">
                <span className="opacity-[0.6] text-[16px] whitespace-nowrap">
                  SUBSCRIBE US ON
                </span>
                <div className="flex justify-center items-center gap-3">
                  <img src="/images/Youtubelogo.png" alt="youtube" />
                  <p className="text-[16px]">YouTube</p>
                </div>
              </div> */}
              <div>
                <span className="opacity-[0.6] text-[16px] whitespace-nowrap ">
                  FOLLOW US ON
                </span>
                <a href="https://twitter.com/dzpresents" target="_blank">
                  <div className="flex justify-center items-center gap-3">
                    <img src="/images/Twitterlogo.png" alt="twitter" />
                    <p className="text-[16px]">Twitter</p>
                  </div>
                </a>
              </div>
              <div>
                <span className="opacity-[0.6] text-[16px] whitespace-nowrap">
                  FOLLOW US ON
                </span>
                <a href="https://www.instagram.com/dzpresents/" target="_blank">
                  <div className="flex justify-center items-center gap-3">
                    <img src="/images/Instagramlogo.png" alt="instagramlogo" />
                    <p className="text-[16px]">Instagram</p>
                  </div>
                </a>
              </div>
              <div>
                <span className="opacity-[0.6] text-[16px] whitespace-nowrap">
                  FOLLOW US ON
                </span>
                <a
                  href="https://www.facebook.com/dannyzeliskopresents"
                  target="_blank"
                >
                  <div className="flex justify-center items-center gap-3">
                    <img src="/images/Facebooklogo.png" alt="Facebook" />
                    <p className="text-[16px]">Facebook</p>
                  </div>
                </a>
              </div>
              {/* <div>
                <span className="opacity-[0.6] text-[16px] whitespace-nowrap">
                  FOLLOW US ON
                </span>
                <div className="flex justify-center items-center gap-3">
                  <img src="/images/Linkdlnlogo.png" alt="linkdin" />
                  <p className="text-[16px]">LinkedIn</p>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
export default Home;
