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
    document.getElementById('roleButton').innerHTML = "Verifying...";
    try {
      await fetch("/api/grant-role", {
        method: "POST",
      }).then(response => {
        if (response.status === 200) {
          alert("Request sent! Please allow a couple minutes for roles to be applied.");
        } else {
          alert("Authentication error! Please try again later.");
        }
        document.getElementById('roleButton').innerHTML = "Assign Roles";
      })

    } catch (e) {
      console.error(e);
    }
  }

  return (
      <div>
        <div className={styles.container} style={{ marginTop: 0 }}>
          <img src="/images/mob-circle-logo.png" alt="The Mob DAO Logo" className={styles.headerLogo}/>
          <SignIn />

          {address && session && (
              <div className={styles.collectionContainer}>
                <button id="roleButton" className={styles.mainButton} onClick={requestGrantRole}>Assign Roles</button>
              </div>
          )}
        </div>
      </div>
  );
};

export default Home;
