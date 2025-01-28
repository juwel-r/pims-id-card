import React, { useEffect, useState } from "react";
import "./table.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const AddCardData = () => {
  const [bp, setBp] = useState("");
  const [userContainer, setUserContainer] = useState(false);
  const [selectedUser, setSelectedUser] = useState([]);
  const [receiveSarok, setReceiveSarok] = useState({
    status: "Application Received",
    sarokNo: "",
    sarokDate: new Date(),
  });

  // Fetch Members
  const { data: members = [], refetch } = useQuery({
    queryKey: ["members"],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5000/members?search=${bp}`);
      return res.json();
    },
  });

  const selectHandler = (member) => {
    const user = {
      BP: member.BP,
      Name: member.Name,
      Rank: member.Rank,
    };
    setSelectedUser((prev) => [...prev, user]);
    setBp("");
  };
  console.log(selectedUser);

  // Update Users with Sarok and Sarok Date
  useEffect(() => {
    setSelectedUser((prevUsers) =>
      prevUsers.map((user) => ({
        ...user,
        receiveSarok,
      }))
    );
  }, [receiveSarok]);

  const submitHandler = (e) => {
    e.preventDefault();

    Swal.fire({
      title: "Confirmation",
      html: `Are our Sure to Add <span style="color: green; font-weight:bold;">0${selectedUser.length}</span> ID Card?`,
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Add!",
      width: "400px",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .post("http://localhost:5000/id-card", selectedUser)
          .then((res) => {
            if (res.data.insertedCount > 0) {
              Swal.fire({
                title: "Successful!",
                html: `<span style="color: green; font-weight:bold;">0${selectedUser.length}</span> ID Card Has Added!`,
                icon: "success",
                width: "400px",
              });
              setSelectedUser([]);
              setReceiveSarok((prevData) => ({
                ...prevData,
                sarokNo: "",
              }))
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

  return (
    <div className=" w-11/12 mx-auto mt-8 relative">
      {/* Search Form */}
      <label className=" flex items-center gap-2 w-full max-w-xs  border  text-gray-700 bg-white rounded-lg shadow-sm">
        <input
          className="grow focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 rounded-lg py-2  px-4"
          placeholder="Search BP"
          value={bp}
          onChange={(e) => {
            setBp(e.target.value);
            refetch();
          }}
          onFocus={() => setUserContainer(true)}
          onBlur={() => setTimeout(() => setUserContainer(false), 100)}
          type="number"
          required
        />
      </label>

      {/* Search Result Container */}
      {userContainer && members.length > 0 && (
        <div
          className="absolute top-10 max-w-sm bg-white border border-gray-300 rounded-md shadow-md mt-1"
          tabIndex="0"
        >
          {members.map((member) => (
            <button
              key={member.BP}
              onClick={() => selectHandler(member)}
              className="w-full text-left flex justify-between items-center px-4 py-2 hover:bg-gray-100"
            >
              <span>{member.BP}</span> &nbsp;|&nbsp;<span>{member.Name}</span>
            </button>
          ))}
        </div>
      )}

      {/* submit section */}
      <form onSubmit={submitHandler} className="w-full">
        {/* Sarok and Date */}
        <section className="grid grid-cols-2 gap-2 w-full mt-4">
          <div className="form-control w-full">
            <label className="label">স্মারক</label>
            <input
              value={receiveSarok.sarokNo || ""}
              onChange={(e) =>
                setReceiveSarok((prevData) => ({
                  ...prevData,
                  sarokNo: e.target.value,
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
              selected={receiveSarok.sarokDate}
              onChange={(date) => {
                setReceiveSarok((prevData) => ({
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
          disabled={
            receiveSarok.sarokNo && receiveSarok.sarokDate ? false : true
          }
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
              <td>{receiveSarok?.sarokNo}</td>
              <td>{receiveSarok?.sarokDate?.toLocaleDateString("en-GB")}</td>
              <td>{receiveSarok.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {!selectedUser.length && (
        <p className="text-center text-gray-400 text-4xl  font-bold my-8">
          No ID Card Added!
        </p>
      )}
    </div>
  );
};

export default AddCardData;
