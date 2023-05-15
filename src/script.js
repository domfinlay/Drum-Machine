class DrumMachine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      on: true,
      display: ""
    };
    this.updateDisplay = this.updateDisplay.bind(this);
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyDown);
  }
  
  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown);
  }
  
  handleKeyDown(event) {
     const key = event.key.toUpperCase();
     const validKeys = ["Q", "W", "E", "A", "S", "D", "Z", "X", "C"];
     if (validKeys.includes(key)) {
      const drumPad = document.getElementById(`${key}`);
      drumPad.click();
     }
  } 
  
  updateDisplay(text) {
    this.setState({ display: text });
  }

  render() {
    return (
      <div id="drum-machine">
        <div id="machine-right">
          <table id="pad-grid">
            <tr class="pad-row">
              <DrumPad
                press="Q"
                sampleName="Heater 1"
                audioLink="https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3"
                updateDisplay={this.updateDisplay}
              />
              <DrumPad
                press="W"
                sampleName="Heater 2"
                audioLink="https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3"
                updateDisplay={this.updateDisplay}
              />
              <DrumPad
                press="E"
                sampleName="Heater 3"
                audioLink="https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3"
                updateDisplay={this.updateDisplay}
              />
            </tr>
            <tr class="pad-row">
              <DrumPad
                press="A"
                sampleName="Heater 4"
                audioLink="https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3"
                updateDisplay={this.updateDisplay}
              />
              <DrumPad
                press="S"
                sampleName="Clap"
                audioLink="https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3"
                updateDisplay={this.updateDisplay}
              />
              <DrumPad
                press="D"
                sampleName="Open HH"
                audioLink="https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3"
                updateDisplay={this.updateDisplay}
              />
            </tr>
            <tr class="pad-row">
              <DrumPad
                press="Z"
                sampleName="Kick n' Hat"
                audioLink="https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3"
                updateDisplay={this.updateDisplay}
              />
              <DrumPad
                press="X"
                sampleName="Kick"
                audioLink="https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3"
                updateDisplay={this.updateDisplay}
              />
              <DrumPad
                press="C"
                sampleName="Closed HH"
                audioLink="https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3"
                updateDisplay={this.updateDisplay}
              />
            </tr>
          </table>
        </div>
        <span id="machine-right">
          <h1 id="title">DRUM MACHINE</h1>
          <div id="display"><p>{this.state.display}</p></div>
          <VolumeSlider />
        </span>
      </div>
    );
  }
}

class DrumPad extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sampleName: "",
      audioLink: "",
      press: ""
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    console.log("clicked", this.state.sampleName, this.state.press);
    this.props.updateDisplay(this.state.sampleName);
    var sound = document.getElementById(this.state.press);
    sound.currentTime = 0;
    sound.play();
  }

  componentDidMount() {
    this.setState({ press: this.props.press });
    this.setState({ audioLink: this.props.audioLink });
    this.setState({ sampleName: this.props.sampleName });
  }
  
  componentWillUnmount() {
    
  }
  
  render() {
    return (
      <td
        className="drum-pad"
        id={this.state.sampleName}
        onClick={this.handleClick}
      >
        {this.state.press}
        <audio
          src={this.state.audioLink}
          className="clip"
          id={this.state.press}
          type="audio/mp3"
        ></audio>
      </td>
    );
  }
}

class VolumeSlider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      volume: 50
    }
  }
  
  changeVolume = (value) => {
    this.setState({
      volume: value
    });
    const audioElements = document.getElementsByClassName("clip");
    for (let i = 0; i < audioElements.length; i++) {
      audioElements[i].volume = value;
    }
  }
  
  render() {
    return (
      <div id="volume-section">
        <label id="volume-text">VOLUME:</label>
        <input 
          type="range" 
          id="volume-slider" 
          min="0"
          max="1"
          step="0.01"
          value={this.state.volume}
          onChange={(event) => this.changeVolume(event.target.value)} />
       </div>
    )
  }
}

ReactDOM.render(
  <div>
    <DrumMachine />
  </div>,
  document.getElementById("container")
);
