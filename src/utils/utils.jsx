import { BsFillSunFill } from 'react-icons/bs'
import { AiOutlineThunderbolt } from 'react-icons/ai'
import { IoWarningOutline } from 'react-icons//io5'

export const homePage = [
  {
    title: "Examples",
    icon: <BsFillSunFill />,
    details: ["How to run a cartesi instance back-end in Host Mode"]
  },
  {
    title: "Capabilities",
    icon: <AiOutlineThunderbolt />,
    details: ["Will help you crawl the current cartesi docs and fine tune a response to your query"]
  },
  {
    title: "Limitations",
    icon: <IoWarningOutline />,
    details: ["Limited to Cartesi Rollup Implementation"]
  },

]

export function consoleWithEllipsis(phrase) {
  const words = phrase.split(" ");
  let delay = 0;

  words.forEach((word) => {
    setTimeout(() => {
      console.log("..." + word);
    }, delay);

    // Increment the delay for the next word
    delay += 1000; // You can adjust the delay time (in milliseconds) as per your preference
  });
}