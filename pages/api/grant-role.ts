import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";
import { getUser } from "./thirdweb-auth/[...thirdweb]";
import SHA3 from 'crypto-js/sha3';

export default async function grantRole(
    req: NextApiRequest,
    res: NextApiResponse
) {
    // Get data from thirdweb auth, fail request if not signed in
    const user = await getUser(req);

    if (!user) {
        return res.status(401).json({ error: "Wallet not authorized!" });
    }

    // Get the Next Auth session so we can use the user ID as part of the discord API request
    const session = await getServerSession(req, res, authOptions);

    if (!session) {
        res.status(401).json({ error: "Not logged in" });
        return;
    }


    const encryptId = (addr, name, id, str) => {
        const encoded = SHA3(addr+name+id+str);

        return encodeURIComponent(encoded.toString());
    }

    // contract calls
    const response = await fetch(
      // Discord Developer Docs for this API Request: https://discord.com/developers/docs/resources/guild#add-guild-member-role
   `http://3.83.222.82:3000/update-roles`,
      //`http://localhost:80/update-roles`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({"address": user?.address!,
                                    "user": session.user.name,
                                    "userId": session.userId,
                                    "secret": encryptId(user?.address!, session.user.name, session.userId, process.env.AUTH_SECRET_2)}),
        method: "POST",
      }
    )

    if (response.ok) {
        res.status(200).json({ error: "None" });
    }

    // Something went wrong granting the role, but they do have an NFT
    else {
        res
          .status(500)
          .json({ error: "Error granting role, are you in the server?" });
    }
}