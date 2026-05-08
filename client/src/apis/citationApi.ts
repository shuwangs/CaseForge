const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export const getCitations = async (projectId: number, token: string) => {
    const result = await fetch(`${API_BASE_URL}/api/projects/${projectId}/citations/jobs`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            }
        }
    )

    if (!result.ok) {
        throw new Error("Update Project failed");
    }

    const out = await result.json();
    alert(`${out.jobsQueued} citation jobs queued!`);

}