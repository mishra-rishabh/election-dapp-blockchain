// SPDX-License-Identifier: GPL-3.0

pragma solidity >= 0.5.0 <= 0.9.0 ;

contract Election {
    
    // struct candidate
    struct Candidate {
        uint id ;
        string name ;
        uint voteCount ;
    }
    
    // candidate count
    uint public candidateCount ;

    // mapping to access each candidate
    mapping( uint => Candidate ) public candidates ;
    
    // mapping to identify that person hasn't voted again
    mapping( address => bool ) public votedOrNot ;

    // constructor
    constructor() {
        addCandidate( "Narendra Modi" ) ;
        addCandidate( "Mamta Banerjee" ) ;
    }
    
    // event to be shown in ui
    event electionUpdate( uint indexed id , string name , uint voteCount ) ;
    
    // add candidates
    function addCandidate( string memory name ) private {
        candidateCount++ ;
        candidates[ candidateCount ] = Candidate( candidateCount , name , 0 ) ;
    }
    
    // cast vote
    function Vote( uint _id ) public {
        
        // if the condition is not met then 2nd parameter will be shown
        require( !votedOrNot[ msg.sender ] , "You have already casted your vote!" ) ;
    
        // if the condition is not met then 2nd parameter will be shown
        require( candidates[ _id ].id != 0 , "ID doesn't exist!" ) ;
        
        // increase the voteCount of the candidate and set it to false
        candidates[ _id ].voteCount += 1 ;

        // record that voter has voted
        votedOrNot[ msg.sender ] = true ;
        
        // emit the event
        emit electionUpdate( _id , candidates[ _id ].name , candidates[ _id ].voteCount ) ; 
    }
}