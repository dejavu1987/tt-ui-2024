import { useEffect, useState } from "react";

const Proxy = () => {
  const [proxy, setProxy] = useState("");
  useEffect(() => {
    // fetch proxy from backend rest endpoint
    const fetchProxy = async () => {
      const proxy = await fetch("https://tt-proxy.vercel.app/get-endpoint")
        .then((res) => res.json())
        .then((data) => {
          return data.url;
        });
      setProxy(proxy);
    };

    fetchProxy();
  }, []);

  useEffect(() => {
    console.log("setting proxy on localstorage");

    localStorage.setItem("proxy", proxy);
  }, [proxy]);

  return (
    <div>
      <h1>Proxy</h1>
      <form action="">
        <label htmlFor="">
          <input
            type="text"
            value={proxy}
            onChange={(e) => setProxy(e.target.value)}
          />
        </label>
      </form>
    </div>
  );
};
export { Proxy };
