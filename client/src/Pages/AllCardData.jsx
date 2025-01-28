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
      <h1 className="text-4xl font-bold mt-8">
        Total ID Card :{allCard.length}
      </h1>
      <table className="table-auto w-full border mt-4 border-collapse">
        <thead>
          <tr>
            <th>BP</th>
            <th>Name</th>
            <th>Rank</th>
            <th>Memo No.</th>
            <th>Memo Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {allCard.map((user, index) => (
            <tr key={index}>
              <td>{user.BP}</td>
              <td className="p-2">{user.Name}</td>
              <td className="p-2 text-center">{user.Rank}</td>
              <td className="p-2 text-center">{user.receiveSarok.sarokNo}</td>
              <td className="p-2 text-center">
                {new Date(user.receiveSarok.sarokDate).toLocaleDateString(
                  "en-GB"
                )}
              </td>
              <td className="p-2 text-center">{user.receiveSarok.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllCardData;
