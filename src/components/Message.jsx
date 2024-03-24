import { SiOpenai } from "react-icons/si";
import { FaUserAlt } from "react-icons/fa";
import { TbCursorText } from "react-icons/tb";
import { useEffect, useState } from "react";
import TypingEffect from "./TypingEffect";

const Message = (props) => {
  const { conversation, generating } = props;
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    setCurrentIndex(conversation.length - 1)
  }, [conversation])


  return (
    <>
      <div
        className={`group mb- w-full text-gray-800 dark:text-gray-100 border-b border-black/10 `}
      >
        <div className="text-base py-2 sm:py-0 gap-4 md:gap-6 flex justify-center items-center lg:px-0 m-auto w-full dark:border-gray-900/50 dark:bg-gray-500">
          <div className="text-xs text-start flex gap-1 ml-4">
            <button
              className="text-gray-300 dark:text-gray-400"
              disabled={currentIndex + 1 === 1}
              onClick={() => setCurrentIndex(currentIndex - 1)}
            >&lt;</button>
            <span className="flex-grow flex-shrink-0">{currentIndex + 1} / {conversation?.length}</span>
            <button
              disabled={currentIndex + 1 === conversation.length}
              className="text-gray-300 dark:text-gray-400"
              onClick={() => setCurrentIndex(currentIndex + 1)}
            >
              &gt;
            </button>
          </div>
          <div className="flex flex-row gap-4 md:gap-6 md:max-w-2xl lg:max-w-xl xl:max-w-3xl pl-4 md:py-6 lg:px-0 my-auto w-full">
            <div className="w-8 flex flex-col relative items-end">
              <div className="relative h-7 w-7 p-1 rounded-sm text-white flex items-center justify-center bg-green-600 text-opacity-100r">
                <FaUserAlt className="h-4 w-4 text-white" />
              </div>
            </div>
            <div className="relative text-start flex w-[calc(100%-50px)] flex-col gap-1 md:gap-3 lg:w-[calc(100%-115px)]">
              <div className="flex flex-grow flex-col gap-3">
                <div className="min-h-20 flex flex-col items-start gap-4 whitespace-pre-wrap break-words">
                  <div className="markdown prose w-full break-words dark:prose-invert dark">
                    <p>{conversation[currentIndex]["content"]}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-base mt-2 gap-4 md:gap-6 md:max-w-2xl lg:max-w-xl xl:max-w-3xl flex mr lg:px-0 m-auto w-full">
          <div className="flex flex-row gap-4 md:gap-6 md:max-w-2xl lg:max-w-xl xl:max-w-3xl p-4 md:py-6 lg:px-0 m-auto w-full">
            <div className="w-8 flex flex-col relative items-end">
              <div className="relative h-7 w-7 p-1 rounded-sm text-white flex items-center justify-center bg-green-600 text-opacity-100r">
                <SiOpenai className="h-4 w-4 text-white" />
              </div>
            </div>
            <div className="relative text-start flex w-[calc(100%-50px)] flex-col gap-1 md:gap-3 lg:w-[calc(100%-115px)]">
              <div className="flex flex-grow flex-col gap-3">
                <div className="min-h-20 flex flex-col items-start gap-4 whitespace-pre-wrap break-words">
                  <div className="markdown prose w-full break-words dark:prose-invert dark">
                    {generating ? (
                      <div className="flex items-center gap-3">
                        <TbCursorText className="h-6 w-6 animate-pulse" />
                        <span className="font-bold text-lg">Generating Response...</span>
                      </div>
                    ) : (
                      <p>
                        <TypingEffect phrase={conversation[currentIndex]["content2"]} />
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
      {conversation[currentIndex]["content2"] !== null &&
        <div className="flex flex-wrap gap-4 items-center px-4 sm:px-10 mt-10">
        </div>
      }
    </>
  );
};

export default Message;