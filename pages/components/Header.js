import React, { ReactElement, useState } from "react";
import { useAccount, useDisconnect } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";



const Header = ({ handleShowConnect }) => {
    const [showMenu, setShowMenu] = useState(false);
    const showConnectModal = () => {
        setShowMenu(false);
        handleShowConnect();
    }

    const { address } = useAccount()
    const disconnect = useDisconnect()

    return (
        <>
            {/* <div className="MainHeaderContainer hidden lg:flex bg-[#1E2B45]"> */}
            <div className="MainHeaderContainer justify-between w-full flex bg-[#1E2B45]">
                <div className="HeaderLeftPortion">
                    <div className="logo-container lg:block hidden hover:scale-105 transition-all duration-500 ease-in-out">
                        <img src="/Images/cropknightlogo.png" style={{ width: "100%", height: "100%" }}></img>
                    </div>
                    <div className="lg:hidden block">
                        <svg xmlns="http://www.w3.org/2000/svg" width="36.355" height="51" viewBox="8855.158 6671.504 36.355 51" className="sc-8a800401-0 fGhPpn mobile-icon" color="text"><g data-name="Group 1102"><g data-name="Path 14773"><path d="M8875.05 6718.604h-3.428l.184 3.4-5.905-3.492-.12-.542c-1.922-8.63-9.163-11.127-9.237-11.15l-.798-.265-.076-.836c-.023-.252-.17-2.853 1.688-16.354 1.992-14.487 15.597-17.287 15.734-17.314l.244-.047.244.047c.137.027 13.741 2.827 15.734 17.314 1.857 13.5 1.71 16.102 1.688 16.354l-.076.836-.799.265c-.294.1-7.327 2.576-9.236 11.15l-.12.542-5.905 3.492.185-3.4Z" fill="#002d56" fill-rule="evenodd"></path><path d="M2461.707 533.665h-3.429l.184 3.4-5.904-3.492-.12-.542c-1.922-8.63-9.164-11.127-9.237-11.15l-.798-.265-.076-.836c-.023-.252-.17-2.853 1.688-16.354 1.992-14.487 15.597-17.287 15.734-17.314l.243-.047.245.047c.137.027 13.741 2.827 15.734 17.314 1.857 13.5 1.71 16.103 1.687 16.354l-.075.836-.799.266c-.294.1-7.327 2.575-9.236 11.149l-.121.542-5.904 3.492.184-3.4Z" stroke-linejoin="round" stroke-linecap="round" stroke="#fff" fill="transparent" transform="matrix(1.02828 0 0 1.02 6343.765 6174.698)"></path></g><path d="M8870.164 6717.322h6.757l3.62-18.994s4.611-5.457 4.49-10.371l-8.821 2.714-1.924 7.336-.558 2.728-.726-8.663-2.585-1.4-8.45-3.235s-.417 9.905 6.544 11.213l1.653 18.672Z" fill="#002d56" fill-rule="evenodd" data-name="Path 14774"></path><path d="M8888.042 6689.539c-1.89-13.745-14.707-16.229-14.707-16.229s-12.815 2.484-14.706 16.229c-1.89 13.745-1.68 16.063-1.68 16.063s7.984 2.65 10.084 12.09l3.36 1.986-1.26-23.184s-6.723-.993-5.673-7.12l7.354 2.816.84 8.611 1.681.497 1.681-.497.84-8.611 7.354-2.816c1.05 6.128-5.672 7.12-5.672 7.12l-1.261 23.184 3.361-1.987c2.101-9.44 10.085-12.089 10.085-12.089s.21-2.318-1.681-16.063Z" fill="#78848a" fill-rule="evenodd" data-name="Path 14775"></path><path d="m8869.243 6696.495 1.247 22.93-.01.24-.61-.36-2.132-21.779-2.46-1.497c-3.85-2.566-1.708-6.655-1.708-6.655-1.049 6.127 5.673 7.121 5.673 7.121Z" fill="#b0bfc6" fill-rule="evenodd" data-name="Path 14776"></path><path d="m8858.565 6697.123-.32 7.62s4.972 2.004 6.896 7.538l-1.443-7.298s-2.406.72-3.77-.882c-1.363-1.603-1.363-6.978-1.363-6.978Z" fill="#b0bfc6" fill-rule="evenodd" data-name="Path 14777"></path><path d="m8867.388 6718.697-4.385-17.538s1.204 10.24 1.417 11.523c-.001.002 1.791 5.588 2.968 6.015Z" fill="#002d56" fill-rule="evenodd" data-name="Path 14778"></path><path d="m8877.539 6696.495-1.247 22.93.011.24.609-.36 2.133-21.779 2.46-1.497c3.849-2.566 1.706-6.655 1.706-6.655 1.05 6.127-5.672 7.121-5.672 7.121Z" fill="#acbac3" fill-rule="evenodd" data-name="Path 14779"></path><path d="m8888.239 6697.123.32 7.62s-4.972 2.004-6.897 7.538l1.444-7.298s2.405.72 3.77-.882c1.364-1.603 1.363-6.978 1.363-6.978Z" fill="#919ea5" fill-rule="evenodd" data-name="Path 14780"></path><path d="M8869.632 6676.512a13.375 13.375 0 0 0-8.1 9.865c.72-.562 2.565-3.77 6.496-3.93 3.93-.16 5.534-2.326 4.812-4.25-.722-1.926-2.404-2.006-3.208-1.685Z" fill="#b0bfc6" fill-rule="evenodd" data-name="Path 14781"></path><path d="M8863.777 6685.575s1.122-1.444 2.486-1.524c1.363-.08-1.604 3.368-2.486 1.524Z" fill="#b0bfc6" fill-rule="evenodd" data-name="Path 14782"></path></g></svg>
                    </div>

                    {/* <div className="leftLinkContainer hidden md:flex lg:flex ">
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

                </div>
                <div className="flex justify-end HeaderRightPortion">

                    <div className="rightLinkContainer">
                        {/* <p className="price lg:block hidden" style={{ fontWeight: "800", }}>$0.026</p>
                        <div className="coin-img hover:scale-110 transition-all duration-500 ease-in-out">
                           
                            <img src="/Images/setting.png"></img>
                        </div> */}
                        <div className="coin-img hover:scale-110 transition-all duration-500 ease-in-out">
                            <img src="/Images/coin.png"></img>
                        </div>

                        <div className="flex gap-3 hover:text-[#949393] transition-all bnbcontinaer duration-500 ease-in-out items-center">
                            <p className=" cursor-pointer hidden lg:block font-bold bnb text-lg">BNB Smart Chain</p>
                            <svg width="20" height="13" viewBox="0 0 20 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M18 2L9.99912 10.0009L1.99995 2.0017" stroke="white" stroke-width="3" />
                            </svg>
                        </div>
                        {/* {address ?
                            <div onClick={() => disconnect?.disconnect()}>
                                <div className="bg-[#FF720D] hover:scale-105 transition-all duration-500 ease-in-out connect flex justify-center items-center py-2 px-8 text-white font-bold text-lg rounded-[19.5px]">{address.slice(0, 4)}...{address.slice(-4)}</div>
                            </div>
                            :
                            <div onClick={showConnectModal}>
                                <div className="bg-[#FF720D] hover:scale-105 transition-all duration-500 ease-in-out connect flex justify-center items-center py-2 px-8 text-white font-bold text-lg rounded-[19.5px]">Connect Wallet</div>
                            </div>
                        } */}
                        <ConnectButton />


                    </div>
                </div>
            </div>
        </>

    )
}
export default Header;