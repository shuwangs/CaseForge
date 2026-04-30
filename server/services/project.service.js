import pool from "../db/db.js";

export const getProjectsByUserId = async (userId) => {
    const result = await pool.query(
        `
            SELECT *
            FROM caseforge.projects
            WHERE user_id = $1
            ORDER BY created_at DESC
        `,
        [userId],
    );

    return result.rows;
};

export const addProject = async (project) => {
    console.log("adding project in the sevice...");
    const {
        userId,
        projectName,
        firstName,
        lastName,
        institution,
        researchArea,
        careerStage,
        orcid,
        target,
    } = project;

    // Retrieve Insitution Id if exits if not add new institution
    console.log("the institution name is :", institution)

    let institutionId = null;
    if (institution.trim()) {
        console.log("the institution name is after trim:", institution)

        const institutionResult = await pool.query(
            `
            INSERT INTO caseforge.institutions (institution_name)
            VALUES(LOWER($1))
            ON CONFLICT DO NOTHING
            RETURNING id;
        `,
            [institution],
        );
        institutionId = institutionResult.rows[0].id;
    }

    console.log("the institution id is :", institutionId)
    // add to DB
    const projectRes = await pool.query(
        `INSERT INTO caseforge.projects (user_id, project_name, institution_id , first_name, last_name, research_area , orcid , career_stage ,target)
        VALUES($1, $2, $3,$4, $5, $6,$7, $8, $9 )
        RETURNING *
        `,
        [
            userId,
            projectName,
            institutionId,
            firstName,
            lastName,
            researchArea,
            orcid,
            careerStage,
            target,
        ],
    );
    return projectRes.rows[0];
};
