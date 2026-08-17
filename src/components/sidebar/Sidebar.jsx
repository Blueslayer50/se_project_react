import "./Sidebar.css";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

export default function Sidebar({ onEditProfile, onSignOut }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <aside className="sidebar">
      <div className="sidebar__user">
        <img
          src={currentUser.avatar}
          alt={currentUser.name}
          className="sidebar__avatar"
        />
        <p className="sidebar__name">{currentUser.name}</p>
      </div>

      <button className="sidebar__button" onClick={onEditProfile}>
        Change profile data
      </button>

      <button
        className="sidebar__button sidebar__button_logout"
        onClick={onSignOut}
      >
        Log out
      </button>
    </aside>
  );
}
