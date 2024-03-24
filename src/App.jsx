import React from 'react';
import './App.css';
import { BiRefresh } from "react-icons/bi";
import { useState } from "react";
import Chat from "./components/Chat";
import MobileSiderbar from "./components/MobileSidebar";
import Sidebar from "./components/Sidebar";

function App() {
  const [chatRooms, setChatRooms] = React.useState(["old"])
  const [currentRoom, setCurrentRoom] = React.useState(0)
  const [isComponentVisible, setIsComponentVisible] = useState(false);
  const d = chatRooms.filter((room, index) => index === currentRoom)

  const toggleComponentVisibility = () => {
    setIsComponentVisible(!isComponentVisible);
  };


  return (
    <div className="App">
      <main className="overflow-hidde w-full h-screen relative flex">
        {isComponentVisible ? (
          <MobileSiderbar setCurrentRoom={setCurrentRoom} chatRooms={chatRooms} setChatRooms={setChatRooms} toggleComponentVisibility={toggleComponentVisibility} />
        ) : null}
        <div className="dark hidden flex-shrink-0 bg-gray-900 md:flex md:w-[260px] md:flex-col">
          <div className="flex h-full min-h-0 flex-col ">
            <Sidebar setCurrentRoom={setCurrentRoom} chatRooms={chatRooms} setChatRooms={setChatRooms} />
          </div>
        </div>
        {chatRooms.map((chatRoom, index) => (
          <Chat index={index} currentRoom={currentRoom} toggleComponentVisibility={toggleComponentVisibility} />
        ))}
      </main>
    </div>
  );
}

export default App;
