import axios from "axios";
import React, { useEffect, useState } from "react";
import useAxios from "../customHooks/useAxios";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import { PiDownloadSimpleBold, PiDownloadSimpleLight } from "react-icons/pi";

const AllCardData = () => {
  const instance = useAxios();
  const [allCard, setAllCard] = useState([]);
  useEffect(() => {
    instance.get("/id-card").then((res) => {
      console.log(res.data);
      setAllCard(res.data);
    });
  }, []);
  return (
    <div className="w-11/12 mx-auto ">
        <h1 className="text-4xl font-bold mt-8">Total ID Card :{allCard.length}</h1>
      <table className="table-auto w-full border mt-4 border-collapse">
        <thead>
          <tr>
            <th>BP</th>
            <th>Name</th>
            <th>Rank</th>
            <th>Mobile</th>
            <th>স্মারক</th>
            <th>স্মারকের তারিখ</th>
            <th>বর্তমান অবস্থা</th>
            <th className="grid grid-cols-2 gap-2">
              <p className="col-span-2">Actions</p>
              <p>Received</p>
              <p>Delivred</p>
            </th>
          </tr>
        </thead>
        <tbody>
          {allCard.map((user, index) => (
            <tr key={index}>
              <td>{user.BP}</td>
              <td>{user.Name}</td>
              <td>{user.Rank}</td>
              <td>{user.Mobile}</td>
              <td>{user.sarok}</td>
              <td>{user?.sarokDate}</td>
              <td>{user.status}</td>

              <td className="flex justify-evenly items-center">
                <td><PiDownloadSimpleLight /></td>
                <td><IoCheckmarkDoneOutline  /></td>
              </td>
            </tr>
          ))}text-2xl
        </tbody>
      </table>
    </div>
  );
};

export default AllCardData;
