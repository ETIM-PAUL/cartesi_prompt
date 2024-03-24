import React, { useContext } from "react";
import {
  AiOutlinePlus,
} from "react-icons/ai";
import { FiMessageSquare } from "react-icons/fi";
import { ContentContext } from "../contentContext";

const Sidebar = ({ setChatRooms, chatRooms, setCurrentRoom }) => {
  const { state } = useContext(ContentContext)
  return (
    <div className="scrollbar-trigger flex h-screen w-full flex-1 items-start border-white/20">
      <nav className="flex h-full flex-1 flex-col space-y-1 p-2">
        <button
          onClick={() => { setChatRooms([...chatRooms, "new room"]); setCurrentRoom(chatRooms.length) }}
          className="flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-white cursor-pointer text-sm mb-1 flex-shrink-0 border border-white/20">
          <AiOutlinePlus className="h-4 w-4" />
          New chat
        </button>

        {chatRooms.map((chatRoom, index) => (
          <div
            onClick={() => setCurrentRoom(index)}
            className="flex-col flex-0 overflow-y-auto border-b border-white/20">
            <div className="flex flex-col gap-2 pb-2 text-gray-100 text-sm">
              <a className="flex py-3 px-3 items-center gap-3 relative rounded-md hover:bg-[#2A2B32] cursor-pointer break-all hover:pr-4 group">
                <FiMessageSquare className="h-4 w-4" />
                <div className="flex- text-ellipsis max-h-5 overflow-hidden break-all relative">
                  {state.rooms[index]?.value ?? "New Conversation"}
                  <div className="absolute inset-y-0 right-0 w-8 z-10 bg-gradient-to-l from-gray-900 group-hover:from-[#2A2B32]"></div>
                </div>
              </a>
            </div>
          </div>
        ))}
        {/* <a className="flex py-3 px-3 items-center absolute bottom-10 gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-white cursor-pointer text-sm">
          <AiOutlineMessage className="h-4 w-4" />
          Clear conversations
        </a> */}
      </nav>
    </div>
  );
};

export default Sidebar;