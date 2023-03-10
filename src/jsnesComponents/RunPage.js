import React, { Component } from "react";
import { Link } from "react-router-dom";

import Emulator from "./Emulator";
import { loadBinary } from "./utils";

class RunPage extends Component {
   constructor(props) {
      super(props);
      this.state = {
         romData: null,
         running: false,
         paused: false,
         loading: true,
         error: null,
         myData: null,
         configLoaded: false,
      };
   }

   render() {
      return (
         <div className="screen-container">
            <div className="absolute top-10">
               <Link to="/games">&lsaquo; Back to Games list</Link>
            </div>

            {this.state.error ? (
               <div className="absolute top-10 left-10">
                  Error while trying to launch the emulator
               </div>
            ) : (
               <div ref={(el) => (this.screenContainer = el)}>
                  {this.state.romData &&
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
               }
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

   handleLoaded = (data) => {
      this.setState({ running: true, loading: false, romData: data });
   };

   layout = () => {
      this.screenContainer.style.height = `${window.innerHeight}px`;
      if (this.emulator) {
         this.emulator.fitInParent();
      }
   };
}

export default RunPage;
