// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";

// import ControlsModal from "./ControlsModal";
// import Emulator from "./Emulator";
// import { loadBinary } from "./utils";

// export const RunPageTest = (props) => {

//   // States
//   const [romData, setRomData] = useState(null);
//   const [isRunning, setIsRunning] = useState(false);
//   const [isPaused, setIsPaused] = useState(false);
//   const [isControlsModalOpen, setIsControlModalOpen] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);
//   const [loadedPercent, setLoadedPercent] = useState(null);
//   const [error, setError] = useState(null);
//   const [myData, setMyData] = useState(null);
//   const [isConfigLoaded, setIsConfigLoaded] = useState(false);

//   // Effects
//   useEffect(() => {
//     async function fetchGames() {
//       const response = await fetch("http://127.0.0.1:8000/api/games");
//       const datas = await response.json();

//       if (!datas) {
//         setError("Error : no datas found");
//       } else {
//         setMyData(datas);
//         setIsConfigLoaded(true);
//         load();
//         window.addEventListener("resize", layout());
//         layout();
//       }
//     }
//     fetchGames();
//   }, []);

//   // Functions
//   const load = () => {
//     if (myData) {
//       if (props.match.params.slug) {
//         const slug = props.match.params.slug;
//         const romInfo = myData.find((rom) => rom.slug === slug);

//         if (!romInfo) {
//           setError(`No such ROM: ${slug}`);
//           return;
//         }

//         this.currentRequest = loadBinary(
//           `http://127.0.0.1:8000/nes${romInfo.romPath}`,
//           (err, data) => {
//             console.log("[load callback]:", err, data);
//             if (err) {
//               setError(`Error loading ROM: ${err.message}`);
//             } else {
//               handleLoaded(data);
//             }
//           },
//           handleProgress()
//         );
//       } else if (props.location.state && props.location.state.file) {
//         let reader = new FileReader();
//         reader.readAsBinaryString(props.location.state.file);
//         reader.onload = (e) => {
//           this.currentRequest = null;
//           handleLoaded(reader.result);
//         };
//       } else {
//         setError("No ROM provided");
//       }
//     }
//   };

//   function handleLoaded(data) {
//     setIsRunning(true);
//     setIsLoading(true);
//     setRomData(data);
//   }

//   function handleProgress(e) {
//     if (e.lengthComputable) {
//       setLoadedPercent((e.loaded / e.total) * 100);
//     }
//   }

//   // componentWillUnmount() {
//   //   window.removeEventListener("resize", this.layout);
//   //   if (this.currentRequest) {
//   //     this.currentRequest.abort();
//   //   }
//   // }

//   function handlePauseResume() {
//     setIsPaused(!isPaused);
//   }

//   function layout() {
//     let navbarHeight = parseFloat(window.getComputedStyle(document.querySelector('.navbar')).height);
//     document.querySelector('.screen-ctn').style.height = `${
//       window.innerHeight - navbarHeight
//     }px`;
//     if (document.querySelector('.myEmulator')) {
//       document.querySelector('.myEmulator').fitInParent();
//     }
//   }

//   function toggleControlsModal() {
//     setIsControlModalOpen(!isControlsModalOpen);
//   }

//   return (
//     <div className="screen-container">
//       <div>
//         <nav className="navbar">
//           <ul className="flex flex-col justify-start mt-20 ml-10">
//             <li>
//               <Link to="/games">&lsaquo; Back to Games list</Link>
//             </li>

//             <li>
//               <button onClick={toggleControlsModal}>Controls</button>
//             </li>

//             <li>
//               <button onClick={handlePauseResume} disabled={!isRunning}>
//                 {isPaused ? "Resume" : "Pause"}
//               </button>
//             </li>
//           </ul>
//         </nav>

//         {isControlsModalOpen && (
//           <ControlsModal
//             isOpen={isControlsModalOpen}
//             toggle={toggleControlsModal}
//             keys={document.querySelector('.myEmulator').keyboardController.keys}
//             setKeys={document.querySelector('.myEmulator').keyboardController.setKeys}
//             promptButton={document.querySelector('.myEmulator').gamepadController.promptButton}
//             gamepadConfig={document.querySelector('.myEmulator').gamepadController.gamepadConfig}
//             setGamepadConfig={document.querySelector('.myEmulator').gamepadController.setGamepadConfig}
//           />
//         )}
//       </div>

//       {error ? (
//         "ERROR"
//       ) : (
//         <div className="screen-ctn">
//           {isLoading ? (
//             <div
//               value={loadedPercent}
//               style={{
//                 position: "absolute",
//                 width: "70%",
//                 left: "15%",
//                 top: "48%",
//               }}
//             />
//           ) : romData && isConfigLoaded && myData ? (
//             <Emulator
//               romData={romData}
//               paused={isPaused}
//               className='myEmulator'
//             />
//           ) : null}
//         </div>
//       )}

//       <div>
//         <h1>Trophy</h1>
//       </div>
//     </div>
//   );
// };
