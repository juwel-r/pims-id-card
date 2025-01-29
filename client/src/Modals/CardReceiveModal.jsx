import { useState } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

const CardReceiveModal = ({ user, refetch }) => {
  const [cardReceive, setCardReceive] = useState({
    status: "ID Card Received",
    sarokNo: "",
    sarokDate: new Date(),
  });

  const [isOpen, setIsOpen] = useState(false);
  const handleSendPHQ = async (e) => {
    e.preventDefault();
    try {
      await axios
        .patch(
          `http://localhost:5000/id-card/${user._id}?status=card-receive`,
          cardReceive
        )
        .then((res) => {
          if (res.data.modifiedCount) {
            refetch();
          }
        });
      setIsOpen(false);
    } catch (error) {
      console.error("Error sending PHQ:", error);
    }
  };

  return (
    <div>
      {/* Open Modal Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition duration-300"
      >
        Received
      </button>

      {/* Modal */}
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <DialogPanel className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
            {/* Modal Title */}
            <DialogTitle className="text-xl font-semibold text-gray-800 border-b pb-3">
              Id Card Received Details
            </DialogTitle>

            {/* Form */}
            <form onSubmit={handleSendPHQ} className="space-y-4 mt-4">
              {/* Sarok No Input */}
              <div>
                <label className="block text-gray-600 font-medium">
                  Sarok No
                </label>
                <input
                  type="text"
                  value={cardReceive.sarokNo}
                  onChange={(e) =>
                    setCardReceive((prevData) => ({
                      ...prevData,
                      sarokNo: e.target.value,
                    }))
                  }
                  placeholder="Enter Sarok No"
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                />
              </div>

              {/* Date Picker */}
              <div>
                <label className="block text-gray-600 font-medium">
                  Sarok Date
                </label>
                <DatePicker
                  selected={cardReceive.sarokDate}
                  onChange={(date) =>
                    setCardReceive((prevData) => ({
                      ...prevData,
                      sarokDate: date,
                    }))
                  }
                  dateFormat="dd/MM/yyyy"
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  calendarClassName="bg-white border rounded-lg shadow-lg"
                />
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition duration-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
                >
                  Submit
                </button>
              </div>
            </form>
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  );
};

export default CardReceiveModal;
