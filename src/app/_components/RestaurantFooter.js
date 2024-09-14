import Link from "next/link";
import classes from "@/styles/footer.module.css";

function RestaurantFooter() {
  return (
    <footer className={classes.footer__section}>
      <div className="container">
        <p>
          &copy;All right reserved by{" "}
          <Link href="https://facebook.com/hridoysaha.official/">
            Hridoy Saha
          </Link>
        </p>
      </div>
    </footer>
  );
}

export default RestaurantFooter;
