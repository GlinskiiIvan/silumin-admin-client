import React from 'react';
import AppRouter from '../AppRouter/AppRouter';
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../store/store";
import {checkThunk} from "../../store/slices/user";

function App() {

  const dispatch = useDispatch<AppDispatch>();

  React.useEffect(() => {
    dispatch(checkThunk({}));
  }, []);

  return (
    <AppRouter />
  );
}

export default App;
