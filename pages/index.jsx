import abi from '../utils/BuyMeACoffee.json';
import { ethers } from "ethers";
import Head from 'next/head'
import React, { useEffect, useState } from "react";
import styles from '../styles/Home.module.css';
import Image from 'next/image';


export default function Home() {
  // Contract Address & ABI
  const contractAddress = "to be added";
  const contractABI = abi.abi;

  // Component state
  const [currentAccount, setCurrentAccount] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [memos, setMemos] = useState([]);

  const onNameChange = (event) => {
    setName(event.target.value);
  }

  const onMessageChange = (event) => {
    setMessage(event.target.value);
  }

  // Wallet connection logic
  const isWalletConnected = async () => {
    try {
      const { ethereum } = window;

      const accounts = await ethereum.request({method: 'eth_accounts'})
      console.log("accounts: ", accounts);

      if (accounts.length > 0) {
        const account = accounts[0];
        console.log("wallet is connected! " + account);
      } else {
        console.log("make sure MetaMask is connected");
      }
    } catch (error) {
      console.log("error: ", error);
    }
  }

  const connectWallet = async () => {
    try {
      const {ethereum} = window;

      if (!ethereum) {
        console.log("please install MetaMask");
      }

      const accounts = await ethereum.request({
        method: 'eth_requestAccounts'
      });

      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  }

  const buyCoffee = async () => {
    try {
      const {ethereum} = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum, "any");
        const signer = provider.getSigner();
        const buyMeACoffee = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );

        console.log("buying coffee..")
        const coffeeTxn = await buyMeACoffee.buyCoffee(
          name ? name : "anon",
          message ? message : "Enjoy your coffee!",
          {value: ethers.utils.parseEther("0.001")}
        );

        await coffeeTxn.wait();

        console.log("mined ", coffeeTxn.hash);

        console.log("Art Received!");

        // Clear the form fields.
        setName("");
        setMessage("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Function to fetch all memos stored on-chain.
  const getMemos = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const buyMeACoffee = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );
        
        console.log("fetching memos from the blockchain..");
        const memos = await buyMeACoffee.getMemos();
        console.log("fetched!");
        setMemos(memos);
      } else {
        console.log("Metamask is not connected");
      }
      
    } catch (error) {
      console.log(error);
    }
  };
  
  useEffect(() => {
    let buyMeACoffee;
    isWalletConnected();
    getMemos();

    // Create an event handler function for when someone sends
    // us a new memo.
    const onNewMemo = (from, timestamp, name, message) => {
      console.log("Memo received: ", from, timestamp, name, message);
      setMemos((prevState) => [
        ...prevState,
        {
          address: from,
          timestamp: new Date(timestamp * 1000),
          message,
          name
        }
      ]);
    };

    const {ethereum} = window;

    // Listen for new memo events.
    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum, "any");
      const signer = provider.getSigner();
      buyMeACoffee = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );

      buyMeACoffee.on("NewMemo", onNewMemo);
    }

    return () => {
      if (buyMeACoffee) {
        buyMeACoffee.off("NewMemo", onNewMemo);
      }
    }
  }, [contractAddress, contractABI]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Jamie&apos;s Art</title>
        <meta name="description" content="Tipping site" />
        <link rel="icon" href="/IMG_2757.JPG" />
      </Head>  

      <div className={styles.container}>
        <main className={styles.main}>
          <h2 className={styles.title}>About Jamie</h2>
          <p style={{ maxWidth: '600px', textAlign: 'center' }}>
            Jamie is an artist creating physical pieces that 
            will be transformed into digital art for collectors to purchase. Each digital art piece is one-of-a-kind, and only one version will be available for purchase.
          </p>
          <h2 className={styles.title} style={{ marginTop: '20px', textAlign: 'center' }}>
            A few examples 
          </h2>
        </main>
        
        
        <div>
          <picture>
            <Image
              src="/image5.jpeg"
              alt="Landscape picture"
              width={350}
              height={500}
              style={{ marginRight: '30px' }} 
            />
          </picture>
        </div>
        <div>
          <picture>
            <Image
              src="/image2.jpeg"
              alt="Landscape picture"
              width={350}
              height={500}
              style={{ marginRight: '30px' }} 
            />
          </picture>
          <picture>
            <Image
              src="/image3.jpeg"
              alt="Landscape picture"
              width={350}
              height={500}
              style={{ marginRight: '30px' }} 
            />
          </picture>
          <picture>
            <Image
              src="/image4.jpeg"
              alt="Landscape picture"
              width={350}
              height={500}
              style={{ marginRight: '30px' }} 
            />
          </picture>
        </div>
        <div>
          <picture>
            <Image
              src="/image0.jpeg"
              alt="Landscape picture"
              width={350}
              height={500}
              style={{ marginRight: '30px' }} 
            />
          </picture>
          <picture>
            <Image
              src="/image1.jpeg"
              alt="Landscape picture"
              width={350}
              height={500}
              style={{ marginRight: '30px' }} 
            />
          </picture>
          <picture>
            <Image
              src="/IMG_2756.JPG"
              alt="Landscape picture"
              width={350}
              height={500}
              style={{ marginRight: '30px' }} 
            />
          </picture>
        </div>
        <div> 
          <picture>
            <Image
              src="/IMG_2755.JPG"
              alt="Landscape picture"
              width={350}
              height={500}
              style={{ marginRight: '30px' }} 
            />
          </picture>
          <picture>
            <Image
              src="/IMG_2757.JPG"
              alt="Landscape picture"
              width={350}
              height={500}
              style={{ marginRight: '30px' }} 
            />
          </picture>
          <picture>
            <Image
              src="/IMG_2766.JPG"
              alt="Landscape picture"
              width={350}
              height={500}
              style={{ marginRight: '30px' }} 
            />
          </picture>
        </div>

        <h1 className={styles.title} style={{ marginTop: '20px', marginBottom: '40px', textAlign: 'center' }}>Future Art</h1>

        <div>
          <picture>
            <Image
              src="/IMG_2761.JPG"
              alt="Landscape picture"
              width={350}
              height={500}
              style={{ marginRight: '30px' }} 
            />
          </picture>
          <picture>
            <Image
              src="/IMG_2759.JPG"
              alt="Landscape picture"
              width={350}
              height={500}
              style={{ marginRight: '30px' }} 
            />
          </picture>
          <picture>
            <Image
              src="/IMG_2768.JPG"
              alt="Landscape picture"
              width={350}
              height={500}
              style={{ marginRight: '30px' }} 
            />
          </picture>
        </div>

        <div>
          <picture>
            <Image
              src="/IMG_2769.JPG"
              alt="Landscape picture"
              width={350}
              height={500}
              style={{ marginRight: '30px' }} 
            />
          </picture>
          <picture>
            <Image
              src="/IMG_2764.JPG"
              alt="Landscape picture"
              width={350}
              height={500}
              style={{ marginRight: '30px' }} 
            />
          </picture>
          <picture>
            <Image
              src="/IMG_2772.JPG"
              alt="Landscape picture"
              width={350}
              height={500}
              style={{ marginRight: '30px' }} 
            />
          </picture>
        </div>


        {currentAccount && (<h1>Memos received</h1>)}

        {currentAccount && (memos.map((memo, idx) => {
          return (
            <div key={idx} style={{border:"2px solid", "border-radius":"5px", padding: "5px", margin: "5px"}}>
              <p style={{fontWeight:"bold"}}>{memo.message}</p>
              <p>From: {memo.name} at {memo.timestamp.toString()}</p>
            </div>
          )
        }))}


        <h2 className={styles.title} style={{ marginTop: '100px', marginBottom: '20px',  textAlign: 'center' }}>
          If you&apos;d like, you can donate to Jamie&apos;s art fund below.
        </h2>

        <div style={{ marginBottom: '100px', textAlign: 'center' }} >
          {currentAccount ? (
            <div>
              <form>
                <div className="formgroup">
                  <label>
                    Name
                  </label>
                  <br/>
                  
                  <input
                    id="name"
                    type="text"
                    placeholder="anon"
                    onChange={onNameChange}
                    />
                </div>
                <br/>
                <div className="formgroup">
                  <label>
                    Send Jamie a message
                  </label>
                  <br/>

                  <textarea
                    rows={3}
                    placeholder="Enjoy your vape!"
                    id="message"
                    onChange={onMessageChange}
                    required
                  >
                  </textarea>
                </div>
                <div>
                  <button
                    type="button"
                    onClick={buyCoffee}
                  >
                    Send 0.001ETH For Vape
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <button onClick={connectWallet}> Connect Wallet</button>
          )}
        </div>  

        <footer className={styles.footer}>
          <a
            href="https://twitter.com/enjoy_weaver"
            target="_blank"
            rel="noopener noreferrer"
          >
            Created by @enjoyweaver
          </a>
        </footer>
      </div>
    </div>
  )
}
