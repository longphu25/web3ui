import { useEffect } from 'react'
import CodePage from './components/CodePage'

// let providersArray: ProvidersArray
// if (import.meta.env.VITE_ALGOD_NETWORK === '') {
//   const kmdConfig = getKmdConfigFromViteEnvironment()
//   providersArray = [
//     {
//       id: PROVIDER_ID.KMD,
//       clientOptions: {
//         wallet: kmdConfig.wallet,
//         password: kmdConfig.password,
//         host: kmdConfig.server,
//         token: String(kmdConfig.token),
//         port: String(kmdConfig.port),
//       },
//     },
//   ]
// } else {
//   providersArray = [
//     { id: PROVIDER_ID.DEFLY, clientStatic: DeflyWalletConnect },
//     { id: PROVIDER_ID.PERA, clientStatic: PeraWalletConnect },
//     { id: PROVIDER_ID.DAFFI, clientStatic: DaffiWalletConnect },
//     { id: PROVIDER_ID.EXODUS },
//     // If you are interested in WalletConnect v2 provider
//     // refer to https://github.com/TxnLab/use-wallet for detailed integration instructions
//   ]
// }

export default function App() {
  // const [openWalletModal, setOpenWalletModal] = useState<boolean>(false)
  // const [openDemoModal, setOpenDemoModal] = useState<boolean>(false)
  // const { activeAddress } = useWallet()
  // const toggleWalletModal = () => {
  //   setOpenWalletModal(!openWalletModal)
  // }

  // const toggleDemoModal = () => {
  //   setOpenDemoModal(!openDemoModal)
  // }

  // const algodConfig = getAlgodConfigFromViteEnvironment()

  // const walletProviders = useInitializeProviders({
  //   providers: providersArray,
  //   nodeConfig: {
  //     network: algodConfig.network,
  //     nodeServer: algodConfig.server,
  //     nodePort: String(algodConfig.port),
  //     nodeToken: String(algodConfig.token),
  //   },
  //   algosdkStatic: algosdk,
  // })

  // const onChange = (action: string, data: string): void => {
  //   switch (action) {
  //     case 'code': {
  //       setCode(data)
  //       break
  //     }
  //     default: {
  //       console.warn('case not handled!', action, data)
  //     }
  //   }
  // }

  // const onChangeTest = (action: string, data: string): void => {
  //   switch (action) {
  //     case 'code': {
  //       setCodeTest(data)
  //       break
  //     }
  //     default: {
  //       console.warn('case not handled!', action, data)
  //     }
  //   }
  // }

  useEffect(() => {
    // defineTheme('dracula').then(() => setTheme({ value: 'dracula', label: 'Dracula' }))
  }, [])

  return (
    // <SnackbarProvider maxSnack={3}>
    //   <WalletProvider value={walletProviders}>
    //     <div className="hero min-h-screen bg-teal-400">
    //       <div className="hero-content text-center rounded-lg p-6 max-w-md bg-white mx-auto">
    //         <div className="max-w-md">
    //           <h1 className="text-4xl">
    //             Welcome to <div className="font-bold">AlgoKit 🙂</div>
    //           </h1>
    //           <p className="py-6">
    //             This starter has been generated using official AlgoKit React template. Refer to the resource below for next steps.
    //           </p>

    //           <div className="grid">
    //             <a
    //               data-test-id="getting-started"
    //               className="btn btn-primary m-2"
    //               target="_blank"
    //               href="https://github.com/algorandfoundation/algokit-cli"
    //             >
    //               Getting started
    //             </a>

    //             <div className="divider" />
    //             <button data-test-id="connect-wallet" className="btn m-2" onClick={toggleWalletModal}>
    //               Wallet Connection
    //             </button>

    //             {activeAddress && (
    //               <button data-test-id="transactions-demo" className="btn m-2" onClick={toggleDemoModal}>
    //                 Transactions Demo
    //               </button>
    //             )}
    //           </div>

    //           <ConnectWallet openModal={openWalletModal} closeModal={toggleWalletModal} />
    //           <Transact openModal={openDemoModal} setModalState={setOpenDemoModal} />
    //         </div>
    //       </div>
    //     </div>
    //   </WalletProvider>
    // </SnackbarProvider>
    <CodePage />
  )
}
