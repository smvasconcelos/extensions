import * as crypto from 'crypto';

export function generateManhwaId(
	userId: string,
	name: string,
	card: boolean
): string {
	const normalizedName = name.toLowerCase().replace(/\s+/g, '');
	const hash = crypto
		.createHash('sha256')
		.update(`${userId}:${normalizedName}:${card}`)
		.digest('hex')
		.substring(0, 16);
	return hash;
}

export function generateHistoryId(
	userId: string,
	title: string,
	date: string
): string {
	const normalizedTitle = title.toLowerCase().replace(/\s+/g, '');
	const hash = crypto
		.createHash('sha256')
		.update(`${userId}:${normalizedTitle}:${date}`)
		.digest('hex')
		.substring(0, 16);
	return hash;
}
