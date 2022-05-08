import { useState } from "react";
import api from "../../api/api";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import { FetchState, useGetURLs } from "../../hooks";
import { Server, domainURL } from "../../config/config";
import Alert from "../Alert/Alert";
import URLList from "./URLList";
import { generateRandomString } from "../_helpers/common";
import "./index.css";
import { MdOutlineContentCopy } from "react-icons/md";
import { TiTick, TiTickets } from "react-icons/ti";
import useCopyToClipboard from "../../hooks/useCopyToClipboard";
import { toast } from "react-hot-toast";

const Search = ({ user, dispatch }) => {
  const [stale, setStale] = useState({ stale: false });
  const [{ urls, isLoading, isError }] = useGetURLs(stale, user["$id"]);
  const [currentURL, setCurrentURL] = useState("");
  const [output, setOutput] = useState({
    url: "",
    success: false,
  });
  const [showOld, setShowOld] = useState(false);

  const [isCopied, handleCopy] = useCopyToClipboard();

  const handleAddURL = async (e) => {
    e.preventDefault();
    try {
      const data = {
        shortURL: generateRandomString(),
        longURL: currentURL,
        expiryDate: "false",
        userID: user["$id"],
      };

      const longURLResponse = await api.listDocumentsByLongURL(
        Server.collectionID,
        currentURL
      );
      if (longURLResponse.documents.length > 0) {
        setOutput({
          url: "",
          success: false,
        });
        toast.error("URL already exists");
        return;
      }
      const response = await api.listDocumentsByShortURL(
        Server.collectionID,
        data.shortURL
      );
      if (response.documents.length > 0) {
        setOutput({
          url: "",
          success: false,
        });
        data.shortURL = generateRandomString();
      }
      const res = await api.createDocument(
        Server.collectionID,
        data,
        [`user:${user["$id"]}`],
        [`user:${user["$id"]}`]
      );
      setStale({ stale: true });
      setCurrentURL("");
      setOutput({ url: res.shortURL, success: true });
    } catch (e) {
      setOutput({ url: "", success: false });
      toast.error("Something went wrong");
    }
  };

  const handleLogout = async (e) => {
    dispatch({ type: FetchState.FETCH_INIT });
    try {
      await api.deleteCurrentSession();
      dispatch({ type: FetchState.FETCH_SUCCESS, payload: null });
    } catch (e) {
      dispatch({ type: FetchState.FETCH_FAILURE });
    }
  };

  return (
    <>
      <Navbar handleLogout={handleLogout} />
      <section className="search-container max-h-screen max-w-xl mx-auto flex flex-col items-center justify-center">
        {isError && <Alert color="red" message="Something went wrong..." />}
        <div className="font-bold text-3xl md:text-5xl lg:text-6xl">
          <h1 class="text-5xl font-extrabold text-transparent sm:text-7xl bg-clip-text bg-gradient-to-r bg-grad">
            StormURL
          </h1>
        </div>

        <form onSubmit={handleAddURL}>
          <input
            type="text"
            className="search-bar w-[84vw] md:w-[54vw] sm:w-[54vw] lg:w-[54vw] xl:w-[44vw]"
            placeholder="Enter your URL here..."
            value={currentURL}
            onChange={(e) => setCurrentURL(e.target.value)}
          ></input>
        </form>

        {isLoading && <h1> Loading .... </h1>}

        {output.success && (
          <div
            class="output-container mt-12 w-full md:w-auto"
            onClick={() => handleCopy(domainURL + "/" + output.url)}
          >
            <div class="relative inline-flex group w-full h-full">
              <div class="absolute transitiona-all duration-1000 opacity-50 -inset-px bg-gradient-to-r from-[#ffbc7d] via-[#ff9736] to-[#ff7a00] rounded-xl blur-lg filter  group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200"></div>{" "}
              <button
                aria-label="Primary button"
                title=""
                role="button"
                class="output w-full relative inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white transition-all duration-200 bg-gray-900 rounded-md focus:outline-none"
              >
                {domainURL}/{output.url}
                {isCopied ? (
                  <TiTick className="copy-icon" />
                ) : (
                  <MdOutlineContentCopy className="copy-icon" />
                )}
              </button>
            </div>
          </div>
        )}

        <button onClick={() => setShowOld(!showOld)} className="old-btn">
          {showOld ? "Hide Old URLs" : "Show Old URLs"}
        </button>

        {showOld && (
          <div className="mt-8 text-center">
            <h3 className="text-2xl font-bold">👋 Old URLs </h3>
            <ul>
              {urls?.map(
                (item, index) =>
                  index < 5 && (
                    <URLList
                      key={item["$id"]}
                      item={item}
                      setStale={setStale}
                    />
                  )
              )}
            </ul>
          </div>
        )}
      </section>
      <Footer />
    </>
  );
};

export default Search;
