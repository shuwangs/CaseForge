import { validateOrcidId } from "../utils/validateOrcidId.js"
const OrcidInput = () => {
    return (
        <div>
            <form action="POST"
                onSubmit
                className="">
                <div>
                    <h1>New Project</h1>
                    <p>Enter an ORCID to retrieve and analyze publications</p>
                </div>

                <div>
                    <label>Project Name</label>
                    <input placeholder="NIW Petition" />

                </div>

                <div>
                    <label>ORCID ID</label>


                    <input placeholder="0000-0000-1234-2234" />
                    <button type="button" onClick={validateOrcidId}
                    > verify</button>
                </div>
                <button type="submit">Retrieve Publications</button>

            </form>
        </div>)
}

export default OrcidInput;