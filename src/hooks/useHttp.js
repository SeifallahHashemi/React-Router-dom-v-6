import { useCallback, useReducer } from 'react'

const httpReducer = (state, action) => {
    if (action.type === 'SEND') {
        return {
            status: "pending",
            data: null,
            error: null
        }
    }
    if (action.type === 'SUCCESS') {
        return {
            status: "complete",
            data: action.responseData,
            error: null
        }
    }
    if (action.type === 'ERROR') {
        return {
            status: "complete",
            data: null,
            error: action.errorMessage
        }
    }
    return state;
}
const useHttp = (requestFn, startWithPending = false) => {
  const [httpState, dispatch] = useReducer(httpReducer, {
    status: startWithPending ? 'Pending' : null,
    data: null,
    error: null
  });
  const sendRequest = useCallback(async (requestData) => {
    dispatch({ type: 'SEND'})
    try {
        const responseData = await requestFn(requestData);
        dispatch({ type: 'SUCCESS', responseData})
    } catch (error) {
        dispatch({ type: 'ERROR', errorMessage: error.message || 'Something Went Wrong'})
    }
  }, [requestFn])
  return {
    sendRequest,
    ...httpState
  }
}

export default useHttp
