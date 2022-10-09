import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useSelector, useDispatch } from "react-redux";
import { editUserInfos } from "../store/action";

export default function User() {
    const { userInfo } = useSelector((state) => state.user);
    const dispatch = useDispatch()
    const { isEdit, setIsEdit } = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const handleEdit = () => {
        setIsEdit((edit) => !edit)
        if (isEdit) {
            const userData = {
              firstName: firstName,
              lastName: lastName,
            };
            dispatch(editUserInfos(userData));
          }
    }
    return (
        <>
            <Navbar></Navbar>
            <main className="main bg-dark">
                <div className="header">
                    <h1>Welcome back<br />{userInfo?.firstName + ' ' + userInfo?.lastName}</h1>
                    <button className="edit-button" onClick={handleEdit}>Edit Name</button>
                </div>
                <h2 className="sr-only">Accounts</h2>
                <section className="account">
                    <div className="account-content-wrapper">
                        <h3 className="account-title">Argent Bank Checking (x8349)</h3>
                        <p className="account-amount">$2,082.79</p>
                        <p className="account-amount-description">Available Balance</p>
                    </div>
                    <div className="account-content-wrapper cta">
                        <button className="transaction-button">View transactions</button>
                    </div>
                </section>
                <section className="account">
                    <div className="account-content-wrapper">
                        <h3 className="account-title">Argent Bank Savings (x6712)</h3>
                        <p className="account-amount">$10,928.42</p>
                        <p className="account-amount-description">Available Balance</p>
                    </div>
                    <div className="account-content-wrapper cta">
                        <button className="transaction-button">View transactions</button>
                    </div>
                </section>
                <section className="account">
                    <div className="account-content-wrapper">
                        <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
                        <p className="account-amount">$184.30</p>
                        <p className="account-amount-description">Current Balance</p>
                    </div>
                    <div className="account-content-wrapper cta">
                        <button className="transaction-button">View transactions</button>
                    </div>
                </section>
            </main>
            <Footer></Footer>
        </>
    )
}
