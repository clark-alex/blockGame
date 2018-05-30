import React, { Component } from 'react';

export default class Boss extends Component {
    constructor(props) {
        super(props);
        this.state = {
            xPos: 0,
            yPos: 0,
            incToggle: 1,

        }
    }
    componentDidMount() {
        this.setState({ xPos: this.props.xPos, yPos: this.props.yPos })
        setInterval(() => this.moveBoss(), this.props.speed)
    }
    moveBoss() {
        if (this.props.direction === 'Horizontal') {
            if (this.state.xPos === 3) this.setState({ incToggle: 1 })
            else if (this.state.xPos === 20) this.setState({ incToggle: -1 })
            this.setState({ xPos: this.state.xPos + this.state.incToggle })
        } 
        else {
            if (this.state.yPos === 15) this.setState({ incToggle: -1 })
            else if (this.state.yPos === 1) this.setState({ incToggle: 1 })
            this.setState({ yPos: this.state.yPos + this.state.incToggle })
        }
        this.checkForConflict()
    }
    checkForConflict() {
        const { id } = this.props
        const currentPos = document.getElementsByName('blox')[0].getBoundingClientRect()
        const bossCurrentPos = document.getElementsByName(`boss${id}`)[0].getBoundingClientRect()
        bossCurrentPos.x === currentPos.x && bossCurrentPos.y === currentPos.y ? this.props.resetUser() : ''
    }
  

    render() {
        const { xPos, yPos } = this.state
        const { id } = this.props
        return (
            <div name={`boss${id}`} className='boss' style={{ gridColumn: `${xPos}`, gridRow: `${yPos}`, background: `black`, borderRadius: '50%' }} >0.0</div>
        )
    }
};
