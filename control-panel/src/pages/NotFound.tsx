import Page from '../components/Page';
import Button from '../components/Button';
import NotFoundImage from '../../public/pics/NotFound.svg';

const NotFound = () => {
	return (
		<Page type="list">
			<div className="flex items-center gap-4 w-full h-full justify-center">
				<div className="img-box w-60 h-60 min-w-fit">
					<img
						src={NotFoundImage}
						alt="404 error - no page found"
					/>
				</div>
				<div className="grid gap-6 justify-center justify-items-center sm:justify-items-start">
					<p className="text-2xl text-gray-600 text-center sm:text-start">PAGE NOT FOUND</p>
					<p className="text">Check the URL address and try again</p>
					<Button
						text="Go back to Home"
						to="/"
					/>
				</div>
			</div>
		</Page>
	);
};

export default NotFound;
