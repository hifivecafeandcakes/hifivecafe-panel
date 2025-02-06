import "./App.css";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import Login from "./components/Login";
import { AuthProvider, useAuth } from "./components/AuthProvider";

import ListReservation from "./components/reservation/ListReservation";
import AddReservation from "./components/reservation/AddReservation";
import UpdateReservation from "./components/reservation/UpdateReservation";
import ReservationCatAdd from "./components/reservation/ResCatAdd";
import ResCatUpdate from "./components/reservation/ResCatUpdate";
import ResCatGet from "./components/reservation/ResCatGet";
import ResSubCatPost from "./components/reservation/ResSubCatPost";
import ResSubCatGet from "./components/reservation/ResSubCatGet";

import GalleryCatList from "./components/gallery/GalleryCatList";
import GalleryCatAdd from "./components/gallery/GalleryCatAdd";
import GallerySubCatList from "./components/gallery/GallerySubCatList";
import GallerySubCatAdd from "./components/gallery/GallerySubCatAdd";
import MenuItemAdd from "./components/Menu/MenuItemAdd";
import MenuCatAdd from "./components/Menu/MenuCatAdd";
import MenuCatGet from "./components/Menu/MenuCatGet";


import CakeCatAdd from "./components/cake/CakeCatAdd";
import CakeCatGet from "./components/cake/CakeCatGet";
import CakeSubCatAdd from "./components/cake/CakeSubCatAdd";
import CakeSubCatGet from "./components/cake/CakeSubCatGet";



import VideoAdd from "./components/video/VideoAdd";
import VideoGet from "./components/video/VideoGet";
import VideoUpdate from "./components/video/VideoUpdate";
import MonthlyReport from "./components/report/MonthlyReport";
import OverAllReport from "./components/report/OverAllReport";


import CandleLightDinnerWait from "./components/booking/CandleLightDinnerWait";
import CandleLightDinnerPayment from "./components/booking/CandleLightDinnerPayment";
import TableBookingWaitingList from "./components/booking/TableBookingWaitingList";
import TableBookingPayment from "./components/booking/TableBookingPayment";
import BirthdayWaitingList from "./components/booking/BirthdayWaitingList";
import BirthdayPaymentList from "./components/booking/BirthdayPaymentList";
import Dashboard from "./components/Dashboard";
import ListCategory from "./components/reservation/ListCategory";
import AddCategory from "./components/reservation/AddCategory";
import ListSubCategory from "./components/reservation/ListSubCategory";
import AddSubCategory from "./components/reservation/AddSubCategory";
import ListBooked from "./components/booking/ListBooked";
import ListCustomer from "./components/customer/ListCustomer";
import AddCustomer from "./components/customer/AddCustomer";



const App = () => {
  return (
    <AuthProvider>
      <Main />
    </AuthProvider>
  );
};
const Main = () => {
  const { isAuthenticated } = useAuth();

  return (
    <>
      {/* <BrowserRouter basename="/panel/subadmin"> */}
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated() ? (
                <Navigate to="/dashboard" />
              ) : (
                <Login />
              )
            }
          />
          <Route
            path="/dashboard"
            element={
              isAuthenticated() ? (
                [<Navbar />, <Sidebar />, <Dashboard />]
              ) : (
                <Login />
              )
            }
          />




          <Route
            path="/ListReservation"
            element={
              isAuthenticated() ? (
                [<Navbar />, <Sidebar />, <ListReservation />]
              ) : (
                <Login />
              )
            }
          />

          <Route
            path="/AddReservation"
            element={
              isAuthenticated() ? (
                [<Navbar />, <Sidebar />, <AddReservation />]
              ) : (
                <Login />
              )
            }
          />


          <Route
            path="/UpdateReservation/:id"
            element={
              isAuthenticated() ? (
                [<Navbar />, <Sidebar />, <AddReservation />]
              ) : (
                <Login />
              )
            }
          />

          <Route
            path="/ListCategory"
            element={
              isAuthenticated() ? (
                [<Navbar />, <Sidebar />, <ListCategory />]
              ) : (
                <Login />
              )
            }
          />

          <Route
            path="/AddCategory"
            element={
              isAuthenticated() ? (
                [<Navbar />, <Sidebar />, <AddCategory />]
              ) : (
                <Login />
              )
            }
          />


          <Route
            path="/UpdateCategory/:id"
            element={
              isAuthenticated() ? (
                [<Navbar />, <Sidebar />, <AddCategory />]
              ) : (
                <Login />
              )
            }
          />


          <Route
            path="/ListSubcategory"
            element={
              isAuthenticated() ? (
                [<Navbar />, <Sidebar />, <ListSubCategory />]
              ) : (
                <Login />
              )
            }
          />
          <Route
            path="/AddSubcategory"
            element={
              isAuthenticated() ? (
                [<Navbar />, <Sidebar />, <AddSubCategory />]
              ) : (
                <Login />
              )
            }
          />


          <Route
            path="/UpdateSubCategory/:id"
            element={
              isAuthenticated() ? (
                [<Navbar />, <Sidebar />, <AddSubCategory />]
              ) : (
                <Login />
              )
            }
          />



          <Route
            path="/ListBooked"
            element={
              isAuthenticated() ? (
                [<Navbar />, <Sidebar />, <ListBooked />]
              ) : (
                <Login />
              )
            }
          />

          <Route
            path="/ListCustomer"
            element={
              isAuthenticated() ? (
                [<Navbar />, <Sidebar />, <ListCustomer />]
              ) : (
                <Login />
              )
            }
          />

          <Route
            path="/AddCustomer"
            element={
              isAuthenticated() ? (
                [<Navbar />, <Sidebar />, <AddCustomer />]
              ) : (
                <Login />
              )
            }
          />

          <Route
            path="/UpdateCustomer/:id"
            element={
              isAuthenticated() ? (
                [<Navbar />, <Sidebar />, <AddCustomer />]
              ) : (
                <Login />
              )
            }
          />



          <Route
            path="/GalleryCatList"
            element={
              isAuthenticated() ? (
                [<Navbar />, <Sidebar />, <GalleryCatList />]
              ) : (
                <Login />
              )
            }
          />

          <Route
            path="/GalleryCatAdd"
            element={
              isAuthenticated() ? (
                [<Navbar />, <Sidebar />, <GalleryCatAdd />]
              ) : (
                <Login />
              )
            }
          />

          <Route
            path="/GallerySubCatList"
            element={
              isAuthenticated() ? (
                [<Navbar />, <Sidebar />, <GallerySubCatList />]
              ) : (
                <Login />
              )
            }
          />

          <Route
            path="/GallerySubCatAdd"
            element={
              isAuthenticated() ? (
                [<Navbar />, <Sidebar />, <GallerySubCatAdd />]
              ) : (
                <Login />
              )
            }
          />

          <Route
            path="/MenuItemAdd"
            element={
              isAuthenticated() ? (
                [<Navbar />, <Sidebar />, <MenuItemAdd />]
              ) : (
                <Login />
              )
            }
          />

          <Route
            path="/MenuCatAdd"
            element={
              isAuthenticated() ? (
                [<Navbar />, <Sidebar />, <MenuCatAdd />]
              ) : (
                <Login />
              )
            }
          />

          <Route
            path="/MenuCatGet"
            element={
              isAuthenticated() ? (
                [<Navbar />, <Sidebar />, <MenuCatGet />]
              ) : (
                <Login />
              )
            }
          />

          <Route
            path="/CakeCatAdd"
            element={
              isAuthenticated() ? (
                [<Navbar />, <Sidebar />, <CakeCatAdd />]
              ) : (
                <Login />
              )
            }
          />

          <Route
            path="/CakeCatGet"
            element={
              isAuthenticated() ? (
                [<Navbar />, <Sidebar />, <CakeCatGet />]
              ) : (
                <Login />
              )
            }
          />

          <Route
            path="/CakeSubCatAdd"
            element={
              isAuthenticated() ? (
                [<Navbar />, <Sidebar />, <CakeSubCatAdd />]
              ) : (
                <Login />
              )
            }
          />

          <Route
            path="/CakeSubCatGet"
            element={
              isAuthenticated() ? (
                [<Navbar />, <Sidebar />, <CakeSubCatGet />]
              ) : (
                <Login />
              )
            }
          />

          <Route
            path="/videoAdd"
            element={
              isAuthenticated() ? (
                [<Navbar />, <Sidebar />, <VideoAdd />]
              ) : (
                <Login />
              )
            }
          />

          <Route
            path="/VideoGet"
            element={
              isAuthenticated() ? (
                [<Navbar />, <Sidebar />, <VideoGet />]
              ) : (
                <Login />
              )
            }
          />

          <Route
            path="/VideoUpdate"
            element={
              isAuthenticated() ? (
                [<Navbar />, <Sidebar />, <VideoUpdate />]
              ) : (
                <Login />
              )
            }
          />

          <Route
            path="/MonthlyReport"
            element={
              isAuthenticated() ? (
                [<Navbar />, <Sidebar />, <MonthlyReport />]
              ) : (
                <Login />
              )
            }
          />

          <Route
            path="/OverAllReport"
            element={
              isAuthenticated() ? (
                [<Navbar />, <Sidebar />, <OverAllReport />]
              ) : (
                <Login />
              )
            }
          />

          <Route
            path="/CandleLightDinnerWait"
            element={
              isAuthenticated() ? (
                [<Navbar />, <Sidebar />, <CandleLightDinnerWait />]
              ) : (
                <Login />
              )
            }
          />

          <Route
            path="/CandleLightDinnerPayment"
            element={
              isAuthenticated() ? (
                [<Navbar />, <Sidebar />, <CandleLightDinnerPayment />]
              ) : (
                <Login />
              )
            }
          />

          <Route
            path="/TableBookingWaitingList"
            element={
              isAuthenticated() ? (
                [<Navbar />, <Sidebar />, <TableBookingWaitingList />]
              ) : (
                <Login />
              )
            }
          />

          <Route
            path="/TableBookingPayment"
            element={
              isAuthenticated() ? (
                [<Navbar />, <Sidebar />, <TableBookingPayment />]
              ) : (
                <Login />
              )
            }
          />

          <Route
            path="/BirthdayWaitingList"
            element={
              isAuthenticated() ? (
                [<Navbar />, <Sidebar />, <BirthdayWaitingList />]
              ) : (
                <Login />
              )
            }
          />
          <Route
            path="/BirthdayPaymentList"
            element={
              isAuthenticated() ? (
                [<Navbar />, <Sidebar />, <BirthdayPaymentList />]
              ) : (
                <Login />
              )
            }
          />


          {/* <Route
            path="/BirthdayCategoryAdd"
            element={
              isAuthenticated() ? (
                [<Navbar />, <Sidebar />, <PhotoHangings_add />]
              ) : (
                <Login />
              )
            }
          />

          <Route
            path="/BirthdayCategoryPrice_Add"
            element={
              isAuthenticated() ? (
                [<Navbar />, <Sidebar />, <PhotoHangings_price_add />]
              ) : (
                <Login />
              )
            }
          /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App; 