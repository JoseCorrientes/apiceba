import Colors from "@colors/colors";
import {
  encryptDataService,
  decryptDataService,
} from "../services/encode.services.js";

const encryptData = async (req, res) => {
  const { data } = req.body;

  try {
    const encryptBank = await encryptDataService(data);
    return res.status(200).json({ dataSales: encryptBank });
  } catch (error) {
    console.log(Colors.bgBrightRed.black(`** Error: ${error.message} **`));
    return res.status(500).json({ message: "Internal server error" });
  }
};

const decryptData = async (req, res) => {
  const { userData, sessionID } = req.body;

  try {
    const encrypt = await decryptDataService(userData, sessionID);

    return res.status(200).json({ userSession: encrypt });
  } catch (error) {
    console.log(Colors.bgBrightRed.black(`** Error: ${error.message} **`));
    return res.status(500).json({ message: "Internal server error" });
  }
};

export { encryptData, decryptData };
