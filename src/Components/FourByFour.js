import React, { Component } from 'react';
import './FourByFour.css'
import Boss from  './boss'

// left 37;
// up 38;
// right 39;
//down 40;
export default class FourByFour extends Component {
  constructor(props) {
    super(props);
    this.state = {
      num: 1,
      xPos: 2,
      yPos: 2,
      background: 'red',
      randomBlocks: [],
      randomsPosition: []

    }
    this.moveBox = this.moveBox.bind(this)
  }
  componentDidMount() {
    let randomNum = Math.floor(Math.random() * Math.floor(20))
    let newArr = []
    for (let i = 0; i <= randomNum; i++) {
      newArr.push('placeholder')
    }
    this.setState({
      randomBlocks: newArr
    })

  }
  
  moveBox(e) {
    switch (e.keyCode) {
      case 68:
        this.setState({ xPos: ++this.state.xPos })
        break;
      case 83:
        this.setState({ yPos: ++this.state.yPos })
        break;
      case 65:
        this.setState({ xPos: --this.state.xPos })
        break;
      case 87:
        this.setState({ yPos: --this.state.yPos })
        break;
    }
    this.checkCurrentPossition()
  }
  checkCurrentPossition() {
    const { xPos, yPos } = this.state
    switch (true) {
      case xPos === 10:
        let mappedRandomBlocks = this.state.randomBlocks.map((e, i) => {
          const randomNum = Math.floor(Math.random() * Math.floor(9))
          const randomNum2 = Math.floor(Math.random() * Math.floor(10))
          return (
            <div className='rando' key={i} name={`random${i}`} style={{ gridColumn: `${randomNum + 11}`, gridRow: `${randomNum2}`, background: 'green' }}></div>
          )
        })
        this.setState({ randomBlocks: mappedRandomBlocks })
        break
      case xPos === 9 && yPos === 10:
        this.setState({ background: 'blue' })
        break
      case xPos === 9 && yPos === 1:
        this.setState({ background: 'brown' })
        break
      case xPos > 9:
        this.getRandomsPosition()
        this.checkForConflict()
        break
    }
  }
  getRandomsPosition() {

    const randomsPos = []
    for (let i = 0; i < this.state.randomBlocks.length; i++) {
      randomsPos.push(document.getElementsByName(`random${i}`)[0].getBoundingClientRect())
    }
    this.setState({
      randomsPosition: randomsPos
    })

  }
  checkForConflict() {
    const currentPos = document.getElementsByName('blox')[0].getBoundingClientRect()
    let idx = this.state.randomsPosition.findIndex(e => e.x === currentPos.x && e.y === currentPos.y)
    idx === -1 ? '' : alert('loser')
  }

  render() {
    const { xPos, yPos, background,  } = this.state
    return (
      <div>
        <h1>FourByFour</h1>
        <div className='wrapper'>
          <input value='' onKeyDown={this.moveBox} name='blox' style={{ gridColumn: `${xPos}`, gridRow: `${yPos}`, background: `${background}` }} />
          <div className='power' style={{ gridColumn: `${9}`, gridRow: `${10}`, background: 'blue' }}></div>
          <div className='power' style={{ gridColumn: `${9}`, gridRow: `${1}`, background: 'brown' }}></div>
          <Boss
          direction = 'Horizontal'
          speed={50}
          id = {1} 
          xPos = {13}
          yPos = {8}/>
          <Boss
          speed={100}
          id ={2}
          xPos = {15}
          yPos = {3}/>
          <Boss
          speed = {100}
          id ={3}
          xPos = {11}
          yPos = {9}/>
          <Boss
          speed = {350}
          id ={4}
          xPos = {20}
          yPos = {7}/>
          {this.state.randomBlocks[0] === 'placeholder' ? '' : this.state.randomBlocks}
        </div>
      </div>
    )
  }
};
