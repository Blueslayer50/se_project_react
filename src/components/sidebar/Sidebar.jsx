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
      <button type="button" className="sidebar__link" onClick={onEditProfile}>
        Change profile data
      </button>
      <button type="button" className="sidebar__link" onClick={onSignOut}>
        Log out
      </button>
    </aside>
  );
}
