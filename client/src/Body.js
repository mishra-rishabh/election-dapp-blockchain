import React, { useState } from 'react';

const Body = ({ candi1, candi2, voteCandidate , acc }) => {

  const [Candidate, setCandidate] = useState("");

  // onchange function which is called below in the select element
  const onchange = (e) => {
    setCandidate(e.target.value)
  };

  // onsubmit function which is called below in the form element
  const onsubmit = ( e ) => {
    e.preventDefault() ;

    if( Candidate.id !== 0 ) {
      voteCandidate( Number( Candidate ) ) ;
    }
    else {
      window.alert( "Error in casting vote!!" ) ;
    }
  };

  return (
    <div>
      <h1 className="display-1 text-center">Election Results</h1>

      <table className="table table-dark table-striped text-center mx-auto" style={{ width: "90%" }}>
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Candidate Name</th>
            <th scope="col">Vote Count</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">{candi1.id}</th>
            <td>{candi1.name}</td>
            <td>{candi1.voteCount}</td>
          </tr>
          <tr>
            <th scope="row">{candi2.id}</th>
            <td>{candi2.name}</td>
            <td>{candi2.voteCount}</td>
          </tr>
        </tbody>
      </table>

      <div className="my-5 text-left mx-auto" style={{ width: "70%" }}>
        <h5 className="">Cast your vote: </h5>

        <form onSubmit={onsubmit}>
          <select name="candidate" className="form-select" onChange={onchange}>
            <option value="">---Select---</option>
            <option value="1">{candi1.name}</option>
            <option value="2">{candi2.name}</option>
          </select>
          <button className="btn btn-outline-primary btn-block w-100 mt-2">
            Vote Candidate {" "} {Candidate}
          </button>

        </form>
      </div>

      <p className="my-5 mx-auto text-center">
        Your address: <span className="font-weight-bold"></span> {acc}
      </p>
    </div>
  );
}

export default Body;