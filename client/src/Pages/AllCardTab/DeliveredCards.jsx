import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import idCardDelivereddModal from "../../Modals/CardReceiveModal";
import CardReceiveModal from "../../Modals/CardReceiveModal";
import DeliveredModal from "../../Modals/DeliveredModal";

const DeliveredCards = () => {
  const { data: idCardDelivered = [], refetch } = useQuery({
    queryKey: ["members"],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:5000/id-card?status=delivered-cards`
      );
      return res.json();
    },
  });

  return (
    <div className="w-11/12 mx-auto mt-8">
      {/* Title */}
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Total ID Cards:{" "}
        <span className="text-blue-600">{idCardDelivered.length}</span>
      </h1>

      {/* Table Wrapper for Responsiveness */}
      <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
        <table className="w-full text-left border border-gray-200">
          {/* Table Head */}
          <thead className="bg-blue-600 text-white">
            <tr className="text-sm">
              <th className="px-4 py-3">BP</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3 text-center">Rank</th>
              <th className="px-4 py-3 text-center">Comments</th>
              <th className="px-4 py-3 text-center">Memo Date</th>
              <th className="px-4 py-3 text-center">Status</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="text-gray-700">
            {idCardDelivered.map((user, index) => (
              <tr
                key={index}
                className="border-b border-gray-200 hover:bg-gray-50 transition duration-200"
              >
                <td className="px-4 py-3">{user.BP}</td>
                <td className="px-4 py-3">{user.Name}</td>
                <td className="px-4 py-3 text-center">{user.Rank}</td>
                <td className="px-4 py-3 text-center">
                  {user.idCardDelivered?.comments}
                </td>
                <td className="px-4 py-3 text-center">
                  {new Date(
                    user.idCardDelivered?.deliveredData
                  ).toLocaleDateString("en-GB")}
                </td>
                <td className="px-4 py-3 text-center font-medium text-blue-600">
                  {user.idCardDelivered?.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DeliveredCards;
