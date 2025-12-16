import { useRef } from "react";

const Form = () => {
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
    } catch (error) {
        console.log(error.message);
  };
}
  return (
    <div>
      <h1 className="text-xl font-semibold">Create Short Link</h1>
      <form onSubmit={handleSubmit}>
        <label className="font-semibold block text-gray-500 my-1 text-md">
          Long Url
        </label>
        <input
          type="text"
          ref={url}
          placeholder="https://example.com/very-long-url"
          className="w-full border-gray-300 border p-2 rounded-sm my-2 focus:outline-none focus:ring-2 focus:ring-blue-400 "
        />
        <label className="font-semibold block text-gray-500 my-1">
          Custom short code(optional)
        </label>
        <input
          type="text"
          ref={codes}
          placeholder="code"
          className="w-full border border-gray-300  p-2 rounded-sm my-2 focus:outline-none focus:ring-2 focus:ring-blue-400 "
        />
        <button className="w-full text-center p-3 bg-blue-500 text-white font-medium rounded-sm">
          Create short link
        </button>
      </form>
    </div>
  );
};
export default Form;
