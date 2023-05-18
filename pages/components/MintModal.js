import { ConnectButton } from "@rainbow-me/rainbowkit";
import React from "react";
import { AiOutlineClose } from "react-icons/ai";
const MintModal = ({ setOpenModal, minted }) => {
  return (
    <div className="fixed inset-0  bg-[#00000088] flex justify-center items-center">
      <div className="box-modal  p-10  flex flex-col justify-center items-center">
        <div
          onClick={() => setOpenModal(false)}
          className="cursor-pointer text-2xl w-full text-right "
        >
          <AiOutlineClose />
        </div>
        <h2 className="my-10">Mint Your NFTs</h2>
        <p className="font-samibold mb-10">Total Minted : {minted}</p>
        {/* <button className="bg-[#F9A11B] w-[180px] px-5 py-2 rounded-3xl text-white font-[700]">
          Connect wallet
        </button> */}
        <ConnectButton />
      </div>
    </div>
  );
};

export default MintModal;
