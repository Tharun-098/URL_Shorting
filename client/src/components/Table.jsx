import React, { useContext, useEffect, useState } from "react";
import { FaChartBar, FaClipboard, FaCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../context/DataContext";
const Table = () => {
  const {handleCopy,links,fetchLinks,handleDelete,id}=useContext(DataContext);
  const navigate=useNavigate();
  useEffect(() => {
    fetchLinks();
  }, []);
  return (
    <div className="bg-white mt-3 p-4">
      <h1 className="font-semibold text-xl">Your Links</h1>
      <div>
        <table className="w-full hidden lg:table">
          <thead className="bg-blue-50">
            <tr>
              <th className="p-3 font-semibold">Short URL</th>
              <th className="p-3 font-semibold">Original URL</th>
              <th className="p-3 font-semibold text-center">Clicks</th>
              <th className="p-3 font-semibold text-center">Last clicked</th>
              <th className="p-3 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {links?.map((link, index) => (
              <tr className="border-b border-gray-300" key={link._id}>
                <td className="px-2 py-3 flex gap-1 items-center">
                  <span className="max-w-50 text-blue-600 cursor-pointer">
                     <a
                      href={`${import.meta.env.VITE_BACKEND_URL}/${link.code}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600">
                      {`${import.meta.env.VITE_BACKEND_URL}/${link.code}`}
                     </a>
                  </span>
                  <span>
                    {id === link._id ? (
                      <FaCheck className="w-5 h-5 text-blue-400" />
                    ) : (
                      <FaClipboard
                        className="w-5 h-5 text-blue-400 cursor-pointer"
                        onClick={() =>
                          handleCopy(
                            `${import.meta.env.VITE_BACKEND_URL}/${link.code}`,
                            link._id
                          )
                        }
                      />
                    )}
                  </span>
                </td>
                <td className=" py-3 max-w-70 break-all">{link.url}</td>
                <td className="px-2 py-3 text-center">{link.clicks}</td>
                <td className="px-2 py-3 text-center">
                  {link.lastClickedAt ? link.lastClickedAt : "never"}
                </td>
                <td className="px-2 py-3 ">
                  <div className="flex gap-2 items-center justify-center">
                    <span className="text-blue-700" onClick={()=>navigate(`/stats/${link.code}`)}>
                      <FaChartBar />
                    </span>
                    <button
                      className="p-1 border-0 bg-gray-100 rounded-md text-sm cursor-pointer"
                      onClick={() => handleDelete(link._id)}
                    >
                      Remove
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="block lg:hidden mt-3 space-y-4">
        {links?.map((link) => (
          <div className="border rounded-lg p-3 bg-white shadow-sm border-none" key={link._id}>
            <p className="text-blue-600 font-medium break-all border-b border-gray-100 flex items-center">
              <span>
                <a
                  href={`${import.meta.env.VITE_BACKEND_URL}/${link.code}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600"
                >
                  {`${import.meta.env.VITE_BACKEND_URL}/${link.code}`}
                </a>
              </span>
              {id === link._id ? (
                <FaCheck className="inline-block text-blue-400 w-5 h-5 m-2" />
              ) : (
                <FaClipboard
                  className="inline-block text-blue-400 w-5 h-5 m-2 cursor-pointer"
                  onClick={() =>
                    handleCopy(
                      `${import.meta.env.VITE_BACKEND_URL}/${link.code}`,
                      link._id
                    )
                  }
                />
              )}
            </p>

            <p className="text-sm text-gray-500 mt-1 break-all">
              <span className="block text-black">Original Url</span>
              {link.url}
            </p>

            <div className="flex gap-3 justify-between text-sm mt-2 items-center">
              <span>Clicks: {link.clicks}</span>
              <span>
                Last Clicked:{" "}
                {link.lastClickedAt
                  ? new Date(link.lastClickedAt).toLocaleDateString()
                  : "never"}
              </span>
            </div>

            <div className="flex gap-2 mt-3">
              <button className="flex-1 bg-blue-100 text-blue-700 p-2 rounded-md flex items-center justify-center gap-1"
              onClick={()=>navigate(`/stats/${link.code}`)}>
                <FaChartBar /> Stats
              </button>
              <button
                className="flex-1 bg-red-100 text-red-600 p-2 rounded-md"
                onClick={() => handleDelete(link._id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Table;
