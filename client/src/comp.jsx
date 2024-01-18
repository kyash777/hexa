import React, { useState, useEffect } from "react";
import axios from "axios";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

const User = () => {
  const [res, setResponse] = useState([]);
  const [name, setName] = useState(null);
  const [filterUser, setFilterUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/");
        setResponse(response.data);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const handleClick = () => {
    var filteredUser = res.filter((user) => {
      return user.name === name;
    });
    setFilterUser(filteredUser);
  };

  const handleupSort= async ()=>{
    try{
      const response = await axios.get("http://localhost:8000/upsorted");
      setResponse(response.data);
    }catch(error){
      console.log("Error fetching data:", error);
    }
  }

  const handledownSort= async ()=>{
    try{
        const response=await axios.get("http://localhost:8000/downsorted");
        setResponse(response.data);
    }catch(error){
      console.log("Error in fetching data",error)
    }
  }

  return (
    <div>
      <div>
        <label htmlFor="userid">Enter User</label>
        <input
          type="text"
          id="userid"
          onChange={(e) => {
            handleChange(e);
          }}
        ></input>
        <button onClick={() => handleClick()}>Search</button>
      </div>
      {filterUser ? (
        <div className="container">
          {Array.isArray(filterUser) && filterUser.length > 0 ? (
            <table className="userTable">
              <thead>
                <tr className="row">
                  <th>Name</th>
                  <th>User</th>
                  <th>Email</th>
                  <th>Company</th>
                </tr>
              </thead>
              <tbody className="tableBody">
                {filterUser.map((user) => (
                  <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.company.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No user data available</p>
          )}
        </div>
      ) : (
        <div className="container">
          <div>
            <ArrowUpwardIcon onClick={()=>handleupSort()} />
            <ArrowDownwardIcon onClick={()=>handledownSort()} />
          </div>
          {Array.isArray(res) && res.length > 0 ? (
            <table className="userTable">
              <thead>
                <tr className="row">
                  <th>Name</th>
                  <th>User</th>
                  <th>Email</th>
                  <th>Company</th>
                </tr>
              </thead>
              <tbody className="tableBody">
                {res.map((user) => (
                  <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.company.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No user data available</p>
          )}
        </div>
      )}
    </div>
  );
};

export default User;
