import React, { useState } from "react";
import axios from "axios";
import "./searchBar.css";
import { Search } from "react-bootstrap-icons";
import UserCards from "./cardDetails";
import ProfileDetails from "./profileDetails";
import { useDispatch } from 'react-redux';
import { searchSuccess } from "../../../Redux/Action/piiAction";
import { toast } from 'react-toastify';
import validator from "validator";
import Cookies from 'js-cookie';
import Loader from "../Layout/loader";

const ShowDetails = () => {
  const dispatch = useDispatch();
  const token = Cookies.get('accessToken');
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchType, setSearchType] = useState("phone number");

  const handleSearch = async () => {

    if (!query.trim()) return;
    console.log("Seartype", searchType)

    if (searchType === "email") {
      if (!validator.isEmail(query) || !query.endsWith("@gmail.com")) {
        toast.error("Please enter a valid email address");
        return;
      }
    } else if (searchType === "phone number") {
      // Remove all non-digit characters

      // Check if the query contains any alphabet character
      const hasAlphabets = /[a-zA-Z]/.test(query);
      const hasInvalidSpecialChars = /[^0-9/\-+.]/.test(query);
      if (hasAlphabets || hasInvalidSpecialChars) {
        toast.error("Phone number must contain only digits");
        return;
      }
    }
    setLoading(true);
    let url = searchType === "email"
      ? `${window.runtimeConfig.REACT_APP_API_OSINT_MAN}/api/osint-man/v1/email/${query}`
      : `${window.runtimeConfig.REACT_APP_API_OSINT_MAN}/api/osint-man/v1/phone-no/${query}`;


    url = encodeURI(url); // Encode URL to handle special characters

    try {
      console.log("Final URL:", url);
      const response = await axios.get(url, { // Pass headers inside request
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });
      // setData(response.data);
      dispatch(searchSuccess(response.data));
      console.log("data", response.data);
    } catch (err) {
      console.log("error", err.message);
      toast.error(err.response?.data?.detail || 'Failed to search');
      console.log("full error", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="search-bar-container">
        <div className="search-bar">
          <select className="search-dropdown" value={searchType} onChange={(e) => setSearchType(e.target.value)}>
            <option value="phone number">Phone</option> {/* Default selected */}
            <option value="email">Email</option>
          </select>

          <input
            className="search-input"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch(); // Validate and execute search only when Enter is pressed
              }
            }}
            placeholder={`Enter ${searchType} to search`}
            disabled={!searchType}
          />

          <Search
            onClick={handleSearch} // Triggers validation & search only when clicked
          />


        </div>
        <div className="search-results-container">
          <div className="searchresult"  >
             <div className="wrapper">
            {loading ? (
              <Loader />
            ) : (<>
                <ProfileDetails />
                <UserCards />
                </>
             
            )
            }
             </div>
          </div>
        </div>

      </div>
    </>
  );
};

export default ShowDetails;
