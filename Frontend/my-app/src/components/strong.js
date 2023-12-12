import React, { useState, useEffect } from "react";
import styled from "styled-components";


const StyledListContainer = styled.div`
    max-width: 600px;
    margin: 0 auto;
    background-color: #f0f0f0;
    padding: 20px;
    border-radius: 8px;
    overflow-y: auto;
    max-height: 80vh;
    scrollbar-width: thin; /* For Firefox */
    scrollbar-color: #a0a0a0 #f0f0f0; /* For Firefox */
    
    &::-webkit-scrollbar-thumb {
        background-color: #a0a0a0; /* For Chrome, Safari, and Opera */
    }
    &::-webkit-scrollbar-track {
        //background-color: #ccc; /* 設定滾動條軌道的顏色 */
        border-radius: 8px; /* 可選，添加圓角效果 */
    }
    &::-webkit-scrollbar-thumb {
        border-radius: 5px; /* 可選，添加圓角效果 */
    }
    &::-webkit-scrollbar {
        width: 10px; /* 設定滾動條寬度 */
        opacity: 0; /* 初始時透明 */
        transition: opacity 0.5s ease; /* 添加過渡效果 */
    }
`;


const StyledTitle = styled.h1`
    color: grey;
    text-align: center;
    margin-bottom: 20px;
`;

const StyledList = styled.ul`
display:flex;
flex-direction:column;

    list-style-type: none;
    padding: 0;
    margin: 0;
    
`;

const ItemContainer = styled.div`

`

const StyledItem = styled.li`
    background-color: #fff;
    color : black ;
    border: 1px solid #ddd;
    border-radius: 8px;
    margin: 5px;
    padding: 10px;
    text-align: center;
    display:flex;
    &:hover {
        background-color: #D8DDEF;
    }
    
`;
const StyledCoinName = styled.div`
    margin-left:20%
`

const StyledPic = styled.img`
    width:20px;
    margin-left:20%;
`

const CoinIcon = {
    BTCUSDT: 'https://cryptocurrencyliveprices.com/img/btc-bitcoin.png',
    ETHUSDT: 'https://cryptocurrencyliveprices.com/img/eth-ethereum.png',
    BCHUSDT: 'https://cryptocurrencyliveprices.com/img/bch-bitcoin-cash.png',
    XRPUSDT: 'https://cryptocurrencyliveprices.com/img/xrp-xrp.png',
    EOSUSDT: 'https://cryptocurrencyliveprices.com/img/eos-eos.png',
    LTCUSDT: 'https://cryptocurrencyliveprices.com/img/ltc-litecoin.png',
    TRXUSDT: 'https://cryptocurrencyliveprices.com/img/trx-tron.png',
    ETCUSDT: 'https://cryptocurrencyliveprices.com/img/etc-ethereum-classic.png',
    LINKUSDT: 'https://cryptocurrencyliveprices.com/img/link-chainlink.png',
    XLMUSDT: 'https://cryptocurrencyliveprices.com/img/xlm-stellar.png',
    ADAUSDT: 'https://cryptocurrencyliveprices.com/img/ada-cardano.png',
    XMRUSDT: 'https://cryptocurrencyliveprices.com/img/xmr-monero.png',
    DASHUSDT: 'https://cryptocurrencyliveprices.com/img/dash-dash.png',
    ZECUSDT: 'https://cryptocurrencyliveprices.com/img/zec-zcash.png',
    XTZUSDT: 'https://cryptocurrencyliveprices.com/img/xtz-tezos.png',
    BNBUSDT: 'https://cryptocurrencyliveprices.com/img/bnb-binance-coin.png',
    ATOMUSDT: 'https://cryptocurrencyliveprices.com/img/atom-cosmos.png',
    ONTUSDT: 'https://cryptocurrencyliveprices.com/img/ont-ontology.png',
    IOTAUSDT: 'https://cryptocurrencyliveprices.com/img/miota-iota.png',
    BATUSDT: 'https://cryptocurrencyliveprices.com/img/bat-basic-attention-token.png',
    VETUSDT: 'https://cryptocurrencyliveprices.com/img/vet-vechain.png',
    NEOUSDT: 'https://cryptocurrencyliveprices.com/img/neo-neo.png',
    QTUMUSDT: 'https://cryptocurrencyliveprices.com/img/qtum-qtum.png',
    IOSTUSDT: 'https://cryptocurrencyliveprices.com/img/iost-iost.png',
    THETAUSDT: 'https://cryptocurrencyliveprices.com/img/theta-theta-token.png',
    ALGOUSDT: 'https://cryptocurrencyliveprices.com/img/algo-algorand.png',
    ZILUSDT: 'https://cryptocurrencyliveprices.com/img/zil-zilliqa.png',
    KNCUSDT: 'https://cryptocurrencyliveprices.com/img/knc-kyber-network.png',
    ZRXUSDT: 'https://cryptocurrencyliveprices.com/img/zrx-0x.png',
    COMPUSDT: 'https://cryptocurrencyliveprices.com/img/comp-compoundd.png',
    OMGUSDT: 'https://cryptocurrencyliveprices.com/img/omg-omg-network.png',
    DOGEUSDT: 'https://cryptocurrencyliveprices.com/img/doge-dogecoin.png',
    SXPUSDT: 'https://cryptocurrencyliveprices.com/img/sxp-swipe.png',
    KAVAUSDT: 'https://cryptocurrencyliveprices.com/img/kava-kava.png',
    BANDUSDT: 'https://cryptocurrencyliveprices.com/img/band-band-protocol.png',
    RLCUSDT: 'https://cryptocurrencyliveprices.com/img/rlc-iexec-rlc.png',
    WAVESUSDT: 'https://cryptocurrencyliveprices.com/img/waves-waves.png',
    MKRUSDT: 'https://cryptocurrencyliveprices.com/img/mkr-maker.png',
    SNXUSDT: 'https://cryptocurrencyliveprices.com/img/snx-synthetix-network-token.png',
    DOTUSDT: 'https://cryptocurrencyliveprices.com/img/dot-polkadot.png',
    DEFIUSDT: 'https://cryptocurrencyliveprices.com/img/dfi-defi-chain.png',
    YFIUSDT: 'https://cryptocurrencyliveprices.com/img/yfi-yearnfinance.png',
    BALUSDT: 'https://cryptocurrencyliveprices.com/img/bal-balancer.png',
    CRVUSDT: 'https://cryptocurrencyliveprices.com/img/crv-curve-dao-token.png',
    TRBUSDT: 'https://cryptocurrencyliveprices.com/img/trb-tellor.png',
    RUNEUSDT: 'https://cryptocurrencyliveprices.com/img/rune-thorchain.png',
    SUSHIUSDT: 'https://cryptocurrencyliveprices.com/img/sushi-sushi.png',
    SRMUSDT: 'https://cryptocurrencyliveprices.com/img/srm-serum.png',
    EGLDUSDT: 'https://cryptocurrencyliveprices.com/img/egld-elrond.png',
    SOLUSDT: 'https://cryptocurrencyliveprices.com/img/sol-solana.png',
    ICXUSDT: 'https://cryptocurrencyliveprices.com/img/icx-icon.png',
    STORJUSDT: 'https://cryptocurrencyliveprices.com/img/storj-storj.png',
    BLZUSDT: 'https://cryptocurrencyliveprices.com/img/blz-bluzelle.png',
    UNIUSDT: 'https://cryptocurrencyliveprices.com/img/uni-uniswap.png',
    AVAXUSDT: 'https://cryptocurrencyliveprices.com/img/avax-avalanche.png',
    FTMUSDT: 'https://cryptocurrencyliveprices.com/img/ftm-fantom.png',
    HNTUSDT: 'https://cryptocurrencyliveprices.com/img/hnt-helium.png',
    ENJUSDT: 'https://cryptocurrencyliveprices.com/img/enj-enjin-coin.png',
    FLMUSDT: 'https://img.bitgetimg.com/multiLang/coin_img/dc0d2b7bf60064c90e75c1aca90a1599.png',
    RENUSDT: 'https://cryptocurrencyliveprices.com/img/ren-republic-protocol.png',
    KSMUSDT: 'https://cryptocurrencyliveprices.com/img/ksm-kusama.png',
    NEARUSDT: 'https://cryptocurrencyliveprices.com/img/near-near-protocol.png',
    AAVEUSDT: 'https://cryptocurrencyliveprices.com/img/aave-new.png',
    FILUSDT: 'https://cryptocurrencyliveprices.com/img/fil-filecoin.png',
    RSRUSDT: 'https://cryptocurrencyliveprices.com/img/rsr-reserve-rights.png',
    LRCUSDT: 'https://cryptocurrencyliveprices.com/img/lrc-loopring.png',
    MATICUSDT: 'https://cryptocurrencyliveprices.com/img/matic-polygon.png',
    OCEANUSDT: 'https://cryptocurrencyliveprices.com/img/ocean-ocean-protocol.png',
    CVCUSDT: 'https://cryptocurrencyliveprices.com/img/cvc-civic.png',
    BELUSDT: 'https://cryptocurrencyliveprices.com/img/bel-bella-protocol.png',
    CTKUSDT: 'https://img.bitgetimg.com/multiLang/coin_img/f6eea7542836715625f99b87be13e30c.png',
    AXSUSDT: 'https://cryptocurrencyliveprices.com/img/axs-axie-infinity.png',
    ALPHAUSDT: 'https://cryptocurrencyliveprices.com/img/aqt-alpha-quark-token.png',
    ZENUSDT: 'https://cryptocurrencyliveprices.com/img/zen-horizen.png',
    SKLUSDT: 'https://cryptocurrencyliveprices.com/img/skl-skale.png',
    GRTUSDT: 'https://cryptocurrencyliveprices.com/img/grt-the-graph.png',
    '1INCHUSDT': 'https://cryptocurrencyliveprices.com/img/1inch-1inch.png',
    CHZUSDT: 'https://cryptocurrencyliveprices.com/img/chz-chiliz.png',
    SANDUSDT: 'https://cryptocurrencyliveprices.com/img/sand-the-sandbox.png',
    ANKRUSDT: 'https://cryptocurrencyliveprices.com/img/aeth-ankreth.png',
    BTSUSDT: 'https://cryptocurrencyliveprices.com/img/bts-bitshares.png',
    LITUSDT: 'https://cryptocurrencyliveprices.com/img/lit-litentry.png',
    UNFIUSDT: 'https://img.bitgetimg.com/multiLang/coin_img/4b7569d2e72cca748cb8ed90f69139a6.png',
    REEFUSDT: 'https://img.bitgetimg.com/multiLang/coin_img/5e1cf36deed8eafda0d0dc2e92803f25.png',
    RVNUSDT: 'https://img.bitgetimg.com/multiLang/coin_img/0abfbe25b5d47b7a22fc22055c2e7709.png',
    SFPUSDT: 'https://img.bitgetimg.com/multiLang/coin_img/e0832e6a06c343bc3fa4fe046dda91c4.png',
    XEMUSDT: 'https://cryptocurrencyliveprices.com/img/xem-nem.png',
    COTIUSDT: 'https://img.bitgetimg.com/multiLang/coin_img/7934aeed8521d9062db8f7e9ab54d4c5.png',
    CHRUSDT: 'https://img.bitgetimg.com/multiLang/coin_img/875bef0a7f335ff89cdabc3add80de1d.png',
    MANAUSDT: 'https://img.bitgetimg.com/multiLang/coin_img/cd763c2e0c325a78fea3fca37285f406.png',
    ALICEUSDT: 'https://img.bitgetimg.com/multiLang/coin_img/15fe1fcace84ce5e03ec56f2642c309a.png',
    HBARUSDT: 'https://img.bitgetimg.com/multiLang/coin_img/553deff53096c13ca493cfb1933fe30a.png',
    ONEUSDT: 'https://img.bitgetimg.com/multiLang/coin_img/1ba18adc6f33f9c8c4623f6bc0f294c0.png',
    LINAUSDT: 'https://img.bitgetimg.com/multiLang/coin_img/9af327036bc5f7a91986a549b40e320a.png',
    STMXUSDT: 'https://img.bitgetimg.com/multiLang/coin_img/ee5c0e6be0311f17afd2d514f131e7a0.png',
    DENTUSDT: 'https://img.bitgetimg.com/multiLang/coin_img/c065832f3896abcbad6c12d8e012557c.png',
    CELRUSDT: 'https://img.bitgetimg.com/multiLang/coin_img/f44646d81b9c116191dc59868910b57d.png',
    HOTUSDT: 'https://img.bitgetimg.com/multiLang/coin_img/ba6ea42d3034ad90e4fe808a1385043d.png',
    MTLUSDT: 'https://cryptocurrencyliveprices.com/img/mtl-metal.png',
    OGNUSDT: 'https://img.bitgetimg.com/multiLang/coin_img/83eae60e3c3a53c19d00d9450b581454.png',
    NKNUSDT: 'https://img.bitgetimg.com/multiLang/coin_img/41686d936b0dfd15dc258a75259208bb.png',
    SCUSDT: 'https://cryptocurrencyliveprices.com/img/sc-siacoin.png',
    DGBUSDT: 'https://cryptocurrencyliveprices.com/img/dgb-digibyte.png',
    '1000SHIBUSDT': 'https://cryptocurrencyliveprices.com/img/shib-shiba-inu.png',
    BAKEUSDT: 'https://img.bitgetimg.com/multiLang/coin_img/435824331da733be961398bede3b8b4e.png',
    GTCUSDT: 'https://img.bitgetimg.com/multiLang/coin_img/7a5c14786fce527bd6d720e79aca3582.png',
    IOTXUSDT: 'https://cryptocurrencyliveprices.com/img/iotx-iotex.png',
    AUDIOUSDT: 'https://cryptocurrencyliveprices.com/img/audio-audius.png',
    RAYUSDT: 'https://cryptocurrencyliveprices.com/img/ray-raydium.png',
    C98USDT: 'https://cryptocurrencyliveprices.com/img/c98-coin98.png',
    MASKUSDT: 'https://cryptocurrencyliveprices.com/img/mask-mask-network.png',
    ATAUSDT: 'https://cryptocurrencyliveprices.com/img/ata-automata.png',
    DYDXUSDT: 'https://cryptocurrencyliveprices.com/img/dydx-dydx.png',
    '1000XECUSDT': 'https://cryptocurrencyliveprices.com/img/xec-ecash.png',
    GALAUSDT: 'https://cryptocurrencyliveprices.com/img/gala-gala.png',
    CELOUSDT: 'https://cryptocurrencyliveprices.com/img/celo-celo.png',
    ARUSDT: 'https://cryptocurrencyliveprices.com/img/ar-arweave.png',
    KLAYUSDT: 'https://cryptocurrencyliveprices.com/img/klay-klaytn.png',
    ARPAUSDT: 'https://cryptocurrencyliveprices.com/img/arpa-arpa-chain.png',
    CTSIUSDT: 'https://cryptocurrencyliveprices.com/img/ctsi-cartesi.png',
    LPTUSDT: 'https://cryptocurrencyliveprices.com/img/lpt-livepeer.png',
    ENSUSDT: 'https://img.bitgetimg.com/multiLang/coin_img/6274b5d8101d1cbfc65b7bd8e4d140f9.png',
    PEOPLEUSDT: 'https://cryptocurrencyliveprices.com/img/people-constitutiondao.png',
    ANTUSDT: 'https://cryptocurrencyliveprices.com/img/ant-aragon.png',
    ROSEUSDT: 'https://cryptocurrencyliveprices.com/img/rose-oasis-network.png',
    DUSKUSDT: 'https://cryptocurrencyliveprices.com/img/dusk-dusk-network.png',
    FLOWUSDT: 'https://cryptocurrencyliveprices.com/img/flow-flow.png',
    IMXUSDT: 'https://cryptocurrencyliveprices.com/img/imx-immutable-x.png',
    API3USDT: 'https://cryptocurrencyliveprices.com/img/api3-api3.png',
    GMTUSDT: 'https://img.bitgetimg.com/multiLang/coin_img/473817d242c11bc8896655d23c0461ba.png',
    APEUSDT: 'https://img.bitgetimg.com/multiLang/coin_img/eb3990f9c5a17e93f87e9342c6e0dff3.png',
    WOOUSDT: 'https://img.bitgetimg.com/multiLang/coin_img/206240444d79cdca49717bb03509438f.png',
    FTTUSDT: 'https://cryptocurrencyliveprices.com/img/ftt-ftx-token.png',
    JASMYUSDT: 'https://img.bitgetimg.com/multiLang/coin_img/9fd0dc33922268c2ce7ae884401af2b1.png',
    DARUSDT: 'https://img.bitgetimg.com/multiLang/coin_img/dce82b01cd1f7384654d8ac6349ccbf5.png',
    GALUSDT: 'https://img.bitgetimg.com/multiLang/coin_img/6c2355d5c5702057edf866fde30111ad.png',
    OPUSDT: 'https://img.bitgetimg.com/multiLang/coin_img/c40677440287c9b374967d456ea60336.png',
    STGUSDT: 'https://img.bitgetimg.com/multiLang/coin_img/80918de915b3a2f9f526b3f66c02e921.png',
    FOOTBALLUSDT: 'https://bin.bnbstatic.com/static/futures-header/default-icon.png',
    SPELLUSDT: 'https://img.bitgetimg.com/multiLang/coin_img/85cec66431d362c154bf19ab85094828.png',
    '1000LUNCUSDT': 'https://img.bitgetimg.com/multiLang/coin_img/5f596e3c04aca52c8c54fab70c0c1319.png',
    LUNA2USDT: 'https://img.bitgetimg.com/multiLang/coin_img/c842d4506668a8d752835000f4eb08a4.png',
    LDOUSDT: 'https://img.bitgetimg.com/multiLang/coin_img/b7a4f07edd5ebd349cba7cd887bcfcb1.png',
    CVXUSDT: 'https://img.bitgetimg.com/multiLang/coin_img/d6cdb901ec4e1a9e00edc29058841652.png',
    ICPUSDT: 'https://img.bitgetimg.com/multiLang/coin_img/a41ba7b6252501a5c5c30c5fede426c0.png',
    APTUSDT: 'https://img.bitgetimg.com/multiLang/coin_img/45c064ecb09d0a49d6b4ea7af22fcc6b.png',
    QNTUSDT: 'https://img.bitgetimg.com/multiLang/coin_img/b6fcb1208c978b054422573177396503.png',
    BLUEBIRDUSDT: 'https://bin.bnbstatic.com/static/futures-header/default-icon.png',
    FETUSDT: 'https://cryptocurrencyliveprices.com/img/fetch-ai.png',
    FXSUSDT: 'https://cryptocurrencyliveprices.com/img/fxs-frax-share.png',
    HOOKUSDT: 'https://cryptocurrencyliveprices.com/img/hook-hooked-protocol.png',
    MAGICUSDT: 'https://img.bitgetimg.com/multiLang/coin_img/68e40f898bf3e034c924d1785c004375.png',
    TUSDT: 'https://cryptocurrencyliveprices.com/img/tusd-trueusd.png',
    RNDRUSDT: 'https://cryptocurrencyliveprices.com/img/rndr-render-token.png',
    HIGHUSDT: 'https://img.bitgetimg.com/multiLang/coin_img/26a2c56ae3686bdd22f18e9c87f29936.png',
    MINAUSDT: 'https://img.bitgetimg.com/multiLang/coin_img/26a2c56ae3686bdd22f18e9c87f29936.png',
    ASTRUSDT: 'https://img.bitgetimg.com/multiLang/coin_img/68caccd0879ff04edf17070cc269f47c.png',
    AGIXUSDT: 'https://img.bitgetimg.com/multiLang/coin_img/57f8f39bfcf22246398e907da7a31c9f.png',
    PHBUSDT: 'https://img.bitgetimg.com/multiLang/coin_img/e7615a1bd7778e39e3e519dcca6fd108.png',
    GMXUSDT: 'https://img.bitgetimg.com/multiLang/coin_img/a91484ebcb6cfc9ec7f2753e9e23767c.png',
    CFXUSDT: 'https://img.bitgetimg.com/multiLang/coin_img/a91484ebcb6cfc9ec7f2753e9e23767c.png',
    STXUSDT: 'https://img.bitgetimg.com/multiLang/coin_img/5cd0164df8b8280d3ebe493d30e90c56.png',
    COCOSUSDT: 'https://bin.bnbstatic.com/static/futures-header/default-icon.png',
    BNXUSDT: 'https://img.bitgetimg.com/multiLang/coin_img/a2c4f4f443bb590e2c6a870bfa73fc0e.png',
    ACHUSDT: 'https://img.bitgetimg.com/multiLang/coin_img/1e8f66894c5f6b9ef02b612f5a1169e2.png',
    SSVUSDT: 'https://img.bitgetimg.com/multiLang/coin_img/09bb60549d2e1f7205495c7a3b22e807.png',
    CKBUSDT: 'https://img.bitgetimg.com/multiLang/coin_img/a676cc4b052941238c3a9f3c90038cfe.png',
    PERPUSDT: 'https://cryptocurrencyliveprices.com/img/perp-perpetual-protocol.png',
    TRUUSDT: 'https://cryptocurrencyliveprices.com/img/tru-truefi.png',
    LQTYUSDT: 'https://img.bitgetimg.com/multiLang/coin_img/37fa9eed18691faaca384386e6e70fea.png',
    IDUSDT: 'https://img.bitgetimg.com/multiLang/coin_img/cc7e02d171662fcd042e014263de370c.png',
    ARBUSDT: 'https://img.bitgetimg.com/multiLang/coin_img/67ea3fc769c765901d6c2dfc32d9c012.png',
    JOEUSDT: 'https://img.bitgetimg.com/multiLang/coin_img/500d2144979537ad707e4968809d588c.png',
    TLMUSDT: 'https://img.bitgetimg.com/multiLang/coin_img/f07e4e5691ab9f4a778ae8f3d7c4aff0.png',
    AMBUSDT: 'https://img.bitgetimg.com/multiLang/coin_img/c13cee2bbe3d33e173baa3aa60c3efdc.png',
    LEVERUSDT: 'https://img.bitgetimg.com/multiLang/coin_img/acd1d9810a31ada308be8acb7a7fca04.png',
    RDNTUSDT: 'https://img.bitgetimg.com/multiLang/coin_img/c32a7f629cc3967d66252b68d80fe0a6.png',
    HFTUSDT: 'https://img.bitgetimg.com/multiLang/coin_img/118a103e82bb1fcc8e2b07e8f46584e6.png',
    XVSUSDT: 'https://cryptocurrencyliveprices.com/img/xvs-venus.png',
    BLURUSDT: 'https://cryptocurrencyliveprices.com/img/blur-blur.png',
    EDUUSDT: 'https://img.bitgetimg.com/multiLang/coin_img/6e05915668bb3114ff2f6abdf71011a5.png',
    IDEXUSDT: 'https://img.bitgetimg.com/multiLang/coin_img/0a4fbdc96b2fd804db5f9af841f55be9.png',
    SUIUSDT: 'https://img.bitgetimg.com/multiLang/coin_img/bd552d3880bfc15d1c3900b33802a15f.png',
    '1000PEPEUSDT': 'https://img.bitgetimg.com/multiLang/coin_img/2ff7f38071e2127494c5f2001d5f4513.png',
    '1000FLOKIUSDT': 'https://img.bitgetimg.com/multiLang/coin_img/af1d427e8d570ff1f535029ca9a38de7.png',
    UMAUSDT: 'https://img.bitgetimg.com/multiLang/coin_img/f05ed190096bc040c30e27b077500374.png',
    RADUSDT: 'https://img.bitgetimg.com/multiLang/coin_img/1e61c4258b615844b614a2af4c806d3b.png',
    KEYUSDT: 'https://img.bitgetimg.com/multiLang/coin_img/3781df62ac3658707fc7f72df22b2ede.png',
    COMBOUSDT: 'https://img.bitgetimg.com/multiLang/coin_img/4a615efbc8f53881167bfaf52d9f2c43.png',
    NMRUSDT: 'https://cryptocurrencyliveprices.com/img/nmr-numeraire.png',
    MAVUSDT: 'https://cryptocurrencyliveprices.com/img/mav-maverick-token.png',
    MDTUSDT: 'https://cryptocurrencyliveprices.com/img/mdt-measurable-data-token.png',
    XVGUSDT: 'https://cryptocurrencyliveprices.com/img/xvg-verge.png',
    WLDUSDT: 'https://cryptocurrencyliveprices.com/img/wld-worldcoin.png',
    PENDLEUSDT: 'https://cryptocurrencyliveprices.com/img/pendle-pendle.png',
    ARKMUSDT: 'https://img.bitgetimg.com/multiLang/coin_img/76f0eb710c04e1a3eb9da956bacf22e7.png',
    AGLDUSDT: 'https://img.bitgetimg.com/multiLang/coin_img/a24ad3cd0ae4439d57d2e34ad9370703.png',
    YGGUSDT: 'https://img.bitgetimg.com/multiLang/coin_img/f844c94d3d709f592a84425ef307426c.png',
    DODOXUSDT: 'https://bin.bnbstatic.com/static/futures-header/default-icon.png',
    BNTUSDT: 'https://cryptocurrencyliveprices.com/img/bnt-bancor.png',
    OXTUSDT: 'https://bin.bnbstatic.com/static/futures-header/default-icon.png',
    SEIUSDT: 'https://img.bitgetimg.com/multiLang/coin_img/e3a07cec209d25614bbeb76a29d007fc.png',
    CYBERUSDT: 'https://img.bitgetimg.com/multiLang/coin_img/ed3edbb5cdd510a47bf4828c2ec3555c.png',
    HIFIUSDT: 'https://cryptocurrencyliveprices.com/img/hifi-hifi-finance.png',
    ARKUSDT: 'https://cryptocurrencyliveprices.com/img/ark-ark.png',
    FRONTUSDT: 'https://bin.bnbstatic.com/static/futures-header/default-icon.png',
    GLMRUSDT: 'https://img.bitgetimg.com/multiLang/coin_img/c599f49bd602b73a39f0c5aa09650136.png',
    BICOUSDT: 'https://bin.bnbstatic.com/static/futures-header/default-icon.png',
    STRAXUSDT: 'https://cryptocurrencyliveprices.com/img/strax-stratis.png',
    LOOMUSDT: 'https://cryptocurrencyliveprices.com/img/loom-loom-network.png',
    BIGTIMEUSDT: 'https://img.bitgetimg.com/multiLang/coin_img/7518de5e5f68c26c107cbe339a3d044d.jpeg',
    BONDUSDT: 'https://bin.bnbstatic.com/static/futures-header/default-icon.png',
    ORBSUSDT: 'https://bin.bnbstatic.com/static/futures-header/default-icon.png',
    STPTUSDT: 'https://cryptocurrencyliveprices.com/img/stpt-stpt.png',
    WAXPUSDT: 'https://cryptocurrencyliveprices.com/img/wax-wax.png',
    BSVUSDT: 'https://cryptocurrencyliveprices.com/img/bsv-bitcoin-sv.png',
    RIFUSDT: 'https://cryptocurrencyliveprices.com/img/rif-rif-token.png',
    POLYXUSDT: 'https://cryptocurrencyliveprices.com/img/polyx-polymesh.png',
    GASUSDT: 'https://cryptocurrencyliveprices.com/img/gas-gas.png',
    POWRUSDT: 'https://cryptocurrencyliveprices.com/img/powr-power-ledger.png',
    SLPUSDT: 'https://cryptocurrencyliveprices.com/img/slp-smooth-love-potion.png',
    TIAUSDT: 'https://cryptocurrencyliveprices.com/img/tia-celestia.png',
    SNTUSDT: 'https://cryptocurrencyliveprices.com/img/snt-status.png',
    CAKEUSDT: 'https://cryptocurrencyliveprices.com/img/cake-pancakeswap.png',
    MEMEUSDT: 'https://cryptocurrencyliveprices.com/img/meme-memecoin.png',
    TWTUSDT: 'https://cryptocurrencyliveprices.com/img/twt-trust-wallet-token.png',
    TOKENUSDT: 'https://cryptocurrencyliveprices.com/img/tpt-token-pocket.png',
    ORDIUSDT: 'https://cryptocurrencyliveprices.com/img/ordi-ordinals.png',
    STEEMUSDT: 'https://cryptocurrencyliveprices.com/img/steem-steem.png',
    BADGERUSDT: 'https://cryptocurrencyliveprices.com/img/badger-badger.png',
    ILVUSDT: 'https://cryptocurrencyliveprices.com/img/ilv-illuvium.png',
    NTRNUSDT: 'https://bin.bnbstatic.com/static/futures-header/default-icon.png',
    MBLUSDT: 'https://cryptocurrencyliveprices.com/img/mbl-moviebloc.png',
    KASUSDT: 'https://cryptocurrencyliveprices.com/img/kas-kaspa.png',
    BEAMXUSDT: 'https://bin.bnbstatic.com/static/futures-header/default-icon.png',
    '1000BONKUSDT': 'https://cryptocurrencyliveprices.com/img/bonk-bonk.png',
    PYTHUSDT: 'https://cryptocurrencyliveprices.com/img/pyth-pyth-network.png',
    SUPERUSDT: 'https://cryptocurrencyliveprices.com/img/super-superfarm.png',
    USTCUSDT: 'https://cryptocurrencyliveprices.com/img/ust-terrausd.png',
    ONGUSDT: 'https://cryptocurrencyliveprices.com/img/omg-omg-network.png',
    ETHWUSDT: 'https://cryptocurrencyliveprices.com/img/ethw-ethereum-pow.png'
}
const StyledLink = styled.a`
    display:flex;
    text-decoration: none;
    width:100%;
    
`;



function StrongList() {
    const [tokenList, setTokenList] = useState([]);

    useEffect(() => {
        // Fetch data from the API
        //fetch("http://localhost:5000/api/1.0/getStrongCoin")
        fetch("http://52.63.5.206:5000/api/1.0/getStrongCoin")
            .then(response => response.json())
            .then((data) => {
                // Process API response
                console.log(data)
                let temp = data.map(item => `${item.symbol}USDT`);
                setTokenList(temp);
            })
            .catch(error => console.error("Error fetching data:", error));
    }, []);

    return (
        <div>
            <StyledTitle>每日強勢標的</StyledTitle>
            <StyledListContainer>
                <ItemContainer>
                    <StyledList>
                        {tokenList.map((token, index) => (
                            <StyledItem key={index}>
                                {/* 使用 StyledLink 元素包裹內容 */}
                                <StyledLink href={`https://tw.tradingview.com/chart/?symbol=BINANCE%3A${token}.P`} target="_blank" rel="noopener noreferrer">
                                    <StyledPic src={CoinIcon[token]}></StyledPic>
                                    <StyledCoinName>{token}</StyledCoinName>
                                </StyledLink>
                            </StyledItem>
                        ))}
                    </StyledList>
                </ItemContainer>
            </StyledListContainer>
        </div>
    );
}

export default StrongList;
