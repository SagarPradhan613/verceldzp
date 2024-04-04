import { ConnectButton } from "@rainbow-me/rainbowkit";
import React from "react";
import { AiOutlineClose } from "react-icons/ai";
const MintModal = ({ setOpenModal, minted }) => {
  return (
    <div className="fixed inset-0  bg-[#00000088] flex justify-center items-center">
      <div>
        <div className="box-modal bg-[#1E2B45]  rounded-[20px] py-4  px-4 flex flex-col justify-center items-center">
          <div
            onClick={() => setOpenModal(false)}
            className="cursor-pointer text-2xl w-full text-right "
          >
            <div className="w-full pt-2 px-2 svg-container items-center flex justify-between">
              <p className="font-semibold text-2xl text-white">Mint Your NFTs</p>
              <AiOutlineClose />
            </div>

          </div>
          <div className="bg-[#121D32] mt-6 lex flex-col  justify-center items-center rounded-[20px] px-6 py-6">
            <p className="font-semibold text-lg text-[rgba(255,255,255,0.6)] w-full justify-between items-center flex mb-6">Total Minted : <span className="font-semibold text-2xl text-white">
              {minted} </span> </p>
            <ConnectButton />
          </div>
        </div>
      </div>

    </div>
  );
};

export default MintModal;
