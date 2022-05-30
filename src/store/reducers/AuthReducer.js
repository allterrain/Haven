
const INITIAL_STATE = {
    savedTimeData: '',
  
};


export default (state = INITIAL_STATE, action) => {
    switch (action.type) {

        // case actionTypes.HANDLE_INTERVAL_TIME:
        //     return {
        //         ...state,
        //         selectedTimeInterval: action.payload
        //     }

        default:
            return state;
            
    }
} 