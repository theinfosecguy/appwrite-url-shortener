import api from "../../api/api";
import { Server, domainURL } from "../../config/config";
import { AiFillDelete } from "react-icons/ai";
import { MdOutlineContentCopy } from "react-icons/md";
import { TiTick } from "react-icons/ti";

import useCopyToClipboard from "../../hooks/useCopyToClipboard";

const URLList = ({ item, setStale }) => {
  const [isCopied, handleCopy] = useCopyToClipboard();

  const handleDelete = async (e, item) => {
    try {
      await api.deleteDocument(Server.collectionID, item["$id"]);
      setStale({ stale: true });
    } catch (e) {
      console.log("Error in deleting URL");
    }
  };

  return (
    <li className="flex justify-between items-center mt-4 px-4">
      <div className="flex">
        <div
          className={`ml-3 text-md font-medium ${
            item["isComplete"] ? "line-through" : ""
          }`}
        >
          <span className="mr-4">
            {domainURL}/{item["shortURL"]}
          </span>
        </div>
      </div>
      <div className="flex">
        <AiFillDelete
          className="text-red-500 mr-2 cursor-pointer"
          size={20}
          onClick={(e) => handleDelete(e, item)}
        />
        {isCopied ? (
          <TiTick className="text-green-500" size={21} />
        ) : (
          <MdOutlineContentCopy
            className="text-black-500"
            onClick={() => handleCopy(domainURL + "/" + item["shortURL"])}
            size={21}
          />
        )}
      </div>
    </li>
  );
};

export default URLList;
