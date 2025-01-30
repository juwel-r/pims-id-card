import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import SendPHQModal from "../../Modals/SendPHQModal";

const ReceivedCard = () => {
  const { data: receivedCard = [], refetch } = useQuery({
    queryKey: ["members"],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:5000/id-card?status=received-application`
      );
      return res.json();
    },
  });

  return (
<div className="w-11/12 mx-auto mt-8 relative">
  {/* Title */}
  <h1 className="text-3xl font-bold text-gray-800 mb-6">
    Total ID Cards:{" "}
    <span className="text-blue-600">{receivedCard.length}</span>
  </h1>

  {/* Table Wrapper for Responsiveness */}
  <div className="overflow-x-auto bg-white rounded-lg p-4 shadow-lg">
    <table className="w-full text-left">
      {/* Table Head */}
      <thead className="bg-blue-600 text-white">
        <tr className="text-sm">
          <th className="px-4 py-3">BP</th>
          <th className="px-4 py-3">Name</th>
          <th className="px-4 py-3 text-center">Rank</th>
          <th className="px-4 py-3 text-center">Memo No.</th>
          <th className="px-4 py-3 text-center">Memo Date</th>
          <th className="px-4 py-3 text-center">Status</th>
          <th className="px-4 py-3 text-center">Action</th>
        </tr>
      </thead>

      {/* Table Body */}
      <tbody className="text-gray-700">
        {receivedCard.map((user, index) => (
          <tr
            key={index}
            className="hover:bg-blue-100 transition duration-200 even:bg-blue-50"
          >
            <td className="px-4 py-3">{user.BP}</td>
            <td className="px-4 py-3">{user.Name}</td>
            <td className="px-4 py-3 text-center">{user.Rank}</td>
            <td className="px-4 py-3 text-center">
              {user.receiveSarok?.sarokNo}
            </td>
            <td className="px-4 py-3 text-center">
              {new Date(user.receiveSarok?.sarokDate).toLocaleDateString("en-GB")}
            </td>
            <td className="px-4 py-3 text-center font-medium text-blue-600">
              {user.receiveSarok?.status}
            </td>
            <td className="px-4 py-3 text-center">
              <SendPHQModal user={user} refetch={refetch} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>

    {!receivedCard.length && (
      <p className="text-center text-gray-400 text-4xl font-semibold my-8">
        There is no data to show!
      </p>
    )}
  </div>
</div>

  );
};

export default ReceivedCard;
