import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {toast} from 'react-toastify'
import {createTicket} from '../features/tickets/ticketSlice'
import BackButton from "../components/BackButton";

function NewTicket() {
  const { user } = useSelector((state) => state.auth);

  const [name] = useState(user.name);
  const [email] = useState(user.email);
  const [issue, setIssue] = useState("Voucher");
  const [description, setDescription] = useState('');

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(createTicket({ issue, description }))
      .unwrap()
      .then(() => {
        navigate('/tickets')
        toast.success('New ticket created!')
      })
      .catch(toast.error)
  }

  return (
    <>
    <BackButton url='/' />
      <section className="heading">
        <h1>Create New Ticket</h1>
        <p>Please fill out the form below</p>
      </section>

      <section className="form">
        <div className="form-group">
          <label htmlFor="name">Customer Name</label>
          <input type="text" className="form-control" value={name} disabled />
        </div>

        <div className="form-group">
          <label htmlFor="email">Customer Email</label>
          <input type="text" className="form-control" value={email} disabled />
        </div>

        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="issue">Issue</label>
            <select
              name="issue"
              id="issue"
              value={issue}
              onChange={(e) => setIssue(e.target.value)}
            >
              <option value="Voucher">Voucher</option>  
              <option value="Authorization">Authorization</option>  
              <option value="Government Travel Card">
                Government Travel Card
              </option>
              <option value="Inprocessing">Inprocessing</option>
              <option value="Outprocessing">Outprocessing</option>
              <option value="Itinerary">Itinerary</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="description">Description of the issue</label>
            <textarea
              name="description"
              id="description"
              className="form-control"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div className="form-group">
            <button className="btn btn-block">Submit</button>
          </div>
        </form>
      </section>
    </>
  );
}

export default NewTicket;
