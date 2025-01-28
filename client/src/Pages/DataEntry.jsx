import React, { useState } from "react";

const DataEntry = () => {
  const [members, setMembers] = useState([]);

  const searchHandler = (e) => {
    e.preventDefault();
    const bp = "BP" + e.target.bp.value;
    fetch(`http://localhost:5000/members/${bp}`, {})
      .then((res) => res.json())
      .then((data) => {
        const newMembers = [...members, data];
        setMembers(newMembers);
      });
    // console.log(members[5].Brush);
  };

  //Memo Submit
  const memoSubmitHandler = (e) => {
    e.preventDefault();
    const memo = e.target.memo.value;
    const memoDate = e.target.memoDate.value;
   const updatedMembers = members.map((member) => (member.memo = memo, member.memoDate = memoDate));
    console.log(updatedMembers)
  };

  const addToDB = (BP) => {
    const selected = members.find((member) => member.BP == BP);
    fetch(`http://localhost:5000/id-card`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(selected),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.insertedId) {
          setMembers(members.filter((member) => member.BP != BP));
        }
      });
  };

  //Remove From Table
  const removeFromListHandler = (BP) => {
    setMembers(members.filter((member) => member.BP != BP));
  };
  return (
    <div className="card w-5/6 md:w-4/6 lg:w-[40%] mx-auto shrink-0 shadow-2xl my-10 p-10">
      <h1 className="p-4 text-center font-bold text-xl">
        আইডি কার্ড প্রেরণ সংক্রান্ত তথ্য এন্ট্রি
      </h1>
      {/* Search Section */}
      <section className="mx-auto">
        <form onSubmit={searchHandler} className="flex gap-6 items-center">
          <div className="form-control w-full">
            <input
              defaultValue="0020231330"
              name="bp"
              type="number"
              placeholder="BP"
              className="input input-bordered w-full bg-white/50"
              required
            />
          </div>
          <button className="btn">Search</button>
        </form>
      </section>

      {/* Memo Section */}
      <section className="mx-auto my-10">
        <form onSubmit={memoSubmitHandler} className="flex gap-6 items-center">
          <div className="form-control w-full">
            <input
              name="memo"
              type="number"
              placeholder="BP"
              className="input input-bordered w-full bg-white/50"
              required
            />
          </div>
          <div className="form-control w-full">
            <input
              defaultValue="0020231330"
              name="memoDate"
              type="date"
              placeholder="BP"
              className="input input-bordered w-full bg-white/50"
              required
            />
          </div>
          <button className="btn">Submit</button>
        </form>
      </section>

      {/* Table Section */}
      <section className="mx-auto w-full mt-6">
        <table className="w-full">
          <thead>
            <th>নং</th>
            <th>বিপি</th>
            <th>নাম</th>
            <th>পদবী</th>
            <th>ব্রাশ</th>
            <th>Action</th>
          </thead>
          <tbody>
            {members.map((members, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{members.BP}</td>
                <td style={{ textAlign: "left" }}>{members.Name}</td>
                <td>{members.Rank}</td>
                <td>{members.Brush}</td>
                <td className="flex gap-2 justify-center">
                  <button
                    onClick={() => addToDB(members.BP)}
                    className="btn btn-xs"
                  >
                    Add
                  </button>
                  <button
                    onClick={() => removeFromListHandler(members.BP)}
                    className="btn btn-xs"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default DataEntry;

// const dataEntryHandler = (e) => {
//   e.preventDefault();
//   const form = e.target;
//   const reason = form.reason.value;
//   const rank = form.rank.value;
//   const brush = form.brush.value;
//   const bp = "BP" + form.bp.value;
//   const name = form.name.value;
//   const memoNo = form.memoNo.value;
//   const memoDate = form.memoDate.value;

//   const idInfo = {
//     rank,
//     brush,
//     bp,
//     name,
//     memoNo,
//     memoDate,
//     reason,
//   };

//   console.log(idInfo);
// };

// const reason = [
//   { name: "হারানো" },
//   { name: "পদোন্নতি" },
//   { name: "দাড়ি" },
//   { name: "ভাঙ্গা" },
//   { name: "লগো" },
//   { name: "পুরাতন" },
// ];
