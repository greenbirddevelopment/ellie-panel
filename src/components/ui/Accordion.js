import React, { useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";

const AccordionList = ({ deviceList, roomSelection, onDelete }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleToggle = (index) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className="w-full mx-auto bg-white rounded shadow-md p-4 border-2">
      <h2 className="text-xl font-semibold mb-4">Bridge List</h2>
      <ul>
        {deviceList.map((bridge, index) => (
          <li key={index} className="border-b">
            <div
              className="p-4 flex justify-between items-center cursor-pointer"
              onClick={() => handleToggle(index)}
            >
              
              <span className="font-bold">
                {Object.keys(bridge)[0]} (
                {bridge[Object.keys(bridge)[0]].roomSelection || roomSelection}
                )
              </span>
              <div className="flex">
                <div
                  className=" cursor-pointer pr-5 pt-1 "
                  onClick={(e) => {
                    e.stopPropagation(); // Bu, parent div'in onClick olayını engeller
                    onDelete(index); // onDelete fonksiyonunu çağır
                  }}
                >
                  <FaRegTrashAlt />
                </div>
                
                <span className="text-gray-400">
                  {activeIndex === index ? "▲" : "▼"}
                </span>
              </div>
            </div>
            {activeIndex === index && (
              <div className="accordion-content">
                <ul>
                  {Object.keys(bridge[Object.keys(bridge)[0]]).map(
                    (property, propertyIndex) => (
                      <li key={propertyIndex} className="p-4">
                        <span className="font-semibold">{property}:</span>{" "}
                        {bridge[Object.keys(bridge)[0]][property]}
                      </li>
                    )
                  )}
                </ul>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AccordionList;
