import axios from "axios";
import React, { useEffect, useState } from "react";
import useAxios from "../customHooks/useAxios";
import ViewDetailsModal from "../Modals/ViewDetailsModal";

const AllCardData = () => {
  const instance = useAxios();
  const [allCard, setAllCard] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  useEffect(() => {
    instance(`/id-card?status=all-card&search=${searchValue}`).then((res) => {
      console.log(res.data);
      setAllCard(res.data);
    });
  }, [searchValue]);
  console.log(allCard);
  return (
    <div className="w-11/12 mx-auto ">
      <h1 className="text-4xl font-bold mt-8 text-blue-900">
        Total ID Cards: {allCard.length}
      </h1>

      {/* Search Box */}
      <fieldset className="w-fit rounded-md my-4 mt-6 bg-white border-2 border-blue-500 shadow-lg">
        <label htmlFor="Search" className="hidden">
          Search
        </label>
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-2">
            <button
              type="button"
              title="search"
              className="p-1 focus:outline-none focus:ring"
            >
              <svg
                fill="currentColor"
                viewBox="0 0 512 512"
                className="w-4 h-4 text-blue-500"
              >
                <path d="M479.6,399.716l-81.084-81.084-62.368-25.767A175.014,175.014,0,0,0,368,192c0-97.047-78.953-176-176-176S16,94.953,16,192,94.953,368,192,368a175.034,175.034,0,0,0,101.619-32.377l25.7,62.2L400.4,478.911a56,56,0,1,0,79.2-79.195ZM48,192c0-79.4,64.6-144,144-144s144,64.6,144,144S271.4,336,192,336,48,271.4,48,192ZM456.971,456.284a24.028,24.028,0,0,1-33.942,0l-76.572-76.572-23.894-57.835L380.4,345.771l76.573,76.572A24.028,24.028,0,0,1,456.971,456.284Z"></path>
              </svg>
            </button>
          </span>
          <input
            type="search"
            name="Search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search Name or BP"
            className="w-72 sm:w-96 py-2 pl-10 text-sm rounded-md focus:outline-none bg-gray-50 border border-blue-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </fieldset>

      {/* Data Table */}
      <div className="overflow-auto rounded-lg p-4">
        <table className="table-auto w-full mt-6 border border-blue-500 bg-white shadow-md">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-3">BP</th>
              <th className="p-3">Name</th>
              <th className="p-3">Rank</th>
              <th className="p-3">Current Status</th>
              <th className="p-3">Details</th>
            </tr>
          </thead>
          <tbody>
            {allCard.map((user, index) => (
              <tr
                key={index}
                className={`${
                  index % 2 === 0 ? "bg-blue-50" : "bg-white"
                } hover:bg-blue-100 transition-colors`}
              >
                <td className="p-3 text-center ">
                  {user.BP}
                </td>
                <td className="p-3 text-center text-gray-700">{user.Name}</td>
                <td className="p-3 text-center text-gray-700">{user.Rank}</td>
                <td className="p-3 text-center">
                  <div className="px-2 py-1 bg-blue-900 text-white rounded-full inline-block text-sm">
                    {user.idCardDelivered
                      ? user.idCardDelivered?.status
                      : user.cardReceive
                      ? user.cardReceive?.status
                      : user.sendPHQSarok
                      ? user.sendPHQSarok?.status
                      : user.receiveSarok?.status}
                  </div>
                </td>
                <td className="p-3 text-center">
                  <ViewDetailsModal user={user} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!allCard.length && (
        <p className="text-center text-gray-400 text-4xl  font-semibold my-8">
          No data Found!
        </p>
      )}
      </div>
    </div>
  );
};

export default AllCardData;
