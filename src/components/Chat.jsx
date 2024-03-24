import { useContext, useEffect, useRef, useState } from "react";
import { FiSend } from "react-icons/fi";
import { BsChevronDown, BsPlusLg } from "react-icons/bs";
import { RxHamburgerMenu } from "react-icons/rx";
import OpenAI from 'openai';
import Message from "./Message";
import { homePage } from "../utils/utils";
import { ContentContext } from "../contentContext";


const Chat = (props) => {
  const { toggleComponentVisibility, index, currentRoom } = props;

  const { state, dispatch } = useContext(ContentContext);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showEmptyChat, setShowEmptyChat] = useState(true);
  const [conversation, setConversation] = useState([]);
  const [message, setMessage] = useState("");
  const [generating, setGenerating] = useState(false);
  const bottomOfChatRef = useRef(null);

  const openaiClient = new OpenAI({ apiKey: import.meta.env.VITE_AI_KEY, dangerouslyAllowBrowser: true });

  useEffect(() => {
    if (bottomOfChatRef.current) {
      bottomOfChatRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [conversation]);

  const sendMessage = async (e) => {

    // Don't send empty messages
    if (message.length < 1) {
      setErrorMessage("Please enter a message.");
      return;
    } else {
      setErrorMessage("");
      dispatch({
        type: "SETROOM",
        payload: { position: props.index, value: message },
      });
    }

    setIsLoading(true);

    // Add the message to the conversation
    setConversation([
      ...conversation,
      { content: message, role: "user", content2: null, role2: "system" },
    ]);

    // Clear the message & remove empty chat
    setMessage("");
    setShowEmptyChat(false);
    let response;

    try {
      setGenerating(true)
      try {

        // Create a thread and run
        const run = await openaiClient.beta.threads.createAndRun({
          assistant_id: import.meta.env.VITE_ASSISTANT_KEY,
          thread: {
            messages: [
              { role: "user", content: message },
            ],
          },
          instructions: "You are great at giving solid and specific responses to query concerning cartesi rollup implementation but sourcing the files attached to the created assistant",
        });

        const runId = run.id;
        const threadId = run.thread_id;

        // Wait for the run to complete
        let runStatus;
        do {
          const runStatusResponse = await openaiClient.beta.threads.runs.retrieve(threadId, runId);
          console.log(runStatusResponse)
          runStatus = runStatusResponse.status;
        } while (runStatus === "queued" || runStatus === "in_progress");

        const threadMessages = await openaiClient.beta.threads.messages.list(threadId);

        // Delete the thread
        // await openaiClient.beta.threads.del(threadId);
        console.log(threadMessages)
        if (threadMessages.data[0]) {
          setGenerating(false)
          // Add the message to the conversation
          setConversation([
            ...conversation,
            { content: message, role: "user", content2: threadMessages.data[0]?.content[0].text.value, role2: "system" },
          ]);
        }

      } catch (err) {
        console.log(err);
        res.status(403);
        res.json({
          error: true,
          message: err.message,
        });
      }



      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setGenerating(false)
      setErrorMessage(error.message);

      setIsLoading(false);
    }
  };

  const handleKeypress = (e) => {
    // It's triggers by pressing the enter key
    if (e.keyCode == 13 && !e.shiftKey) {
      sendMessage(e);
      e.preventDefault();
    }
  };

  return (
    <div className={`${index !== currentRoom && "hidden"} flex max-w-full flex-1 flex-col dark:bg-gray-800`}>
      <div className="sticky top-0 z-10 flex items-center border-b border-white/20 bg-gray-800 pl-1 pt-1 text-gray-200 sm:pl-3 md:hidden">
        <button
          type="button"
          className="-ml-0.5 -mt-0.5 inline-flex h-10 w-10 items-center justify-center rounded-md hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white dark:hover:text-white"
          onClick={toggleComponentVisibility}
        >
          <span className="sr-only">Open sidebar</span>
          <RxHamburgerMenu className="h-6 w-6 text-white" />
        </button>
        <h1 className="flex-1 text-center text-base font-normal">New chat</h1>
        <button type="button" className="px-3">
          <BsPlusLg className="h-6 w-6" />
        </button>
      </div>
      <div className="relative  mx-auto h-full w-full transition-width flex flex-col overflow-hidden items-stretch flex-1">
        <div className="overflow-scroll sm:h-[700px]">
          <div className="react-scroll-to-bottom--css-ikyem-79elbk dark:bg-gray-800">
            <div className={`react-scroll-to-bottom--css-ikyem-1n7m0yu ${(!showEmptyChat && conversation.length) ? " sm:mt-2" : "sm:mt-20"}`}>
              {!showEmptyChat && conversation.length > 0 ? (
                <div className="flex flex-col items-center text-sm bg-gray-800">
                  <Message generating={generating} conversation={conversation} message={message} genert />
                  <div className="w-full h-32 md:h-48 flex-shrink-0"></div>
                  <div ref={bottomOfChatRef}></div>
                </div>
              ) : null}
              {showEmptyChat ? (
                <div className="py-10 max-w-[90%] sm:max-w-[80%] relative mx-auto h-full mb-28 sm:mb-0">
                  <h1 className="text-4xl font-bold text-center text-[white] flex gap-2 items-center justify-center">
                    Cartessi Prompt
                  </h1>
                  <div className="sm:flex sm:flex-wrap items-center sm:justify-center gap-4 mt-5 sm:mt-10">
                    {homePage.map((item, index) => (
                      <div key={index} className="h-fit">
                        <div className="flex items-center gap-2 justify-center sm:grid mt-4 sm:mt-0">
                          <span className="text-center flex justify-center text-2xl text-[white] sm:mt-4">{item.icon}</span>
                          <h3 className="text-gray-100 text-lg sm:my-3">{item.title}</h3>
                        </div>
                        <div className="mt-4 sm:mt-10">
                          {item.details.map((details, index) => (
                            <div key={index} className="w-full h-[100px] sm:w-[250px] bg-gray-500 flex items-center rounded-md text-gray-100 text-sm px-2 py-4 mb-4 sm:my-4">
                              {details}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
              <div className="flex flex-col items-center text-sm dark:bg-gray-800"></div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full border-t md:border-t-0 dark:border-white/20 md:border-transparent md:dark:border-transparent md:bg-vert-light-gradient bg-white dark:bg-gray-800 md:!bg-transparent dark:md:bg-vert-dark-gradient pt-2">
          <form className="stretch mx-2 flex flex-row gap-3 last:mb-2 md:mx-4 md:last:mb-6 lg:mx-auto lg:max-w-2xl xl:max-w-3xl">
            <div className="relative flex flex-col h-full flex-1 items-stretch md:flex-col">
              <div className="flex items-center px-4 h-[55px] w-full flex-grow relative border border-black/10 bg-white dark:border-gray-900/50 dark:text-white dark:bg-gray-700 rounded-md shadow-[0_0_10px_rgba(0,0,0,0.10)] dark:shadow-[0_0_15px_rgba(0,0,0,0.10)]">
                <textarea
                  // ref={textAreaRef}
                  value={message}
                  tabIndex={0}
                  data-id="root"
                  style={{
                    height: "24px",
                    maxHeight: "200px",
                    overflowY: "hidden",
                  }}
                  // rows={1}
                  placeholder="Send a message"
                  className="m-0 h-6 w-full resize-none flex items-center border-0 bg-transparent focus:outline-none focus:ring-0 focus-visible:ring-0 dark:bg-transparent"
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={handleKeypress}
                />
                <button
                  disabled={isLoading || message?.length === 0}
                  onClick={() => sendMessage()}
                  className={`absolute p-1 rounded-md bg-transparent bg-green-500 disabled:bg-gray-500 right-1 md:right-2 disabled:opacity-40`}
                >
                  <FiSend className="h-4 w-4 mr-1 text-white " />
                </button>
              </div>
            </div>
          </form>
          {errorMessage ? (
            <div className="mb-2 md:mb-0">
              <div className="h-full flex ml-1 md:w-full md:m-auto md:mb-2 gap-0 md:gap-2 justify-center">
                <span className="text-red-500 text-sm">{errorMessage}</span>
              </div>
            </div>
          ) : null}
          <div className="px-3 pt-2 pb-3 text-center text-xs text-black/50 dark:text-white/50 md:px-4 md:pt-3 md:pb-6">
            <span>
              Cartessi Prompt is Built on the current version of the Cartesi Docs
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;