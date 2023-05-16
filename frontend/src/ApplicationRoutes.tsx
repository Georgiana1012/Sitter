import React from 'react';
import {SuccessPage} from "./components/Success/Success";
import {Route, Routes} from "react-router-dom";
import {TopPage} from "./components/TopPage/TopPage";
import {AboutUs} from "./components/AboutUs/AboutUs";
import {ContactUs} from "./components/ContactUs/ContactUs";
import {OurMenu} from "./components/OurMenu/OurMenu";
import {ConfirmSignUpContainer} from "./containers/ConfirmSignUpContainer/ConfirmSignUpContainer";
import {SignInContainer} from "./containers/SignInContainer/SignInContainer";
import {SignUpContainer} from "./containers/SignUpContainer/SignUpContainer";
import {ForgotPasswordContainer} from "./containers/ForgotPasswordContainer/ForgotPasswordContainer";
import {
    ConfirmForgotPasswordContainer
} from "./containers/ConfirmForgotPasswordContainer/ConfirmForgotPasswordContainer";
import {DeleteAccountContainer} from "./containers/DeleteAccountContainer/DeleteAccountContainer";
import {Book} from "./components/Book/Book";
import {Home} from "./components/Home/Home";
import {NoReservations} from"./components/ReservationView/NoReservations"
import {ReservationList} from "./components/ReservationView/ReservationList";
import { EditBooking } from './components/EditBooking/EditBooking';


function ApplicationRoutes() {
    return (
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/topPage" element={<TopPage/>}></Route>
                <Route path="/signin" element={<SignInContainer/>}/>
                <Route path="/deleteuser" element={<DeleteAccountContainer/>}/>
                <Route path="/forgotpassword" element={<ForgotPasswordContainer/>}/>
                <Route path="/signup" element={<SignUpContainer/>}/>
                <Route path="/confirm" element={<ConfirmSignUpContainer/>}/>
                <Route path="/confirmForgotPassword" element={<ConfirmForgotPasswordContainer/>}/>
                <Route path="/success" element={<SuccessPage/>}></Route>
                <Route path="/aboutus" element={<AboutUs/>}></Route>
                <Route path="/contactus" element={<ContactUs/>}></Route>
                <Route path="/booking" element={<Book/>}></Route>
                <Route path="/editbooking/:reservationID" element={<EditBooking/>}></Route>
                <Route path="/reservationList" element={<ReservationList/>}></Route>
                <Route path="/menu" element={<OurMenu/>}></Route>
                <Route path="*" element={<p>Page Not Found</p>}/>
            </Routes>
    );
}

export default ApplicationRoutes;