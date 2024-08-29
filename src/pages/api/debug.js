export default function handler(req, res) {
    res.status(200).json({ NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET });
}