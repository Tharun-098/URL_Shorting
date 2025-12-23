import { Children, createContext,useRef } from "react";

export const DataContext=createContext();

export const DataProvider=({Children})=>{
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
    } catch (error) {
        console.log(error.message);
  };
}
    return (
        <DataContext.Provider value={{url,codes,handleSubmit}}>
            {Children}
        </DataContext.Provider>
    )
}