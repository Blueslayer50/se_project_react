import { useEffect, useState } from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import {
  getItems,
  removeCard,
  addItem,
  addCardLike,
  removeCardLike,
} from "../../utils/api";
import * as auth from "../../utils/auth";

import "./App.css";
import { coordinates } from "../../utils/constants";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Profile from "../Profile/Profile";

import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import EditProfileModal from "../EditProfileModal/EditProfileModal";

import { getWeather, filterWeatherData } from "../../utils/WeatherApi";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ProtectedRoute({ isLoggedIn, children }) {
  return isLoggedIn ? children : <Navigate to="/" />;
}

function App() {
  const [clothingItems, setClothingItems] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
    condition: "",
    isDay: false,
  });

  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState(null);
  const [cardToDelete, setCardToDelete] = useState(null);

  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit((prevUnit) => (prevUnit === "F" ? "C" : "F"));
  };

  const openModal = (modal) => setActiveModal(modal);

  const closeActiveModal = () => {
    setActiveModal("");
    setSelectedCard(null);
    setCardToDelete(null);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
    openModal("preview");
  };

  const handleAddClick = () => openModal("new-garment");

  const openDeleteModal = (card) => {
    setCardToDelete(card);
    openModal("delete");
  };

  const handleRegister = ({ name, avatar, email, password }) => {
    auth
      .signup({ name, avatar, email, password })
      .then(() => auth.signin({ email, password }))
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        return auth.checkToken(res.token);
      })
      .then((user) => {
        setCurrentUser(user);
        setIsLoggedIn(true);
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleLogin = ({ email, password }) => {
    auth
      .signin({ email, password })
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        return auth.checkToken(res.token);
      })
      .then((user) => {
        setCurrentUser(user);
        setIsLoggedIn(true);
        closeActiveModal();
      })
      .catch(console.error);
  };

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) return;

    auth
      .checkToken(token)
      .then((user) => {
        setCurrentUser(user);
        setIsLoggedIn(true);
      })
      .catch(() => {
        setIsLoggedIn(false);
        setCurrentUser({});
      });
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser({});
    closeActiveModal();
  };

  const onAddItem = (inputValues, resetForm) => {
    const token = localStorage.getItem("jwt");
    const newCardData = {
      name: inputValues.name,
      imageUrl: inputValues.imageUrl,
      weather: inputValues.weather,
    };

    addItem(newCardData, token)
      .then((data) => {
        setClothingItems((prevItems) => [data, ...prevItems]);
        resetForm();
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleDeleteItem = (card) => {
    const token = localStorage.getItem("jwt");
    removeCard(card._id, token)
      .then(() => {
        setClothingItems((items) =>
          items.filter((item) => item._id !== card._id),
        );
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleCardLike = ({ id, isLiked }) => {
    const token = localStorage.getItem("jwt");
    const request = !isLiked
      ? addCardLike(id, token)
      : removeCardLike(id, token);

    request
      .then((updatedCard) => {
        setClothingItems((cards) =>
          cards.map((item) => (item._id === id ? updatedCard : item)),
        );
      })
      .catch(console.error);
  };

  useEffect(() => {
    getWeather(coordinates)
      .then((data) => setWeatherData(filterWeatherData(data)))
      .catch(console.error);

    getItems()
      .then((data) => setClothingItems([...data].reverse()))
      .catch(console.error);
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <BrowserRouter>
          <div className="page">
            <div className="page__content">
              <Header
                handleAddClick={handleAddClick}
                weatherData={weatherData}
                isLoggedIn={isLoggedIn}
                onLoginClick={() => openModal("login")}
                onRegisterClick={() => openModal("register")}
                onSignOut={handleSignOut}
              />

              <Routes>
                <Route
                  path="/"
                  element={
                    <Main
                      weatherData={weatherData}
                      clothingItems={clothingItems}
                      handleCardClick={handleCardClick}
                      onCardLike={handleCardLike}
                      isLoggedIn={isLoggedIn}
                    />
                  }
                />

                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute isLoggedIn={isLoggedIn}>
                      <Profile
                        clothingItems={clothingItems}
                        handleCardClick={handleCardClick}
                        handleAddClick={handleAddClick}
                        onEditProfile={() => openModal("edit-profile")}
                      />
                    </ProtectedRoute>
                  }
                />
              </Routes>

              <Footer />
            </div>

            <AddItemModal
              onClose={closeActiveModal}
              isOpen={activeModal === "new-garment"}
              onAddItem={onAddItem}
            />

            <ItemModal
              activeModal={activeModal}
              card={selectedCard}
              onClose={closeActiveModal}
              onDeleteClick={openDeleteModal}
              isLoggedIn={isLoggedIn}
            />

            <DeleteConfirmationModal
              isOpen={activeModal === "delete"}
              selectedCard={cardToDelete}
              onClose={closeActiveModal}
              onConfirm={handleDeleteItem}
            />

            <RegisterModal
              isOpen={activeModal === "register"}
              onClose={closeActiveModal}
              onRegister={handleRegister}
            />

            <LoginModal
              isOpen={activeModal === "login"}
              onClose={closeActiveModal}
              onLogin={handleLogin}
            />

            <EditProfileModal
              isOpen={activeModal === "edit-profile"}
              onClose={closeActiveModal}
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
            />
          </div>
        </BrowserRouter>
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
