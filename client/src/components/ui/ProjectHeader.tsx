type ProjectHeaderProps = {
	title: string | null;
	description?: string;
};

const ProjectHeader = ({ title, description }: ProjectHeaderProps) => {
	return (
		<div>
			<h1 className="text-sm font-semibold text-gray-500">
				{title || "Untitled Project"}
			</h1>

			{description && (
				<p className="mt-1 text-xs font-semibold text-[var(--color-primary)]">
					{description}
				</p>
			)}
		</div>
	);
};

export default ProjectHeader;
