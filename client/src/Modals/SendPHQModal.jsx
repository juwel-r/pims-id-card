import { useState } from "react";
import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import DatePicker from "react-datepicker";
import axios from "axios";

const SendPHQModal = ({ user }) => {
  console.log(user._id);
  const [sendPHQSarok, setSendPHQSarok] = useState({
    status: "Sent PHQ",
    sarokNo: "",
    sarokDate: new Date(),
  });

  const handelSendPHQ = (e) => {
    e.preventDefault();
    axios
      .patch(`http://localhost:5000/id-card/${user._id}`, sendPHQSarok)
      .then((res) => {
        console.log(res.data);
      });
    setIsOpen(false);
  };

  let [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <button onClick={() => setIsOpen(true)}>Send PHQ</button>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="max-w-lg space-y-4 border bg-white p-12">
            <div>
              <form onSubmit={handelSendPHQ}>
                <div>
                  <input
                    value={sendPHQSarok.sarokNo || ""}
                    onChange={(e) =>
                      setSendPHQSarok((prevData) => ({
                        ...prevData,
                        sarokNo: e.target.value,
                      }))
                    }
                    type="text"
                    placeholder="Type here"
                    className="input input-bordered w-full max-w-xs"
                  />
                </div>
                <div>
                  <DatePicker
                    selected={sendPHQSarok.sarokDate}
                    onChange={(date) => {
                      setSendPHQSarok((prevData) => ({
                        ...prevData,
                        sarokDate: date,
                      }));
                    }}
                    dateFormat="dd/MM/yyyy"
                    className="w-full max-w-xs px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    calendarClassName="bg-white border border-gray-200 rounded-lg shadow-lg"
                  />
                </div>
                <input type="submit" />
              </form>
            </div>
            <div className="flex gap-4"></div>
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  );
};

export default SendPHQModal;
