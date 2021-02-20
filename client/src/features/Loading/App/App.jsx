import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import classes from './App.module.css';

const App = () => (
  <Loader
    className={classes.Loader}
    type="Oval"
    color="#00BFFF"
    height={100}
    width={100}
  />
)

export default App;