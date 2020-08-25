class StateMachine {
    constructor(states) {
        this.empty = {
            update: () => {},
            render: () => {},
            exit: () => {},
            enter: () => {}
        }
        this.states = states || {}
        this.currentState = this.empty
        this.currentStateName = null
    }

    changeState = (stateName, enterParams = {}) => {
        this.currentState.exit()
        this.currentState = this.states[stateName]
        this.currentStateName = stateName
        this.currentState.enter(enterParams)
    }

    update = () => {
        this.currentState.update()
    }

    render = () => {
        this.currentState.render()
    }
}