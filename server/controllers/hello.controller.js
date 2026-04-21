import { getHelloMessage } from "../services/hello.service.js";

export function getHello(req, res) {
    try {
        const data = getHelloMessage();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong in test controller"
        });
    }
}