import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../assets/css/Chatbot.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

function Chatbot() {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState(
    JSON.parse(localStorage.getItem("chatHistory")) || []
  );
  const [isInputVisible, setIsInputVisible] = useState(true);
  const [isChatbotVisible, setIsChatbotVisible] = useState(true);

  useEffect(() => {
    localStorage.setItem("chatHistory", JSON.stringify(chatHistory));
  }, [chatHistory]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userMessage = message;
    setChatHistory([...chatHistory, { sender: "user", text: userMessage }]);
    setMessage("");
    setIsInputVisible(false); // Hide input field after submission

    try {
      const res = await axios.post("http://127.0.0.1:5000/chatbot", {
        message: userMessage,
      });
      setChatHistory((prevChatHistory) => [
        ...prevChatHistory,
        { sender: "bot", text: res.data.response },
      ]);
    } catch (error) {
      console.error("There was an error sending the message!", error);
      setChatHistory((prevChatHistory) => [
        ...prevChatHistory,
        {
          sender: "bot",
          text: "There was an error getting the response. Please try again.",
        },
      ]);
    } finally {
      setIsInputVisible(true); // Show input field for the next question
    }
  };

  const handleCloseChatbot = () => {
    setIsChatbotVisible(false);
  };

  return (
    isChatbotVisible && (
      <div className="chatbot-main">
        <div className="chatbot-header">
          <FontAwesomeIcon
            icon={faTimes}
            className="close-icon"
            onClick={handleCloseChatbot}
          />
        </div>
        <iframe
          className="chatbot-iframe"
          width="400"
          height="600"
          allow="microphone;"
          src="https://console.dialogflow.com/api-client/demo/embedded/f7a4bd19-27ce-46f4-8ad3-51c1b7fdedf6"
        ></iframe>
      </div>
    )
  );
}

export default Chatbot;




// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "../../assets/css/Chatbot.css";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faTimes } from "@fortawesome/free-solid-svg-icons";

// function Chatbot() {

//   const [message, setMessage] = useState("");
//   const [chatHistory, setChatHistory] = useState(
//     JSON.parse(localStorage.getItem("chatHistory")) || []
//   );
//   const [isInputVisible, setIsInputVisible] = useState(true);
//   const [isChatbotVisible, setIsChatbotVisible] = useState(true);

  

//   useEffect(() => {
//     localStorage.setItem("chatHistory", JSON.stringify(chatHistory));
//   }, [chatHistory]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const userMessage = message;
//     setChatHistory([...chatHistory, { sender: "user", text: userMessage }]);
//     setMessage("");
//     setIsInputVisible(false); // Hide input field after submission

//     try {
//       const res = await axios.post("http://127.0.0.1:5000/chatbot", {
//         message: userMessage,
//       });
//       setChatHistory((prevChatHistory) => [
//         ...prevChatHistory,
//         { sender: "bot", text: res.data.response },
//       ]);
//     } catch (error) {
//       console.error("There was an error sending the message!", error);
//       setChatHistory((prevChatHistory) => [
//         ...prevChatHistory,
//         {
//           sender: "bot",
//           text: "There was an error getting the response. Please try again.",
//         },
//       ]);
//     } finally {
//       setIsInputVisible(true); // Show input field for the next question
//     }
//   };

//   const handleCloseChatbot = () => {
//     setIsChatbotVisible(false);
//   };

//   return (
//     isChatbotVisible && (
//       <div className="chatbot-main">
//         <div className="chatbot-top">
//           <p>Welcome to our chatbot!</p>
//           <button className="close-button" onClick={handleCloseChatbot}>
//             <FontAwesomeIcon icon={faTimes} />
//           </button>
//         </div>
//         <div className="chatbot-body">
//           <div className="chatbot-chat">
//             {chatHistory.map((chat, index) => (
//               <div key={index} className={`chat-message ${chat.sender}`}>
//                 <p className="chatbot-mg">{chat.text}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//         <div className="chatbot-bottom">
//           {isInputVisible ? (
//             <form onSubmit={handleSubmit} className="chatbot-form">
//               <input
//                 type="text"
//                 value={message}
//                 onChange={(e) => setMessage(e.target.value)}
//                 placeholder="Type your message here..."
//                 className="chatbot-input"
//               />
//               <button type="submit" className="chatbot-button">
//                 Send
//               </button>
//             </form>
//           ) : (
//             <p>Waiting for the response...</p>
//           )}
//         </div>
//       </div>
//     )
//   );
// }

// export default Chatbot;
