import React, { useEffect, useState } from "react";
import "./table.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";

const DynamicSearch = () => {
  const [members, setMembers] = useState([]);
  const [bp, setBp] = useState("");
  const [userContainer, setUserContainer] = useState(false);
  const [selectedUser, setSelectedUser] = useState([]);
  const [saveData, setSaveData] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [inputData, setInputData] = useState({
    status: "আবেদন গৃহিত হয়েছে",
    sarok: null,
    sarokDate: null,
  });

  // Fetch Members
  useEffect(() => {
    const fetchMembers = async () => {
      const res = await fetch(`http://localhost:5000/members?search=${bp}`);
      const data = await res.json();
      setMembers(data);
    };
    if (bp) fetchMembers();
  }, [bp]);

  // Update Users with Sarok and Sarok Date
  useEffect(() => {
    setSaveData((prevUsers) =>
      prevUsers.map((BP) => ({
        ...BP,
        sarok: "RMP-"+inputData.sarok,
        sarokDate: inputData.sarokDate?.toLocaleDateString("en-GB"),
        status: "আবেদন গৃহিত হয়েছে",
      }))
    );
  }, [inputData]);

  const selectHandler = (user) => {
    setSelectedUser((prev) => [...prev, user]);
    setSaveData((prev) => [...prev, { BP: user.BP }]);
    setUserContainer(false);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    Swal.fire({
      title: "Confirmation",
      html: `Are our Sure to Add <span style="color: green; font-weight:bold;">0${saveData.length}</span> ID Card?`,
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Add!",
      width: "400px",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch("http://localhost:5000/id-card", {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // Specify the content type as JSON
          },
          body: JSON.stringify(saveData), // Send selectedUser data as JSON
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.insertedCount > 0) {
              Swal.fire({
                title: "Successful!",
                html: `<span style="color: green; font-weight:bold;">0${saveData.length}</span> ID Card Has Added!`,
                icon: "success",
                width: "400px",
              });
              setSelectedUser([]);
              setInputData({});
            }
          })
          .catch((err) => {
            console.log(err);
            Swal.fire({
              title: "Error!",
              text: `${err}`,
              icon: "error",
              width: "400px",
            });
          });
      }
    });
  };

  // console.log(saveData);
  return (
    <div className=" w-11/12 mx-auto mt-8 relative">
      {/* Search Form */}
      <label className=" flex items-center gap-2 w-full max-w-xs  border  text-gray-700 bg-white rounded-lg shadow-sm pr-2">
        <input
          className="grow focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 rounded-lg py-2  px-4"
          placeholder="Search BP"
          onChange={(e) => {
            setBp(e.target.value);
            setUserContainer(true);
          }}
          name="bp"
          type="number"
          required
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="h-4 w-4 opacity-70"
        >
          <path
            fillRule="evenodd"
            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
            clipRule="evenodd"
          />
        </svg>
      </label>
      <form onSubmit={submitHandler} className="w-full">
        {/* Sarok and Date */}
        <section className="grid grid-cols-2 gap-2 w-full mt-4">
          <div className="form-control w-full">
            <label className="label">স্মারক</label>
            <input
              value={inputData.sarok || ""}
              onChange={(e) =>
                setInputData((prevData) => ({
                  ...prevData,
                  sarok: e.target.value,
                }))
              }
              type="number"
              placeholder="স্মারক"
              className="w-full max-w-xs px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">স্মারকের তারিখ</label>
            <DatePicker
              selected={startDate}
              onChange={(date) => {
                setStartDate(date);
                setInputData((prevData) => ({
                  ...prevData,
                  sarokDate: date,
                }));
              }}
              dateFormat="dd/MM/yyyy"
              className="w-full max-w-xs px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              calendarClassName="bg-white border border-gray-200 rounded-lg shadow-lg"
            />
          </div>
        </section>
        <input
          type="submit"
          name=""
          value="Submit"
          className="btn btn-outline btn-primary btn-sm text-lg h-10 mt-4"
        />
      </form>

      {/* Selected Users Table */}
      <table className="table-auto w-full border mt-4">
        <thead>
          <tr>
            <th>BP</th>
            <th>Name</th>
            <th>Rank</th>
            <th>Mobile</th>
            <th>স্মারক</th>
            <th>স্মারকের তারিখ</th>
            <th>বর্তমান অবস্থা</th>
          </tr>
        </thead>
        <tbody>
          {selectedUser.map((user, index) => (
            <tr key={index}>
              <td>{user.BP}</td>
              <td>{user.Name}</td>
              <td>{user.Rank}</td>
              <td>{user.Mobile}</td>
              <td>{inputData.sarok}</td>
              <td>{inputData?.sarokDate?.toLocaleDateString("en-GB")}</td>
              <td>{inputData.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {!selectedUser.length && (
        <p className="text-center text-gray-400 text-4xl  font-bold my-8">No ID Card Added!</p>
      )}
      {/* Search Results */}
      {userContainer && members.length > 0 && (
        <div
          className="absolute top-16 max-w-sm bg-white border border-gray-300 rounded-md shadow-lg mt-1"
          tabIndex="0"
        >
          {members.slice(0, 5).map((member) => (
            <button
              key={member.BP}
              onClick={() => selectHandler(member)}
              className="w-full text-left flex justify-between items-center px-4 py-2 hover:bg-gray-100"
            >
              <span>{member.BP}</span>
              <span>{member.Name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default DynamicSearch;
