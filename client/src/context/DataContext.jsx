import {  createContext,useRef } from "react";
import { useState } from "react";
export const DataContext=createContext();

export const DataProvider=({children})=>{
    const [links, setLinks] = useState([]);
  const [id, setId] = useState(null);
    const url = useRef(null);
  const codes = useRef(null);
  const handleSubmit = async (e) => {
    try {
        e.preventDefault();
        console.log(url.current.value)
        console.log(codes.current.value)
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                originalUrl: url.current.value,
                code: codes.current.value,
            }),
        });
        const data=await res.json();
        console.log(data.message);
        url.current.value="";
        codes.current.value="";
        fetchLinks();
    } catch (error) {
        console.log(error.message);
  };
}
const fetchLinks = async () => {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/links`);
    const data = await res.json();
    setLinks(data.data);
  };
  const handleDelete = async (id) => {
    const res = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/links/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (res.ok) {
      fetchLinks();
    }
  };
  const handleCopy = async (shortUrl, id) => {
    try {
      await navigator.clipboard.writeText(shortUrl);
      alert("Short URL copied!");
      setId(id);
      setTimeout(() => {
        setId(null);
      }, 2000);
    } catch (err) {
      console.error("Copy failed", err);
    }
  };
    return (
        <DataContext.Provider value={{url,codes,handleSubmit,handleCopy,links,fetchLinks,handleDelete,id}}>
            {children}
        </DataContext.Provider>
    )
}