import React , { useEffect , useState } from 'react' ;
import Web3 from 'web3' ;
import './App.css';
import ElectionAbi from './contracts/Election.json' ;
import Navbar from './Navbar' ;
import Body from './Body' ;

function App() {

  // act as a constructor
  useEffect( () => {
    loadWeb3() ;
    loadBlockchainData() ;
  } , [] ) ;

  // state variable with type string
  const [ currentAccount , setCurrentAccount ] = useState( "" ) ;  
  const [ loader , setLoader ] = useState( true ) ;
  const [ ElectionSM , setElectionSM ] = useState() ;
  const [ Candidate1 , setCandidate1 ] = useState() ;
  const [ Candidate2 , setCandidate2 ] = useState() ;

  // code to interact with web3
  const loadWeb3 = async() => {
    if( window.ethereum ) {
      window.web3 = new Web3( window.ethereum ) ;
      await window.ethereum.enable() ;
    }
    else if( window.web3 ) {
      window.web3 = new Web3( window.web3.currentProvider ) ;
    }
    else {
      window.alert( "Non-ethereum browser detected. You should consider trying Metamask" ) ;
    }
  } ;

  const loadBlockchainData = async() => {
    
    setLoader( true ) ;
    // access Web3
    const web3 = window.web3 ;

    // fetch all accounts
    const accounts = await web3.eth.getAccounts() ;
    const account = accounts[ 0 ] ;
    setCurrentAccount( account ) ;

    // fetch the network id
    const networkId = await web3.eth.net.getId() ;

    const networkData = ElectionAbi.networks[ networkId ] ;

    if( networkData ) {
      // define a smart contract so that we can interact with it
      const election = new web3.eth.Contract( ElectionAbi.abi , networkData.address ) ;

      // fetch the candidates from smart contract. here candidates is a mapping from Election.sol
      // mapping is a viewable function that's why we have used call()
      // because it doesn't require any gas for the transaction
      const candidate_1 = await election.methods.candidates( 1 ).call() ; 
      const candidate_2 = await election.methods.candidates( 2 ).call() ;
      
      // extra details to be fetched
      // const candidate_1_Id = candidate_1.id ;
      // const candidate_2_Id = candidate_2.id ;

      // const candidate_1_Name = candidate_1.name ;
      // const candidate_2_Name = candidate_2.name ;

      // const candidate_1_VoteCount = candidate_1.voteCount ;
      // const candidate_2_VoteCount = candidate_2.voteCount ;

      // console.log( candidate_1_Id ) ;
      // console.log( candidate_2_Id ) ;
      // console.log( candidate_1_Name ) ;
      // console.log( candidate_2_Name ) ;
      // console.log( candidate_1_VoteCount ) ;
      // console.log( candidate_2_VoteCount ) ;

      setCandidate1( candidate_1 ) ;
      setCandidate2( candidate_2 ) ;
      setElectionSM( election ) ;

      // console.log( election ) ;
      
      setLoader( false ) ;
    }
    else {
      window.alert( "The smart contract is not deployed on the current network!!" ) ;
    }
  }

  // function which will call the Vote() of Election.sol
  const voteCandidate = async( candidateId ) => {
    setLoader( true ) ;
    await ElectionSM.methods
    .Vote( candidateId )
    .send( { from: currentAccount } )
    .on( 'transactionhash' , () => {
      console.log( "Successfully ran" ) ;
    } )

    setLoader( false ) ;
  } 

  if( loader ) {
    return <div>loading...</div>
  }

  return (
    <div>
      <Navbar account={ currentAccount }/>
      <Body candi1={ Candidate1 } candi2={ Candidate2 } voteCandidate={ voteCandidate } acc={ currentAccount }/>      
    </div>
  );
}

export default App;
