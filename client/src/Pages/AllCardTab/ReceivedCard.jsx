import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import SendPHQModal from "../../Modals/SendPHQModal";

const ReceivedCard = () => {

  const { data: receivedCard = [], refetch } = useQuery({
    queryKey: ["members"],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:5000/id-card?status=Received Application`
      );
      return res.json();
    },
  });



  return (
    <div className="w-11/12 mx-auto ">
      <h1 className="text-4xl font-bold mt-8">
        Total ID Card : {receivedCard.length}
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
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {receivedCard.map((user, index) => (
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
              <td className="p-2 text-center">
                <div>
                  <SendPHQModal user={user}></SendPHQModal>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReceivedCard;
