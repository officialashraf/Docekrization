
import { Table , CloseButton} from 'react-bootstrap'
import "./caseDetails.css"

const CaseDetails = ({ item, togglePopupA }) => {
    return (
        <div className="popup-overlay">
            <div className="popup-containera">
                <div className="popup-content">
                    <div className="header">
                        <h5>
                            {item.title}
                        </h5>
                        <CloseButton onClick={togglePopupA} />
                    </div>
                    <div className="case-details-container">
                        <Table bordered hover className="custom-table custom-table-th">
                            <tbody>
                                {" "}<tr>
                                    {" "}<th>Case ID</th> <td>{`CASE${String(item.id).padStart(4, "0")}`}</td>{" "}
                                </tr>
                                <tr>
                                    {" "}<th>Status</th> <td>{item.status}</td>{" "}
                                </tr>
                                <tr>
                                    {" "}<th>Description</th> <td>{item.description}</td>{" "}
                                </tr>
                                <tr>
                                    {" "}<th>Created On</th>{" "}
                                    <td>{item.created_on.slice(0, 12)}</td>{" "}
                                </tr>
                                <tr>
                                    {" "}<th>Created By</th>{" "}
                                    <td>{item.created_by}</td>{" "}
                                </tr>
                                <tr>
                                    {" "}<th>Edited On</th> <td>{item.editedOn}</td>{" "}
                                </tr>
                                <tr>
                                    {" "}<th>Edited By</th> <td>{item.editedBy}</td>{" "}
                                </tr>
                                <tr>
                                    {" "}<th>Last Data Uploaded On</th>{" "}
                                    <td>{item.lastDataUploadOn}</td>{" "}
                                </tr>
                                <tr>
                                    {" "}<th>Last Data Uploaded By</th>{" "}
                                    <td>{item.lastDataUploadBy}</td>{" "}
                                </tr>
                                <tr>
                                    {" "}<th>Last Data Processed On</th>{" "}
                                    <td>{item.lastDataProceedOn}</td>{" "}
                                </tr>
                                <tr>
                                    {" "}<th>Last Data Processed By</th>{" "}
                                    <td>{item.lastDataProceedBy}</td>{" "}
                                </tr>
                                <tr>
                                    {" "}<th>Assignee</th> <td>{item.assignee}</td>{" "}
                                </tr>
                                <tr>
                                    {" "}<th>Watcher(s)</th> <td>{item.watchers}</td>{" "}
                                </tr>
                                <tr>
                                    {" "}<th>Archived By</th> <td>{item.archivedBy}</td>{" "}
                                </tr>
                                <tr>
                                    {" "}<th>Archived On</th> <td>{item.archivedOn}</td>{" "}
                                </tr>
                                <tr>
                                    {" "}<th>Archival Reason</th> <td>{item.archivalReason}</td>{" "}
                                </tr>
                                <tr>
                                    {" "}<th>Archival Comments</th>{" "}
                                    <td>{item.archivalComments}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>
                    <div className="button-container">
                        <button type="button" className="cancel-btn" onClick={togglePopupA}>
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CaseDetails;
