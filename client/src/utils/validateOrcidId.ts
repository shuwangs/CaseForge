export const validateOrcidId = (orcid: string): boolean => {
	const cleaned = orcid.trim();
	const pattern = /^\d{4}-\d{4}-\d{4}-\d{3}[\dX]$/;

	if (!pattern.test(cleaned)) return false;

	// Checksum
	// According to https://support.orcid.org/hc/en-us/articles/360006897674-Structure-of-the-ORCID-Identifier
	const digits: string = cleaned.replace(/-/g, "");
	let total: number = 0;
	for (let i: number = 0; i < 15; i++) {
		total = (total + Number(digits[i])) * 2;
	}
	const remainder: number = total % 11;
	const result: number = (12 - remainder) % 11;
	const checkDigit: string = result === 10 ? "X" : String(result);

	return checkDigit === digits[15];
};
