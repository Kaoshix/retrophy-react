import React, { Component } from "react";
import { Link } from "react-router-dom";

import ControlsModal from "./ControlsModal";
import Emulator from "./Emulator";
import { loadBinary } from "./utils";

class RunPage extends Component {
   constructor(props) {
      super(props);
      this.state = {
         romData: null,
         running: false,
         paused: false,
         controlsModalOpen: false,
         loading: true,
         loadedPercent: 3,
         error: null,
         myData: null,
         configLoaded: false,
      };
   }


   render() {
      return (
         <div className="screen-container">
            <div>
               <nav ref={(el) => (this.navbar = el)} className="absolute top-0">
                  <ul className="flex flex-col justify-start mt-20 ml-10">
                     <li>
                        <Link to="/games">&lsaquo; Back to Games list</Link>
                     </li>

                     <li>
                        <button onClick={this.toggleControlsModal}>
                           Controls
                        </button>
                     </li>

                     <li>
                        <button
                           onClick={this.handlePauseResume}
                           disabled={!this.state.running}
                        >
                           {this.state.paused ? "Resume" : "Pause"}
                        </button>
                     </li>
                  </ul>
               </nav>

               {/* TODO: lift keyboard and gamepad state up */}
               {this.state.controlsModalOpen && (
                  <ControlsModal
                     isOpen={this.state.controlsModalOpen}
                     toggle={this.toggleControlsModal}
                     keys={this.emulator.keyboardController.keys}
                     setKeys={this.emulator.keyboardController.setKeys}
                     promptButton={this.emulator.gamepadController.promptButton}
                     gamepadConfig={
                        this.emulator.gamepadController.gamepadConfig
                     }
                     setGamepadConfig={
                        this.emulator.gamepadController.setGamepadConfig
                     }
                  />
               )}
            </div>

            {this.state.error ? (
               "ERROR"
            ) : (
               <div ref={(el) => (this.screenContainer = el)}>
                  {this.state.loading ? (
                     <div
                        value={this.state.loadedPercent}
                        style={{
                           position: "absolute",
                           width: "70%",
                           left: "15%",
                           top: "48%",
                        }}
                     />
                  ) : this.state.romData &&
                    this.state.configLoaded &&
                    this.state.myData ? (
                     <Emulator
                        romData={this.state.romData}
                        paused={this.state.paused}
                        ref={(emulator) => (this.emulator = emulator)}
                     />
                  ) : null}
               </div>
            )}

            {window.innerWidth < 768 ? (
               <div className="flex justify-between">
                  <div>CROSS</div>
                  <div className="flex">
                     <button className="bg-red-500 h-14 w-14 rounded-full flex justify-center items-center mx-3">
                        <p className="text-3xl">B</p>
                     </button>
                     <button className="bg-green-500 h-14 w-14 rounded-full flex justify-center items-center mx-3">
                        <p className="text-3xl">A</p>
                     </button>
                  </div>
               </div>
            ) : (
               ""
            )}
         </div>
      );
   }

   componentDidMount() {
      fetch("http://127.0.0.1:8000/api/games")
         .then((response) => {
            const output = response.json();
            return output;
         })
         .then((myData) => {
            this.setState({ myData, configLoaded: true }, () => {
               this.load(); // myData est à jour
            });
         })
         .catch((error) => {
            console.error(error);
            this.setState({ error });
         });
      window.addEventListener("resize", this.layout);
      this.layout();
      // this.load();
   }

   componentWillUnmount() {
      window.removeEventListener("resize", this.layout);
      if (this.currentRequest) {
         this.currentRequest.abort();
      }
   }

   load = () => {
      if (this.state.myData) {
         if (this.props.match.params.slug) {
            const slug = this.props.match.params.slug;
            const romInfo = this.state.myData.find((rom) => rom.slug === slug);

            if (!romInfo) {
               this.setState({ error: `No such ROM: ${slug}` });
               return;
            }

            this.currentRequest = loadBinary(
               `http://127.0.0.1:8000/nes${romInfo.romPath}`,
               (err, data) => {
                  if (err) {
                     this.setState({
                        error: `Error loading ROM: ${err.message}`,
                     });
                  } else {
                     this.handleLoaded(data);
                  }
               },
               this.handleProgress
            );
         } else if (
            this.props.location.state &&
            this.props.location.state.file
         ) {
            let reader = new FileReader();
            reader.readAsBinaryString(this.props.location.state.file);
            reader.onload = (e) => {
               this.currentRequest = null;
               this.handleLoaded(reader.result);
            };
         } else {
            this.setState({ error: "No ROM provided" });
         }
      }
   };

   handleProgress = (e) => {
      if (e.lengthComputable) {
         this.setState({ loadedPercent: (e.loaded / e.total) * 100 });
      }
   };

   handleLoaded = (data) => {
      this.setState({ running: true, loading: false, romData: data });
   };

   handlePauseResume = () => {
      this.setState({ paused: !this.state.paused });
   };

   layout = () => {
      let navbarHeight = parseFloat(
         window.getComputedStyle(this.navbar).height
      );
      this.screenContainer.style.height = `${
         window.innerHeight - navbarHeight
      }px`;
      if (this.emulator) {
         this.emulator.fitInParent();
      }
   };

   toggleControlsModal = () => {
      this.setState({ controlsModalOpen: !this.state.controlsModalOpen });
   };
}

export default RunPage;
