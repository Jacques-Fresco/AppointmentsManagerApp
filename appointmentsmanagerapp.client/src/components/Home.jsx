import { useEffect, useState } from "react"
import Delete from "./Delete"
import Edit from "./Edit"
import New from "./New"
import Appointment from "./Appointment"
import { getDefault, testData, openModal } from "./Lib";

export default function Home(props) {

    const [dataList, setDataList] = useState([])

    const [refreshData, setRefreshData] = useState(0)
    const [stateListener, setStateListener] = useState(0)

    useEffect(() => {
        getDefault().then(data=>{
            setDataList(data)
        }).catch(e => console.log("Error inside home: ", e))
    }, [refreshData])

    return (
        <main>
            <h1>Manage Your Appointments / Dates very easy</h1>
            <p>This powerful web application helps you to manage your dates very easy.</p>
            <div className="add-btn row items-center content-center">
                <div className="btn add" onClick={() => openModal("new-modal")}>+</div>
            </div>

            <div className="notifications spacer-20">This is a test Text</div>

            <section className="row sectionclass items-center filter">
                <div className="modal-title">Filter</div>
                <div className="row items-center filter-items">
                    <button className="me-15">Clear Filters</button>
                    <div className="elemflex">
                        <label htmlFor="All_f">All</label>
                        <input type="checkbox" id="All_f" name="All" />
                    </div>

                    <div className="elemflex">
                        <label htmlFor="Done_f">Done</label>
                        <input type="checkbox" id="Done_f" name="Done" />
                    </div>

                    <div className="elemflex">
                        <label htmlFor="Deleted_f">Deleted</label>
                        <input type="checkbox" id="Deleted_f" name="Deleted" />
                    </div>
                    <div>
                        <label htmlFor="period">Period</label> <br />
                        <select name="period" id="period" defaultValue={"4"}> 
                            <option value="5" disabled>Period</option>
                            <option value="4" disabled>Default</option>
                            <option value="1" disabled>Today</option>
                            <option value="2" disabled>This week</option>
                            <option value="3" disabled>Last week</option>
                        </select>
                    </div>
                

                    <div className="elemflex">
                        <label htmlFor="SpecifiedDate">Specified Date</label>
                        <input type="date" id="SpecifiedDate" name="SpecifiedDate" />
                    </div>

                    <div className="elemflex">
                        <label htmlFor="SpecifiedTime">Specified Time</label>
                        <input type="time" id="SpecifiedTime" name="SpecifiedTime" />
                    </div>

                    <div>
                        <label htmlFor="LevelOfImportance_f">Level Of Importance</label> <br />
                        <select name="LevelOfImportance" id="LevelOfImportance" defaultValue={8}>
                            <option value={8} disabled>Level Of Importance</option>
                            <option value={9}>Reset</option>
                            <option value={5}>Very High</option>
                            <option value={4}>High</option>
                            <option value={3}>Medium</option>
                            <option value={2}>Normal</option>
                            <option value={8}>Low</option>
                            <option value={0}>Very Low</option>
                        </select>
                    </div>
                </div>
            </section>

            <div className="row underline hdr">
                <div className="column id">#</div>
                <div className="column title">Title</div>
                <div className="column description">Description</div>
                <div className="column importance">Importance</div>
                <div className="column date">Date</div>
                <div className="column time">Time</div>
                <div className="column addr">Address</div>
                <div className="column edit">Edit</div>
                <div className="column delete">Delete</div>
            </div>

            {
                dataList.length === 0 ?
                    <div className="row mt-15 waiting">Loading <div className="loading">...</div></div> :
                    dataList.map(item => <Appointment item={item} key={item.id} stateListener={setStateListener}/>)
            }

            <section>
                <section className="modal new-modal hidden">
                    <New refreshApp={setRefreshData}/>
                </section>
            </section>

            <section>
                <section className="modal edit-modal hidden">
                    <Edit stateListener={stateListener}/>
                </section>
            </section>
            
            <section>
                <section className="modal delete-modal hidden">
                    <Delete stateListener={stateListener}/>
                </section>
            </section>
        </main>
    )
}