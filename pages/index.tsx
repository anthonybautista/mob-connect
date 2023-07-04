import { useAddress } from "@thirdweb-dev/react";
import { useSession } from "next-auth/react";
import SignIn from "../components/SignIn";
import type { NextPage } from "next";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const address = useAddress();
  const { data: session } = useSession();

  async function requestGrantRole() {
    // Then make a request to our API endpoint.
    try {
      const response = await fetch("/api/grant-role", {
        method: "POST",
      });
      alert("Request sent! Please allow a couple minutes for roles to be applied.");
    } catch (e) {
      console.error(e);
    }
  }

  return (
      <div className={styles.wrapper}>
        <div className={styles.container} style={{ marginTop: 0 }}>
          <img src="/images/mob-circle-logo.png" alt="The Mob DAO Logo" className={styles.headerLogo}/>
          <SignIn />

          {address && session && (
              <div className={styles.collectionContainer}>
                <button className={styles.mainButton} onClick={requestGrantRole}>Assign Roles</button>
              </div>
          )}
        </div>
      </div>
  );
};

export default Home;
