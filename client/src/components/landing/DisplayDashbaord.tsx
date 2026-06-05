const Displaydashboard = () => {
	return (
		<div>
			<div className="mb-4 flex items-center justify-between border-b border-gray-100 pb-3 px-8">
				<div>
					<p className="text-xs font-medium uppercase text-gray-400">
						Citation Evidence
					</p>
					<p className="text-sm font-semibold text-[var(--color-primary)]">
						Research Impact Summary
					</p>
				</div>
				<span className="rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-[var(--color-accent)]">
					Ready
				</span>
			</div>

			<div className="space-y-3">
				<div className="h-2 w-3/4 rounded bg-gray-200" />
				<div className="h-2 w-full rounded bg-gray-100" />
				<div className="h-2 w-5/6 rounded bg-gray-100" />
			</div>

			<div className="mt-5 rounded-lg border border-gray-100 bg-gray-50 p-4">
				<div className="mb-3 flex items-center justify-between">
					<p className="text-xs font-medium text-gray-500">
						Yearly Citation Trend
					</p>
					<p className="text-xs text-[var(--color-accent)]">2019-2026</p>
				</div>

				<div className="flex h-24 items-end gap-2">
					<div className="h-8 flex-1 rounded-t bg-[var(--color-secondary)]/30" />
					<div className="h-12 flex-1 rounded-t bg-[var(--color-secondary)]/40" />
					<div className="h-16 flex-1 rounded-t bg-[var(--color-secondary)]/50" />
					<div className="h-20 flex-1 rounded-t bg-[var(--color-accent)]/70" />
					<div className="h-14 flex-1 rounded-t bg-[var(--color-secondary)]/50" />
					<div className="h-24 flex-1 rounded-t bg-[var(--color-accent)]" />
				</div>
			</div>
		</div>
	);
};

export default Displaydashboard;
