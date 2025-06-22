export const statuses: { value: number; label: string; badge: 'green' | 'red' | 'gray' }[] = [
	{
		value: 1,
		label: 'Active',
		badge: 'green',
	},
	{
		value: 2,
		label: 'Deactive',
		badge: 'red',
	},
	{
		value: 3,
		label: 'Archived',
		badge: 'gray',
	},
];

export const orderStatuses: { value: string; label: string; badge: string }[] = [
	{
		value: 'pending',
		label: 'Pending',
		badge: 'blue',
	},
	{
		value: 'sending',
		label: 'Sending',
		badge: 'yellow',
	},
	{
		value: 'finish',
		label: 'Finished',
		badge: 'green',
	},
	{
		value: 'cancel',
		label: 'Canceled',
		badge: 'red',
	},
];
