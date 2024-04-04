"use client";

// import { Carousel } from "flowbite-react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import React, { useState, useEffect } from "react";
import Web3 from "web3";
import { useAccount } from "wagmi";
import MintModal from "./components/MintModal";
import Header from "./components/Header";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
// import { Carousel } from 'react-responsive-carousel';
import "slick-carousel/slick/slick.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";

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
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);
  const [accountAddress, setAccountAddress] = useState();
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? imageArray.length - 1 : prevIndex - 1));
  };

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === imageArray.length - 1 ? 0 : prevIndex + 1));
  };

  // const accountAddress = account.address;

  useEffect(() => {
    setAccountAddress(account.address)
  }, [account])

  console.log(accountAddress, "accadd")


  const getRpcUrl = () => {
    return "https://polygon-rpc.com";
  };
  let _web3;
  if (typeof window !== "undefined") {
    _web3 = new Web3(getRpcUrl());
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
      const totalmint = await data.methods.claimIndex().call();
      console.log(totalmint);
      setMinted(Number(totalmint) + 4424);
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
    const _web3 = new Web3(window.ethereum);
    try {
      setisDisable(true);
      const data = new _web3.eth.Contract(abi, minterContractAddress);

      await data.methods
        .trade(count)
        .send({
          from: accountAddress,
          value: _web3.utils.toWei((count * price).toString()),
        })
        .estimateGas();
      setisDisable(false);
      setSuccess(true);
      // alert("Tx Success");
    } catch (e) {
      console.log(e, " error ");
      setisDisable(false);
      setFailure(true);
      // alert("Tx Fail");

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

  const handleSuccess = () => {
    setSuccess(false);
    setCheckoutSuccess(true);
  }

  // console.log(count, "count")
  // const [exampleCount, setExampleCount] = useState(2)

  const imageArray = new Array(count).fill(null);


  return (
    <>
      {/* failed modal */}
      <div
        className={failure ? "modal-overlay show-overlay" : "modal-overlay"}
      // className="modal-overlay show-overlay"
      >
        <div
          className={
            failure ? "modal-container show-sorry-modal" : "modal-container"
          }
        >

          <div className="w-full items-center px-3 py-3 flex justify-between">
            <p className="text-white font-bold lg:text-3xl text-xl">Sorry</p>
            <span className="" onClick={() => { setFailure(false) }}  >
              {/* X */}
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16.6684 1.5L2.09732 16.0711" stroke="white" stroke-width="2" stroke-linecap="round" />
                <path d="M15.9024 16.071L1.33136 1.49997" stroke="white" stroke-width="2" stroke-linecap="round" />
              </svg>

            </span>
          </div>

          <div className="p-4 rounded-[20px] bg-[#121D32]">
            <div className="text-center conngratulation sorry">
              <p className="font-semibold text-base">Your wallet</p>
              <p className="text-white">{accountAddress}</p>
              {/* <h6 className="font-semibold text-base mt-4">Failed!</h6> */}

              <h6 className="font-semibold mt-4 text-base">is Not Whitelisted!</h6>
            </div>
            <div className="mt-5 mb-3">
              <button
                type="button"
                className="button font-bold full"
                onClick={() => { setFailure(false) }}
              >
                DONE!
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* success modal */}
      <div
        className={
          success ? "modal-overlay show-overlay" : "modal-overlay"
        }
      // className="modal-overlay show-overlay"
      >
        <div
          className={
            success
              ? "modal-container show-success-modal"
              : "modal-container"
          }
        // className="modal-container show-success-modal"
        >

          <div className="w-full items-center px-3  py-3 flex justify-between">
            <p className="text-white  font-bold lg:text-3xl pb-3 text-xl">Congratulations!</p>

            <span className="" onClick={() => { handleSuccess() }}>
              {/* X */}
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16.6684 1.5L2.09732 16.0711" stroke="white" stroke-width="2" stroke-linecap="round" />
                <path d="M15.9024 16.071L1.33136 1.49997" stroke="white" stroke-width="2" stroke-linecap="round" />
              </svg>
            </span>
          </div>

          <div className="p-4 rounded-[20px] bg-[#121D32]">
            <div className="text-center conngratulation">
              <p className="font-semibold text-base">Your wallet</p>
              <p className="text-white font-semibold text-base">{accountAddress}</p>
              <h6 className="font-semibold text-base mt-4">is Whitelisted!</h6>
            </div>
            <div className="mt-5 mb-3">
              <button
                type="button"
                className="button full font-bold "
                onClick={() => { handleSuccess() }}
              >
                DONE!
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Checkout success modal */}
      <div
        className={
          checkoutSuccess ? "modal-overlay1 show-overlay" : "modal-overlay1"
        }
      // className="modal-overlay1 show-overlay"
      >
        <div
          className={`${checkoutSuccess
            ? "modal-container1 show-sorry-modal p-4 checkout-modal"
            : "modal-container1 p-4 checkout-modal "
            }`}
        // className="modal-container1 show-sorry-modal p-2 checkout-modal"
        >
          <div className="w-full items-center px-2 pb-2 flex justify-between">
            <h6 className="text-white font-semibold pb-2 lg:text-2xl text-xl">
              Report
            </h6>
            <span className="" onClick={() => { setCheckoutSuccess(false) }}>
              {/* X */}
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16.6684 1.5L2.09732 16.0711" stroke="white" stroke-width="2" stroke-linecap="round" />
                <path d="M15.9024 16.071L1.33136 1.49997" stroke="white" stroke-width="2" stroke-linecap="round" />
              </svg>

            </span>
          </div>

          <div className="p-6 rounded-[20px] bg-[#121D32]">
            {/* <h6 className="text-[rgba(255,255,255,0.6)] font-semibold lg:text-lg text-xl">
              MINTED <span className="ml-4 text-2xl text-white">{minted}</span>
            </h6>
            <h4 className="text-white text-center font-medium lg:text-xl ">Successfully</h4> */}

            <div className="text-center w-100">
              <div style={{ position: 'relative', maxWidth: '600px', margin: 'auto' }}>
                <div className="bg-[#FF720D] flex justify-center items-center h-[40px] w-[40px] rounded-[50%]" onClick={goToPrevSlide} style={{ position: 'absolute', top: '45%', left: '-20px', zIndex: 1 }}>
                  <svg className="mr-2" width="11" height="15" viewBox="0 0 11 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.72311 2.38961L2.48786 7.67181L8.72313 12.809" stroke="white" stroke-width="3" stroke-linecap="round" />
                  </svg>
                </div>
                <button className="bg-[#FF720D] flex justify-center items-center h-[40px] w-[40px] rounded-[50%]" onClick={goToNextSlide} style={{ position: 'absolute', top: '45%', right: '-20px', zIndex: 1 }}>
                  <svg width="11" height="15" viewBox="0 0 11 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.05497 2.38961L8.29022 7.67181L2.05494 12.809" stroke="white" stroke-width="3" stroke-linecap="round" />
                  </svg>
                </button>
                <div style={{ overflow: 'hidden' }}>
                  <div style={{ display: 'flex', transition: 'transform 0.5s', transform: `translateX(-${currentIndex * 100}%)` }}>
                    {imageArray.map((index) => (
                      <img
                        key={index}
                        src="/Images/knightleft.png"
                        alt={`Image ${index}`}
                        style={{ minWidth: '100%', flex: '0 0 auto' }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="my-4 w-full px-4 flex justify-start">
                <p className="font-semibold text-lg text-[rgba(255,255,255,0.6)]">ID</p>

              </div>
              {/* <Carousel showThumbs={false} showStatus={false} infiniteLoop={true}>
                {nftData?.map((data, index) => (
                  <div className="blue-bg" key={index}>
                    <img src={data.img} alt="" />

                    <span className="flex flex-row flex-justify mt-2 small-text-modal">
                      <span className="font-semibold text-lg text-[rgba(255,255,255,0.6)]">Id</span>
                      <span className="text-white text-xl lg:text-2xl font-semibold">{data.nftId}</span>
                    </span>

                    <span className="flex flex-row flex-justify mt-2 small-text-modal">
                      <span className="font-semibold text-lg text-[rgba(255,255,255,0.6)]">Mouth</span>
                      <span className="text-white text-xl lg:text-2xl font-semibold">
                        {data.metaData.attributes[5].value}
                      </span>
                    </span>
                    <span className="flex flex-row flex-justify mt-2 small-text-modal">
                      <span className="font-semibold text-lg text-[rgba(255,255,255,0.6)]">Head</span>
                      <span className="text-white text-xl lg:text-2xl font-semibold">
                        {data.metaData.attributes[4].value}
                      </span>
                    </span>
                    <span className="flex flex-row flex-justify mt-2 small-text-modal">
                      <span className="font-semibold text-lg text-[rgba(255,255,255,0.6)]">Eyes</span>
                      <span className="text-white text-xl lg:text-2xl font-semibold">
                        {data.metaData.attributes[2].value}
                      </span>
                    </span>
                    <span className="flex flex-row flex-justify mt-2 small-text-modal">
                      <span className="font-semibold text-lg text-[rgba(255,255,255,0.6)]">Body</span>
                      <span className="text-white text-xl lg:text-2xl font-semibold">
                        {data.metaData.attributes[1].value}
                      </span>
                    </span>
                    <span className="flex flex-row flex-justify mt-2 small-text-modal">
                      <span className="font-semibold text-lg text-[rgba(255,255,255,0.6)]">Outifit</span>
                      <span className="text-white text-xl lg:text-2xl font-semibold">
                        {data.metaData.attributes[6].value}
                      </span>
                    </span>
                    <span className="flex flex-row flex-justify mt-2 small-text-modal">
                      <span className="font-semibold text-lg text-[rgba(255,255,255,0.6)]">Feet</span>
                      <span className="text-white text-xl lg:text-2xl font-semibold">
                        {data.metaData.attributes[3].value}
                      </span>
                    </span>
                    <span className="flex flex-row flex-justify mt-2 small-text-modal">
                      <span className="font-semibold text-lg text-[rgba(255,255,255,0.6)]">Background</span>
                      <span className="text-white text-xl lg:text-2xl font-semibold">
                        {data.metaData.attributes[0].value}
                      </span>
                    </span>
                  </div>
                ))}
              </Carousel> */}
            </div>

            <div className="mt-2 mb-1">
              <button
                type="button"
                className="button full"
                onClick={() => { setCheckoutSuccess(false) }}
              >
                DONE!
              </button>
            </div>
          </div>

        </div>
      </div>

      <div className="main-wrapper relative">

        <Header />

        <div className="h-full  py-6 res-px flex lg:px-44 lg:py-36 lg:flex-row flex-col gap-4  w-full">
          <div className="a  lg:w-[40%] justify-center res-main-left  items-center  w-full lg:min-h-[500px] ">
            <img src="/Images/knightleft.png" className="h-full w-full"></img>
          </div>

          <div className="b w-full res-main-right lg:min-h-[500px] lg:w-[60%] justify-center flex items-center ">
            <div className="bg-[#1E2B45] flex justify-between flex-col border-[#423e4e] border-[1px]  py-10 px-4 lg:py-16 lg:px-10 h-full w-full rounded-[20px]">
              <div>
                <div className="flex w-full items-center justify-center">
                  <p className="text-white lg:text-6xl res-head-text text-3xl text-center font-semibold">Mint is Live Now</p>
                </div>
                <div className="flex justify-center mt-4 items-center w-full">
                  <p className="text-white text-sm res-para-text font-semibold opacity-50 text-center lg:w-[70%] lg:text-lg ">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has.</p>
                </div>
              </div>




              <div>
                <div className="flex w-full justify-center items-center mb-6">
                  <p className="font-semibold text-[rgba(255,255,255,0.6)] text-lg ">Minted : <span className="font-semibold  text-white text-xl">{minted}</span> </p>
                </div>

                <div className="flex mt-10 lg:mt-0 lg:flex-row flex-col gap-3 lg:gap-4 w-full">
                  <div className="lg:w-[60%] w-full p-2 bg-[#121d32] rounded-[20px] flex items-center justify-between ">
                    <button type="button" onClick={decrementCountHandler} className="bg-[#1E2B45]  rounded-[20px] dec w-[20%] h-[50px] flex justify-center  items-center ">
                      <svg className="dec-svg" width="14" height="5" viewBox="0 0 14 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13.5414 2.90796L0.2601 2.90796" stroke="white" stroke-width="4" />
                      </svg>
                    </button>

                    <div className="w-[70%]">
                      <input value={count} className="w-full px-4 bg-transparent border-none font-normal text-2xl lg:text-3xl text-white opacity-40" placeholder="0.00"></input>
                    </div>

                    <button type="button"
                      onClick={incrementCountHandler} className="bg-[#1E2B45] inc w-[20%] h-[50px] rounded-[20px] flex justify-center items-center ">
                      <svg className="inc-svg" width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.49429 0.935791V14.8539" stroke="white" stroke-width="4" />
                        <path d="M14.4534 7.89478L0.53536 7.89477" stroke="white" stroke-width="4" />
                      </svg>
                    </button>
                  </div>




                  {/* {address && isMintLive && isWhiteListed && (
                  <div className=" w-full lg:w-[30%]">
                    <button  onClick={mint} type="button" className="bg-[#FF720D] py-3 lg:py-0 rounded-[19.5px] text-white flex text-lg font-bold h-full w-full items-center justify-center text-center" >
                      Mint now
                    </button>
                  </div>
                )} */}

                  {accountAddress ?
                    (
                      <>
                        <div className=" w-full lg:w-[30%]">
                          <button onClick={mint} type="button" className="bg-[#FF720D] py-3 lg:py-4 rounded-[19.5px] text-white flex text-lg font-bold h-full w-full items-center justify-center text-center" >
                            Mint now
                          </button>
                        </div>
                      </>)
                    :
                    (
                      <>
                        <div className=" w-full lg:w-[30%]">
                          <button
                            onClick={() => setOpenModal(true)}
                            className="bg-[#FF720D] py-3 lg:py-0  rounded-[19.5px] text-white flex text-lg font-bold h-full w-full items-center justify-center text-center"
                          >
                            Unlock wallet
                          </button>
                        </div>
                        {opentModal && (
                          <MintModal setOpenModal={setOpenModal} minted={minted} />
                        )}
                      </>
                    )
                  }



                </div>

                <div className="mt-4 w-full gap-4 flex justify-center items-center">
                  <p className="font-semibold text-white text-lg opacity-50"> Price</p>
                  <p className="font-semibold text-white text-xl">Free + Gas Fee</p>
                </div>
              </div>


            </div>
          </div>


        </div>

        <div className="mt-10 pb-20 md:pb-0 social-container gap-8 flex w-full justify-center items-center">
          <a href="/" className="hover:scale-125 transition-all duration-500 ease-in-out" target="_blank">
            <svg width="32" height="29" viewBox="0 0 32 29" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M29.1304 0.982432C29.1304 0.982432 32.0763 -0.199093 31.8308 2.67033C31.749 3.85187 31.0125 7.9872 30.4397 12.4602L28.4757 25.7102C28.4757 25.7102 28.3121 27.6512 26.8391 27.9888C25.3661 28.3264 23.1567 26.8073 22.7475 26.4697C22.4202 26.2165 16.6102 22.4187 14.5644 20.5621C13.9915 20.0557 13.3369 19.0429 14.6462 17.8614L23.2385 9.42196C24.2205 8.4092 25.2025 6.04615 21.1109 8.91558L9.65452 16.9331C9.65452 16.9331 8.34522 17.777 5.89032 17.0175L0.57126 15.3296C0.57126 15.3296 -1.39269 14.0637 1.96239 12.7977C10.1455 8.83112 20.2108 4.78016 29.1304 0.982432Z" fill="#DAE7FF" />
            </svg>

          </a>
          {/* <a href="/" className="hover:scale-125 transition-all duration-500 ease-in-out" target="_blank">
            <svg width="35" height="29" viewBox="0 0 35 29" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M29.241 3.16503C27.0034 2.08296 24.6362 1.31391 22.202 0.878174C21.8983 1.44416 21.5452 2.20762 21.2995 2.8124C18.7139 2.4051 16.0835 2.4051 13.4979 2.8124C13.2268 2.15153 12.9221 1.50589 12.5852 0.878174C10.1489 1.31462 7.77993 2.08549 5.54113 3.17032C1.08674 10.1279 -0.121115 16.9126 0.482812 23.6004C3.08304 25.6295 6.00448 27.1765 9.11692 28.1724C9.81623 27.1778 10.4348 26.1251 10.9662 25.0251C9.95538 24.6269 8.98082 24.1366 8.05408 23.5599C8.29804 23.373 8.53688 23.1773 8.76719 22.9763C14.3817 25.6898 20.4806 25.6898 26.0286 22.9763C26.2623 23.1773 26.5011 23.373 26.7417 23.5599C25.8187 24.1347 24.8412 24.6284 23.8244 25.0268C24.355 26.1273 24.9736 27.1801 25.6737 28.1741C28.7886 27.1789 31.7121 25.6306 34.313 23.5987C35.021 15.8477 33.1034 9.12462 29.241 3.16503ZM11.7305 19.4869C10.045 19.4869 8.66312 17.8612 8.66312 15.8812C8.66312 13.9011 10.016 12.2719 11.7305 12.2719C13.4451 12.2719 14.8269 13.8976 14.7979 15.8812C14.7996 17.8612 13.4451 19.4869 11.7305 19.4869ZM23.0652 19.4869C21.3797 19.4869 19.9978 17.8612 19.9978 15.8812C19.9978 13.9011 21.3507 12.2719 23.0652 12.2719C24.7798 12.2719 26.1616 13.8976 26.1326 15.8812C26.1326 17.8612 24.7798 19.4869 23.0652 19.4869Z" fill="#DAE7FF" />
            </svg>

          </a> */}
          <a href="/" className="hover:scale-125 transition-all duration-500 ease-in-out" target="_blank">
            {/* <svg xmlns="http://www.w3.org/2000/svg" width="31" height="32" viewBox="0 0 31 32" fill="none">
              <g clip-path="url(#clip0_25_10626)">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M4.24658 0.293457H26.7535C29.0987 0.293457 31 2.19471 31 4.54003V27.0468C31 29.3922 29.0987 31.2935 26.7535 31.2935H4.24658C1.90126 31.2935 0 29.3922 0 27.0468V4.54003C0 2.19471 1.90126 0.293457 4.24658 0.293457ZM15.5103 4.35934C15.0314 4.35934 14.5609 4.48527 14.1459 4.72451L14.1447 4.72526L6.70537 8.97556L6.70262 8.97714C6.35393 9.17878 6.05499 9.45455 5.82633 9.7839C5.78008 9.82541 5.73949 9.87481 5.70669 9.93151C5.67759 9.98183 5.65653 10.0346 5.64311 10.0883C5.44361 10.4746 5.33893 10.9036 5.33861 11.3396V11.3401V19.8434V19.8438C5.33896 20.3226 5.46515 20.7929 5.70456 21.2076C5.94396 21.6222 6.28814 21.9666 6.70262 22.2063L6.70535 22.2079L14.1447 26.4585L14.1461 26.4594C14.46 26.6404 14.806 26.7567 15.1634 26.8025C15.2616 26.871 15.3811 26.9113 15.5099 26.9113C15.6387 26.9113 15.758 26.8711 15.8561 26.8026C16.214 26.7569 16.5603 26.6407 16.8747 26.4594L16.876 26.4585L24.3141 22.2078L24.3165 22.2065C24.7312 21.9671 25.0757 21.6227 25.3154 21.208C25.5551 20.7934 25.6816 20.323 25.682 19.844V19.8434V11.3401V11.3396C25.6818 10.9013 25.576 10.4702 25.3745 10.0823C25.361 10.0307 25.3404 9.97995 25.3125 9.93149C25.2806 9.87653 25.2415 9.82843 25.1969 9.78773C24.968 9.45668 24.6681 9.17956 24.318 8.97714L24.3153 8.97556L16.876 4.72526L16.8748 4.72457C16.4599 4.4853 15.9893 4.35934 15.5103 4.35934ZM16.1154 25.488C16.1683 25.465 16.2201 25.4389 16.2705 25.4099L16.2728 25.4085L23.711 21.1578L23.7119 21.1573C23.9423 21.024 24.1337 20.8325 24.2671 20.602C24.4005 20.3712 24.4709 20.1094 24.4711 19.8427V11.3405C24.4711 11.2686 24.4659 11.1972 24.4559 11.1265L16.1154 15.9516V25.488ZM14.9045 15.9515L6.56472 11.1273C6.55472 11.1976 6.54961 11.2688 6.54955 11.3403V19.8432C6.54978 20.1096 6.62003 20.3713 6.75325 20.6021C6.88627 20.8325 7.07743 21.024 7.30761 21.1573L7.30882 21.158L14.7478 25.4085L14.7502 25.4099C14.8002 25.4388 14.8518 25.4647 14.9045 25.4876V15.9515ZM15.5099 14.9028L23.821 10.0948C23.7861 10.0705 23.7501 10.0476 23.7132 10.0262L23.7119 10.0254L16.2729 5.77532L16.2705 5.77397C16.0394 5.64052 15.7772 5.57027 15.5103 5.57027C15.2435 5.57027 14.9812 5.64052 14.7502 5.77397L14.7478 5.77532L7.30882 10.0254L7.30755 10.0262C7.27034 10.0477 7.23415 10.0708 7.19907 10.0953L15.5099 14.9028Z" fill="white" />
              </g>
              <defs>
                <clipPath id="clip0_25_10626">
                  <rect width="31" height="31" fill="white" transform="translate(0 0.293457)" />
                </clipPath>
              </defs>
            </svg> */}
            <svg width="34" height="28" viewBox="0 0 34 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M33.2523 3.24053C32.7331 3.4708 32.1993 3.66515 31.6539 3.82293C32.2996 3.09267 32.792 2.23342 33.0925 1.29315C33.1599 1.08239 33.09 0.851693 32.9168 0.713851C32.7438 0.575902 32.5034 0.559378 32.3129 0.672274C31.1546 1.35925 29.9049 1.85294 28.5946 2.14163C27.2747 0.851907 25.482 0.11792 23.6288 0.11792C19.7169 0.11792 16.5342 3.30045 16.5342 7.21227C16.5342 7.52036 16.5537 7.82675 16.5923 8.12887C11.738 7.70266 7.22503 5.3167 4.12597 1.51521C4.01553 1.37972 3.84538 1.30669 3.67119 1.32066C3.49689 1.3343 3.34028 1.43259 3.25223 1.58365C2.62367 2.66219 2.29138 3.89574 2.29138 5.15082C2.29138 6.86026 2.9017 8.48217 3.97982 9.74951C3.652 9.63597 3.33389 9.49408 3.03027 9.32553C2.86727 9.23481 2.66834 9.2362 2.50641 9.32905C2.34436 9.42191 2.24277 9.59269 2.2385 9.77936C2.23776 9.81081 2.23776 9.84226 2.23776 9.87413C2.23776 12.4258 3.61106 14.723 5.71068 15.9751C5.5303 15.9571 5.35003 15.931 5.17093 15.8968C4.98629 15.8615 4.79642 15.9262 4.67191 16.067C4.54718 16.2077 4.50592 16.4039 4.56338 16.583C5.34054 19.0094 7.34144 20.7941 9.76035 21.3382C7.75412 22.5948 5.45984 23.2529 3.05138 23.2529C2.54884 23.2529 2.04341 23.2234 1.54876 23.1649C1.30303 23.1357 1.06807 23.2808 0.984383 23.5145C0.900697 23.7482 0.989394 24.0089 1.19845 24.1429C4.29249 26.1267 7.8701 27.1753 11.5443 27.1753C18.7673 27.1753 23.2858 23.7692 25.8044 20.9119C28.9451 17.349 30.7463 12.633 30.7463 7.97334C30.7463 7.77867 30.7433 7.58209 30.7373 7.38615C31.9764 6.45259 33.0432 5.32277 33.9113 4.0242C34.0432 3.82698 34.0289 3.56632 33.8761 3.38477C33.7236 3.20312 33.4693 3.14438 33.2523 3.24053Z" fill="#DAE7FF" />
            </svg>

          </a>

        </div>


        {/* <div className="w-full  flex md:hidden fixed bottom-0 py-4 px-4 justify-around gap-6 bg-[#1e2b45]">
          <a href="/" className="head-links cursor-pointer">TRADE</a>
          <a href="/" className="head-links cursor-pointer ">SWAP</a>
          <div className="spcl-container">
            <svg className="svg-hover" width="31" height="5" viewBox="0 0 31 5" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="2.5" cy="2.5" r="2.5" fill="#FF720D" />
              <circle cx="15.5" cy="2.5" r="2.5" fill="#FF720D" />
              <circle cx="28.5" cy="2.5" r="2.5" fill="#FF720D" />
            </svg>
          </div>
        </div> */}

        {/* <section>
        <div className=" flex flex-col justify-center items-center  ">
          <img src="/images/headerlogo.png" alt="logo" className="" />

          <h1 className="text-[35px] font-[700] mt-10 text-center">
            ALL EXCE$$ Pass: for the true fans{" "}
          </h1>
          <p className="md:w-[50%] mb-5 px-5">
            NFTs are still in the early stages, but their impact on artists and
            their art is profound. Blockchain technology puts the power back
            into the hands of artists, performers, creators, and true
            collectors.
          </p>
          <h2 className="mb-3"> ALL EXCE$$ Pass</h2>
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
              </div>
            )}
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
            </div>
          </div>
        </div>
      </footer> */}

      </div >
    </>

  );
}
export default Home;
