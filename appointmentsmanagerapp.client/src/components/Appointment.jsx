import { entry, openModal } from "./Lib";

export default function Appointment(props) {

    const handlingDelete = (id) => {
        activeId.id = id

        props.stateListener(Math.random() * 948 * Math.random())

        openModal("delete-modal")
    }

    const handlingEdit = (row) => {
        Object.assign(entry, row);

        props.stateListener(Math.random() * 548 * Math.random())

        openModal("edit-modal");
    }

    const LevelOfImportance = ["Very Low", "Low", "Normal", "Medium", "High", "Very High"];

    return (
        <div className={`row py-5 underline ${props.item.deleted ? 'bc-red': props.item.done ? 'bc-greem' : ''}`} key={props.item.id}>
            <div className="column id">{props.item.id}</div>
            <div className="column title">{props.item.title}</div>
            <div className="column description">{props.item.description}</div>
            <div className={`column importance ${props.item.levelOfImportance === 0 ? 'bc-green' : 
            props.item.LevelOfImportance === 4 ? 'bc-gold' : 
            props.item.LevelOfImportance === 5 ? 'bc-red' : 
            ''}`}>{LevelOfImportance[props.item.levelOfImportance]}</div>
            <div className="column date">{props.item.date}</div>
            <div className="column time">{props.item.time}</div>
            <div className="column addr">{props.item.address}</div>
            <div className="column edit"> 
                <div className="btn edit">Edit</div>
            </div>
            <div className={`column delete ${props.item.deleted ? 'not-allowed' : ''}`}>
                <div className={`btn delete ${props.item.deleted ? 'no-event' : ''}`}>Delete</div>
            </div>
        </div>
    )
}