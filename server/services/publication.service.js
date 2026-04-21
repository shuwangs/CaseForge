import dotenv from "dotenv";

dotenv.config();

const api = process.env.PUBLICATION_API;
console.log("fetch api is : ", api);
export const searchPublicationsByOrcid = async (orcid) => {
	console.log("requested orcid id is: ", orcid);
	const res = await fetch(`${api}${orcid}`);
	console.log("result in publication service:", res);
	const data = await res.json();
	return data;
};
