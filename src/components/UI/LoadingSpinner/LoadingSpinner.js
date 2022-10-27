import classes from "./LoadingSpinner.module.css";
const LoadingSpinner = () => {
  return (
    <div className={classes.loadingSpinner}>
      <span class={classes.loader}></span>
    </div>
  );
};
export default LoadingSpinner;
