import { useEffect } from "react"

export default function Edit(props) {

    useEffect(() => {
        console.log("Edit component")
    }, [props.stateListener])

    return (
        <div className="modal-container">
            <div className="modal-titel">Edit Appointment</div>

            <div className="mt-15">
                <label htmlFor="Title_e">Title</label> <br/>
                <input type="text" className="mt-5" id="Title_e" maxLength={150} name="title" />
                <span className="ms-10">0/150</span>
            </div>

            <div className="mt-15">
                <label htmlFor="Description_e">Description</label> <br/>
                <textarea id="Description_e" maxLength={300} className="mt-5" name="description" cols={102} rows={10}/> <br />
                <span className="float-right me-10">0/300</span>
            </div>

            <div className="row mt-15">
                <div>
                    <label htmlFor="Address_e">Address</label>
                    <input type="text" id="Address_e" name="address" maxLength={100} />
                </div>

                <div className="ms-10">
                    <label htmlFor="LevelOfImportance_e">Importance</label>
                    <select name="levelOfImportance" id="LevelOfImportance_e" defaultValue={2}>
                        <option value={5}>Very High</option>
                        <option value={4}>High</option>
                        <option value={3}>Medium</option>
                        <option value={2}>Normal</option>
                        <option value={1}>Low</option>
                        <option value={0}>Very Low</option>
                    </select>
                </div>
            </div>

            <div className="row mt-15">
                <div>
                    <label htmlFor="Date_e">Date</label>
                    <input type="date" id="Date_e" name="date" />
                </div>

                <div className="ms-10">
                    <label htmlFor="Time_e">Time</label>
                    <input type="time" id="Time_e" name="time" />
                </div>

                <div className="ms-10 row items-center">
                    <label htmlFor="Done_e">Done</label>
                    <input type="checkbox" id="Done_e" name="done" />
                </div>

                <div className="ms-10 row items-center">
                    <label htmlFor="Deleted_e">Deleted</label>
                    <input type="checkbox" id="Deleted_e_e" name="deleted_e" />
                </div>
            </div>

            <div className="row sectionclass modal-action-container mt-15">
                <div className="btn">Cancel</div>
                <div className="btn">Update</div>
            </div>
            
        </div>
    )
}