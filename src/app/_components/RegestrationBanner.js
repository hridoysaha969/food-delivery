import classes from "@/styles/regestrationBanner.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import floatImg from "../../../public/float-img.png";
function RegestrationBanner() {
  const router = useRouter();
  return (
    <section className={classes.reg__section}>
      <div className="container">
        <div className={classes.reg__wrapper}>
          <Image
            src={floatImg}
            className={classes.plate__img}
            width={100}
            alt="Plate"
          />
          <div className={classes.text}>
            <h2>Do you Have a restaurant?</h2>
            <h4>Register here</h4>
            <button onClick={() => router.push("/restaurant")}>Sign up</button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default RegestrationBanner;
