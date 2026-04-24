import dotenv from "dotenv";
import AppError from "../errors/AppError.js";
import { normalizePublications } from "../utitls/publication.helper.js";

dotenv.config();

const api = process.env.PUBLICATION_API;
console.log("fetch api is : ", api);
export const searchPublicationsByOrcid = async (orcid) => {
	const res = await fetch(`${api}${orcid}`);
	if (!res.ok) {
		throw new AppError("Failed to fetch publication data", 502);
	}

	const data = await res.json();
	const normalizedData = normalizePublications(data);
	console.log("normalized data is services are: ", normalizedData);
	return normalizedData;
};
