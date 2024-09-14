"use client";
import classes from "@/styles/popup.module.css";
import { Close } from "@mui/icons-material";

function Popup({ popupObj, handler }) {
  const handleClose = () => {
    if (handler) {
      handler({
        message: "",
        err: false,
      });
    }
  };

  return (
    <div
      className={`${classes.popup__wrapper} ${popupObj.err && classes.error}`}
    >
      <span className={classes.close__btn} onClick={handleClose}>
        <Close />
      </span>
      <p>{popupObj.message}</p>
    </div>
  );
}

export default Popup;
