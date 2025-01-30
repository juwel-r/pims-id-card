import { useState } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import "react-datepicker/dist/react-datepicker.css";
import { FaEye } from "react-icons/fa";
import policePlaceholder from "../assets/Photo/police-place-holder.webp";

const CardReceiveModal = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    Name,
    Rank,
    BP,
    receiveSarok,
    sendPHQSarok,
    cardReceive,
    idCardDelivered,
  } = user;

  return (
    <div>
      {/* Open Modal Button */}
      <div
        onClick={() => setIsOpen(true)}
        className="flex justify-center items-center"
      >
        <FaEye className="text-2xl text-blue-500 cursor-pointer active:scale-90 hover:text-blue-700" />
      </div>

      {/* Modal */}
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <DialogPanel className="w-full max-w-xl bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg shadow-xl p-6">
            {/* Modal Title */}
            <DialogTitle className="text-2xl font-bold text-blue-800 border-b pb-3">
              Police ID Card Details
            </DialogTitle>
            <section className="space-y-6">
              <div className="flex justify-center">
                <div className="w-32 h-32 mt-4">
                  <img
                    src={policePlaceholder}
                    alt={user.Name}
                    className="rounded-full w-full h-full shadow-lg "
                  />
                </div>
              </div>
              <div className="text-center space-y-">
                <h1 className="text-xl font-bold text-gray-800">{Name}</h1>
                <p className="text-gray-600 font-medium">{Rank}</p>
                <p className="text-gray-600 text-sm">{BP}</p>
                <p className="bg-blue-600 text-white text-sm font-semibold px-2 mt-2 py-0.5 rounded-full inline-block">
                  Status: &nbsp;
                  {idCardDelivered
                    ? idCardDelivered?.status
                    : cardReceive
                    ? cardReceive?.status
                    : sendPHQSarok
                    ? sendPHQSarok?.status
                    : receiveSarok?.status}
                </p>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-center text-blue-800">
                  Details About Application
                </h2>
                <table className="w-full mt-4 border border-blue-200">
                  <thead>
                    <tr className="bg-blue-500 text-white ">
                      <th className="py-2 px-4">Step</th>
                      <th className="py-2 px-4">Date</th>
                      <th className="py-2 px-4">Memo</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-blue-100 even:bg-blue-50">
                      <td className="py-2 px-4">Application Receive</td>
                      <td className="py-2 px-4">
                        {new Date(receiveSarok?.sarokDate).toLocaleDateString()}
                      </td>
                      <td className="py-2 px-4">{receiveSarok?.sarokNo}</td>
                    </tr>
                    {sendPHQSarok && (
                      <tr className="bg-blue-100 even:bg-blue-50">
                        <td className="py-2 px-4">Sent to PHQ</td>
                        <td className="py-2 px-4">
                          {new Date(
                            sendPHQSarok?.sarokDate
                          ).toLocaleDateString()}
                        </td>
                        <td className="py-2 px-4">{sendPHQSarok?.sarokNo}</td>
                      </tr>
                    )}
                    {sendPHQSarok && (
                      <tr className="bg-blue-100 even:bg-blue-50">
                        <td className="py-2 px-4">ID Card Receive From PHQ</td>
                        <td className="py-2 px-4">
                          {new Date(
                            cardReceive?.sarokDate
                          ).toLocaleDateString()}
                        </td>
                        <td className="py-2 px-4">{cardReceive?.sarokNo}</td>
                      </tr>
                    )}
                    {idCardDelivered && (
                      <tr className="bg-blue-100 even:bg-blue-50">
                        <td className="py-2 px-4">ID Card Delivered</td>
                        <td className="py-2 px-4">
                          {new Date(
                            idCardDelivered?.deliveredData
                          ).toLocaleDateString()}
                        </td>
                        <td className="py-2 px-4">
                          {idCardDelivered?.comments}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </section>
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  );
};

export default CardReceiveModal;
