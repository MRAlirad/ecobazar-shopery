import Card from '../Card';
import Input from '../Input';
import Textarea from '../Textarea';

const TitleDescription = () => {
	return (
		<Card>
			<Input name="title" label="Title" placeholder="enter the title" />
			<Textarea name="description" label="Description" placeholder="enter the description" />
		</Card>
	);
};

export default TitleDescription;
