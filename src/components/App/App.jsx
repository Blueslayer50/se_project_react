import { useEffect, useState } from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import {
  getItems,
  removeCard,
  addItem,
  addCardLike,
  removeCardLike,
  updateUser,
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
  const [authError, setAuthError] = useState("");

  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [isLoading, setIsLoading] = useState(false);

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit((prev) => (prev === "F" ? "C" : "F"));
  };

  const openModal = (modal) => {
    setAuthError("");
    setActiveModal(modal);
  };

  const closeActiveModal = () => {
    setActiveModal("");
    setSelectedCard(null);
    setCardToDelete(null);
    setAuthError("");
  };

  useEffect(() => {
    if (!activeModal) return;

    const handleEscClose = (e) => {
      if (e.key === "Escape") closeActiveModal();
    };

    document.addEventListener("keydown", handleEscClose);
    return () => document.removeEventListener("keydown", handleEscClose);
  }, [activeModal]);

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
    setIsLoading(true);
    setAuthError("");

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
      .catch(() => setAuthError("This email is already registered"))
      .finally(() => setIsLoading(false));
  };

  const handleLogin = ({ email, password }) => {
    setIsLoading(true);
    setAuthError("");

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
      .catch(() => setAuthError("Email or password incorrect"))
      .finally(() => setIsLoading(false));
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
    setIsLoading(true);

    const token = localStorage.getItem("jwt");

    addItem(
      {
        name: inputValues.name,
        imageUrl: inputValues.imageUrl,
        weather: inputValues.weather,
      },
      token,
    )
      .then((data) => {
        setClothingItems((prev) => [data, ...prev]);
        resetForm();
        closeActiveModal();
      })
      .catch(() => {})
      .finally(() => setIsLoading(false));
  };

  const handleDeleteItem = (card) => {
    setIsLoading(true);

    const token = localStorage.getItem("jwt");

    removeCard(card._id, token)
      .then(() => {
        setClothingItems((items) => items.filter((i) => i._id !== card._id));
        closeActiveModal();
      })
      .catch(() => {})
      .finally(() => setIsLoading(false));
  };

  const handleCardLike = ({ id, isLiked }) => {
    const token = localStorage.getItem("jwt");
    const request = isLiked
      ? removeCardLike(id, token)
      : addCardLike(id, token);

    request
      .then((updatedCard) => {
        setClothingItems((cards) =>
          cards.map((item) => (item._id === id ? updatedCard : item)),
        );
      })
      .catch(() => {});
  };

  const handleEditProfile = (values) => {
    setIsLoading(true);
    const token = localStorage.getItem("jwt");

    updateUser(values, token)
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        closeActiveModal();
      })
      .catch(() => {})
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    getWeather(coordinates)
      .then((data) => setWeatherData(filterWeatherData(data)))
      .catch(() => {});

    const token = localStorage.getItem("jwt");

    if (token) {
      getItems(token)
        .then((data) => setClothingItems([...data].reverse()))
        .catch(() => {});
    }
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
                        clothingItems={clothingItems.filter(
                          (item) => item.owner === currentUser._id,
                        )}
                        handleCardClick={handleCardClick}
                        handleAddClick={handleAddClick}
                        onCardLike={handleCardLike}
                        onEditProfile={() => openModal("edit-profile")}
                        onSignOut={handleSignOut}
                        isLoggedIn={isLoggedIn}
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
              isLoading={isLoading}
            />

            <ItemModal
              activeModal={activeModal}
              card={selectedCard}
              onClose={closeActiveModal}
              onDeleteClick={openDeleteModal}
              isLoggedIn={isLoggedIn}
              currentUser={currentUser}
            />

            <DeleteConfirmationModal
              isOpen={activeModal === "delete"}
              selectedCard={cardToDelete}
              onClose={closeActiveModal}
              onConfirm={handleDeleteItem}
              isLoading={isLoading}
            />

            <RegisterModal
              isOpen={activeModal === "register"}
              onClose={closeActiveModal}
              onRegister={handleRegister}
              isLoading={isLoading}
              onSwitchToLogin={() => openModal("login")}
              errorMessage={authError}
            />

            <LoginModal
              isOpen={activeModal === "login"}
              onClose={closeActiveModal}
              onLogin={handleLogin}
              isLoading={isLoading}
              onSwitchToRegister={() => openModal("register")}
              errorMessage={authError}
            />

            <EditProfileModal
              isOpen={activeModal === "edit-profile"}
              onClose={closeActiveModal}
              onEditProfile={handleEditProfile}
              isLoading={isLoading}
            />
          </div>
        </BrowserRouter>
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
