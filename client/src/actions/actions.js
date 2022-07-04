import {} from "../constants/constants";

export const pageLoadAction = () => async (dispatch) => {
    try {
        dispatch({ type: PAGE_LOAD_REQUEST });
        const { data } = await axios.get( `${process.env.REACT_APP_URL}/api/course/?format=json`);
        dispatch({
            type: PAGE_LOAD_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: PAGE_LOAD_FAIL,
            payload:
            error.response && error.response.data
                ? {message: false}
                : {message: false},
        });
    }
};