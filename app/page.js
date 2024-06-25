"use client";
import { useState, useEffect } from "react";
import { useSpring, animated } from "@react-spring/web";
import { FaCopy } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState();
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const passwordAnimation = useSpring({
    opacity: password ? 1 : 0,
    transform: password ? "scale(1)" : "scale(0.5)",
    config: { tension: 200, friction: 15 },
  });

  const generatePassword = () => {
    const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
    const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numberChars = "0123456789";
    const symbolChars = "!@#$%^&*()_+[]{}|;:,.<>?";

    let characterPool = lowercaseChars;
    if (includeUppercase) characterPool += uppercaseChars;
    if (includeNumbers) characterPool += numberChars;
    if (includeSymbols) characterPool += symbolChars;

    let newPassword = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characterPool.length);
      newPassword += characterPool[randomIndex];
    }

    setPassword(newPassword);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    toast.success("Password copied to clipboard!");
  };
  useEffect(() => {
    const handleMouseMove = (event) => {
      setMousePos({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 p-6"
      style={{
        background: `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, rgba(255, 255, 0, 0.5), rgba(255, 165, 0, 0.5) 60%)`,
      }}
    >
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Password Generator
        </h1>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Password Length
          </label>
          <input
            type="number"
            value={length}
            onChange={(e) => setLength(e.target.value)}
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md text-black"
            min="1"
            max="30"
          />
        </div>
        <div className="mb-4">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              checked={includeUppercase}
              onChange={(e) => setIncludeUppercase(e.target.checked)}
              className="form-checkbox text-blue-600"
            />
            <span className="ml-2 text-black">Include Uppercase Letters</span>
          </label>
        </div>
        <div className="mb-4">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              checked={includeNumbers}
              onChange={(e) => setIncludeNumbers(e.target.checked)}
              className="form-checkbox text-blue-600"
            />
            <span className="ml-2 text-black">Include Numbers</span>
          </label>
        </div>
        <div className="mb-4">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              checked={includeSymbols}
              onChange={(e) => setIncludeSymbols(e.target.checked)}
              className="form-checkbox text-blue-600"
            />
            <span className="ml-2 text-black">Include Symbols</span>
          </label>
        </div>
        <button
          onClick={generatePassword}
          className="w-full bg-gradient-to-r from-green-400 to-blue-500 text-white py-3 px-4 rounded-md text-lg font-semibold shadow-md hover:from-green-500 hover:to-blue-600 transition duration-200"
        >
          Generate Password
        </button>
        {password && (
          <animated.div
            style={passwordAnimation}
            className="mt-6 p-4 bg-gray-100 rounded-lg shadow-inner"
          >
            <div className="flex justify-between items-center">
              <div className="break-words overflow-wrap">
                <h2 className="text-lg font-medium text-gray-700">
                  Generated Password
                </h2>
                <p className="text-xl font-mono mt-2 text-black break-words overflow-wrap">
                  {password}
                </p>
              </div>
              <button
                onClick={copyToClipboard}
                className="text-gray-500 hover:text-gray-700 transition duration-200"
                title="Copy to clipboard"
              >
                <FaCopy size={24} />
              </button>
            </div>
          </animated.div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
}
