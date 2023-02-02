import React, { Component } from "react";
import { Link } from "react-router-dom";

import ControlsModal from "./ControlsModal";
import Emulator from "./Emulator";
import { loadBinary } from "./utils";

import "./Screen.css";

/*
 * The UI for the emulator. Also responsible for loading ROM from URL or file.
 */
class RunPage extends Component {
  constructor(props) {

    super(props);
    this.state = {
      romName: null,
      romData: null,
      running: false,
      paused: false,
      controlsModalOpen: false,
      loading: true,
      loadedPercent: 3,
      error: null,
      myData: null,
      configLoaded: false
    };
  }



  render() {
    console.log('rendering...', this.state);
    return (
      <div>
        <div className="screen-container bg-slate-900">
          <nav ref={el => this.navbar = el}>
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
                <button onClick={this.handlePauseResume} disabled={!this.state.running}>
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
              gamepadConfig={this.emulator.gamepadController.gamepadConfig}
              setGamepadConfig={this.emulator.gamepadController.setGamepadConfig}
            />
          )}
        </div>

        {this.state.error ? (
          'ERROR'
        ) : (
          <div ref={el => this.screenContainer = el}>
            {this.state.loading ? (
              <div
                value={this.state.loadedPercent}
                style={{
                  position: "absolute",
                  width: "70%",
                  left: "15%",
                  top: "48%"
                }}
              />
            ) : this.state.romData && this.state.configLoaded && this.state.myData ? (
              <Emulator
                romData={this.state.romData}
                paused={this.state.paused}
                ref={emulator => this.emulator = emulator}
              />
            ) : null}

          </div>
        )}
      </div>
    );
  }

  componentDidMount() {
    console.log('CDM')
    fetch("http://127.0.0.1:8000/api/games")
      .then(response => {
        const output = response.json();
        console.log('CDM 0', output);
        return output;
      })
      .then(myData => {
        console.log('CDM 1', { myData })

        this.setState({ myData, configLoaded: true }, () => {
          this.load(); // myData est à jour
        });
      })
      .catch(error => {
        console.log('ERRORLOL');
        console.error(error)
        this.setState({ error })
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
    console.log('[Load] 1')
    if (this.state.myData) {
      console.log('[Load] 2 mydataFound')
      if (this.props.match.params.slug) {
        console.log('[Load] 3 after params slug', this.props.match.params.slug)
        const slug = this.props.match.params.slug;
        const isLocalROM = /^local-/.test(slug);
        const romHash = slug.split("-")[1];
        const romInfo = this.state.myData.find(rom => rom.slug === slug);

        if (!romInfo) {
          console.log('[Load] 4 rom not found');
          this.setState({ error: `No such ROM: ${slug}` });
          return;
        }

        if (isLocalROM) {
          console.log('[Load] 5 pk t la toi ?')
          this.setState({ romName: romInfo.name });
          const localROMData = localStorage.getItem("blob-" + romHash);
          this.handleLoaded(localROMData);
        } else {
          console.log('[Load] 5, le vrai')
          this.setState({ romName: romInfo.description });
          this.currentRequest = loadBinary(
            // `http://localhost:3000${romInfo.romPath}`,
            // `https://retrophy.fun${romInfo.romPath}`,
            // `https://api.retrophy.fun${romInfo.romPath}`,
            `http://127.0.0.1:8000/nes${romInfo.romPath}`,
            // localhost:3000/roms/super_mario_bros_1.nes -> OK (en locale ca marche nickel)
            // https://retrophy.fun/roms/super_mario_bros_1.nes -> KO ? mais problème double render (strict mode) mais ca doit OK
            // https://api.retrophy.fun/roms/super_mario_bros_1.nes -> ca doit marcher !
            (err, data) => {
              console.log('[load callback]:', err, data)
              if (err) {
                this.setState({ error: `Error loading ROM: ${err.message}` });
              } else {
                this.handleLoaded(data);
              }
            },
            this.handleProgress
          );
        }
      } else if (this.props.location.state && this.props.location.state.file) {
        let reader = new FileReader();
        reader.readAsBinaryString(this.props.location.state.file);
        reader.onload = e => {
          this.currentRequest = null;
          this.handleLoaded(reader.result);
        };
      } else {
        this.setState({ error: "No ROM provided" });
      }
      console.log('[Load]: DONE')
    }
  };

  handleProgress = e => {
    if (e.lengthComputable) {
      this.setState({ loadedPercent: (e.loaded / e.total) * 100 });
    }
  };

  handleLoaded = data => {
    this.setState({ running: true, loading: false, romData: data });
  };

  handlePauseResume = () => {
    this.setState({ paused: !this.state.paused });
  };

  layout = () => {
    let navbarHeight = parseFloat(window.getComputedStyle(this.navbar).height);
    this.screenContainer.style.height = `${window.innerHeight -
      navbarHeight}px`;
    if (this.emulator) {
      this.emulator.fitInParent();
    }
  };

  toggleControlsModal = () => {
    this.setState({ controlsModalOpen: !this.state.controlsModalOpen });
  };
}

export default RunPage;
