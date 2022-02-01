// SIMPLE STORE EXAMPLE

function createStore(reducer, initialState) {
  let state = initialState

  return {
    getState() {
      return { ...state }
    },
    dispatch(action) {
      const nextState = reducer(action, state)
    },
    subscribe(listener) {},
  }
}

function counter(action, state = { count: 0 }) {
  switch (action.type) {
    case 'UP':
      return {
        ...state,
        count: state.count + 1,
      }
    case 'DOWN':
      return {
        ...state,
        count: state.count - 1,
      }
    default:
      return state
  }
}

const store = createStore(counter)
store.dispatch({ type: 'UP' })
store.dispatch({ type: 'UP' })

console.log(store.getState())
store.dispatch({ type: 'DOWN' })
console.log(store.getState)
