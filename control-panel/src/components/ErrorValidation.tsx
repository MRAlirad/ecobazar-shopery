const ErrorValidation = (validationErrors: string[]) => {
	return (
		<div>
			{validationErrors.map((error, index) => (
				<p
					key={index}
					className="flex items-center gap-3"
				>
					<span className="flex w-1.5 h-1.5 min-w-1.5 rounded-full bg-white"></span>
					<span>{error}</span>
				</p>
			))}
		</div>
	);
};

export default ErrorValidation;
