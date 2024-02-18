import { getUser } from "@/auth.config"
import { NextApiRequest, NextApiResponse } from "next"
import { PKPass } from 'passkit-generator'
import path from 'path';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const user = await getUser(req)

  if (!user) {
    return res.status(401).json({ message: "Not authorized." })
  }

  if (req.method !== 'GET') {
    return res.status(405).end(`Method ${req.method} Not Allowed`)
  }

  // TODO: Check user.address against membership contract
  // to verify that the user is a member, and get the tokenId
  const tokenId = '1'

  if (!tokenId) {
    return res.status(400).json({ error: 'Token Id not present' })
  }

  switch (req.method) {
    case 'GET':
      console.log(`GET /api/collectibles/getPass`)
      return await handleGet(res, user.address, tokenId)
    default:
      console.log('Method not allowed')
      return res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

// - Private interface

async function handleGet(
  res: NextApiResponse,
  userAddress: string,
  tokenId: string,
) {
  const contractAddress = process.env.DROP_CONTRACT_ADDRESS

  try {
    const passBuffer = await createPass(userAddress, contractAddress, tokenId)
    res.appendHeader('Content-Type', 'application/vnd.apple.pkpass')
    res.send(passBuffer)
  } catch (error) {
    console.log(error)
    if (error instanceof Error) {
      res.status(400).json({ error: error.message })
    } else {
      res.status(500).json({ error: "Internal Server Error" })
    }
  }
}

async function createPass(
  userAddress: string,
  contractAddress: string,
  tokenId: string,
): Promise<Buffer> {
  const modelPath = path.join(process.cwd(), 'public', 'examplePass.pass')

  const pass = await PKPass.from({
    model: modelPath,
    certificates: {
      wwdr: Buffer.from(process.env.PKPASS_WWDR_CERTIFICATE_BASE_64, 'base64'),
      signerCert: Buffer.from(process.env.PKPASS_SIGNER_CERTIFICATE_BASE_64, 'base64'),
      signerKey: Buffer.from(process.env.PKPASS_SIGNER_KEY_BASE_64, 'base64'),
      signerKeyPassphrase: process.env.PKPASS_SIGNER_KEY_PASSWORD
    },
  }, {
    description: 'Cool Shop',
    labelColor: "rgb(255, 255, 255)",
    foregroundColor: "rgb(255, 255, 255)",
    backgroundColor: "rgb(60, 65, 76)",
  });

  pass.setBarcodes({
      format: 'PKBarcodeFormatQR',
      message: `${userAddress}|${contractAddress}|${tokenId}`,
      messageEncoding: 'iso-8859-1',
    }
  )
  // pass.setNFC({
  //   message: `${userAddress}|${contractAddress}|${tokenId}`,
  //   encryptionPublicKey: process.env.PKPASS_NFC_ENCRYPTION_PUBLIC_KEY,
  // })

  return pass.getAsBuffer();
}

