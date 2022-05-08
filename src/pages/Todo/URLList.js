import api from "../../api/api";
import { Server, domainURL } from "../../config/config";
import { AiFillDelete } from "react-icons/ai";
import { BsArrowUpRightSquareFill } from "react-icons/bs";

const URLList = ({ item, setStale }) => {
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
        <a href="" target="_blank">
          <BsArrowUpRightSquareFill className="text-orange-500" size={20} />
        </a>
      </div>
    </li>
  );
};

export default URLList;
