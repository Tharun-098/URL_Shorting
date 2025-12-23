import { Clock, ExternalLink, Link, MousePointerClick, MoveLeft } from "lucide-react";
import React, { useEffect, useState } from "react";
import {useNavigate, useParams} from "react-router-dom";
const Stats = () => {
    const navigate=useNavigate();
    const [stats,setStats]=useState(null);
    const {code}=useParams();
    const fetchDetails=async(code)=>{
        try {
            const res=await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/stats/${code}`);
            const data=await res.json();
            setStats(data.data);
        } catch (error) {
            console.log(error.message);
        }
    }
    useEffect(()=>{
        fetchDetails(code);
    },[]); 

  return (
    <div className="bg-blue-50 min-h-screen md:px-40 py-6 px-10">
      <button onClick={()=>navigate("/")} className="bg-white font-light text-black p-2 flex gap-2 rounded-lg">
        <MoveLeft /> Back to Stats
      </button>
      <h1 className="text-2xl font-semibold my-3">Link Statistics</h1>
      <div className="bg-white w-full p-4">
        <div className="flex gap-2 border-b border-gray-300 pb-4 items-center">
          <Link className="w-10 h-10 p-2 bg-blue-100 rounded-lg text-blue-600" />
          <div>
            <p className="text-sm font-medium text-gray-500">SHORT CODE</p>
            <p className="font-medium mt-2">{stats?.code}</p>
          </div>
        </div>
        <div className="flex gap-2 border-b border-gray-300 pb-4 items-center my-2">
          <ExternalLink className="w-10  h-10 p-2 bg-blue-100 rounded-lg text-blue-600" />
          <div className="flex-1/5">
            <p className="text-sm text-gray-500 font-medium">ORIGINAL URL</p>
            <a
              href={stats?.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 font-light md:font-medium pt-2 break-all"
            >
              {stats?.url}
            </a>
          </div>
        </div>
        <div className="flex gap-2 border-b border-gray-300 pb-4 items-center">
          <MousePointerClick className="w-10 h-10 p-2 bg-blue-100 rounded-lg text-blue-600" />
          <div>
            <p className="text-sm font-medium text-gray-500">TOTAL CLICKS</p>
            <p className="font-medium mt-1">{stats?.clicks}</p>
          </div>
        </div>
        <div className="flex gap-2 border-b border-gray-300 pb-4 items-center">
          <Clock className="w-10 h-10 p-2 bg-blue-100 rounded-lg text-blue-600" />
          <div>
            <p className="text-sm font-medium text-gray-500">LAST CLICKED</p>
            <p className="font-medium mt-2">{stats?.lastClickedAt?new Date(stats.lastClickedAt).toLocaleDateString():Never}</p>
          </div>
        </div>
        <div className="flex gap-2 border-b border-gray-300 pb-4 items-center">
          <Clock className="w-10 h-10 p-2 bg-blue-100 rounded-lg text-blue-600" />
          <div>
            <p className="text-sm font-medium text-gray-500">CREATED AT</p>
            <p className="font-medium mt-2">{new Date(stats?.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
      </div>
      <div className="mt-4 bg-white p-4">
        <h1 className="text-2xl font-semibold my-3">Short Link</h1>
        <div className="text-xl bg-blue-50 p-2 text-blue-700 border-gray-100 border">
            <a href={`${import.meta.env.VITE_BACKEND_URL}/${stats?.code}`} className="text-md font-semibold break-all">
                {import.meta.env.VITE_BACKEND_URL}/{stats?.code}
                </a>
                </div>
      </div>
    </div>
  );
};

export default Stats;
