import React, { Component } from 'react';
import './FourByFour.css'
import Boss from './boss'
//boundaries are 13 by 20
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
      yPos: 7,
      background: 'red',
      randomBlocks: [],
      randomsPosition: []

    }
    this.moveBox = this.moveBox.bind(this)
    this.resetUser = this.resetUser.bind(this)
  }
  componentDidMount() {
    let randomNum = Math.floor(Math.random() * Math.floor(75))
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
      case xPos === 3:
        let mappedRandomBlocks = this.state.randomBlocks.map((e, i) => {
          const randomNum = Math.floor(Math.random() * Math.floor(17))
          const randomNum2 = Math.floor(Math.random() * Math.floor(15))
          return (
            <div className='rando' key={i} name={`random${i}`} style={{ gridColumn: `${randomNum + 4}`, gridRow: `${randomNum2}`, background: 'green' }}></div>
          )
        })
        this.setState({ randomBlocks: mappedRandomBlocks })
        break
      case xPos === 3 && yPos === 12:
        this.setState({ background: 'blue' })
        break
      case xPos === 3 && yPos === 2:
        this.setState({ background: 'brown' })
        break
      case xPos >= 20:
        alert('WINNER WINNER CHICKEN DINNER')
        break
      case xPos > 3:
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
    idx === -1 ? '' : this.resetUser()
  }
  resetUser() {
    alert('loser')
    this.setState({
      xPos: 2,
      yPos: 7
    })
  }

  render() {
    const { xPos, yPos, background, } = this.state
    return (
      <div>
        <div className='wrapper'>
          <input value='' onKeyDown={this.moveBox} name='blox' style={{ gridColumn: `${xPos}`, gridRow: `${yPos}`, background: `${background}` }} />
          <div className='power' style={{ gridColumn: `${3}`, gridRow: `${12}`, background: 'blue' }}></div>
          <div className='power' style={{ gridColumn: `${3}`, gridRow: `${2}`, background: 'brown' }}></div>
          <div className='start'></div>
          <div className='finish'></div>
          {/* 20 */}
          <Boss
            resetUser={this.resetUser}
            direction='Horizontal'
            speed={350}
            id={1}
            xPos={9}
            yPos={8} />
          <Boss
            resetUser={this.resetUser}
            direction='Horizontal'
            speed={100}
            id={2}
            xPos={12}
            yPos={3} />
          <Boss
            resetUser={this.resetUser}
            direction='Horizontal'
            speed={100}
            id={3}
            xPos={10}
            yPos={13} />
          <Boss
            resetUser={this.resetUser}
            direction='Horizontal'
            speed={100}
            id={4}
            xPos={15}
            yPos={6} />
          <Boss
            resetUser={this.resetUser}
            speed={100}
            id={5}
            xPos={11}
            yPos={9} />
          <Boss
            resetUser={this.resetUser}
            speed={50}
            id={6}
            xPos={20}
            yPos={7} />
          <Boss
            resetUser={this.resetUser}
            speed={75}
            id={7}
            xPos={5}
            yPos={1} />

          {this.state.randomBlocks[0] === 'placeholder' ? '' : this.state.randomBlocks}
        </div>
      </div>
    )
  }
};
