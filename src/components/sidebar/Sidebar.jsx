import "./Sidebar.css";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

export default function SideBar({ onEditProfile, onSignOut }) {
  const currentUser = useContext(CurrentUserContext);

  const avatarLetter = currentUser?.name?.charAt(0)?.toUpperCase() || "U";

  return (
    <aside className="sidebar">
      <div className="sidebar__profile">
        {currentUser.avatar ? (
          <img
            src={currentUser.avatar}
            alt="User avatar"
            className="sidebar__avatar"
          />
        ) : (
          <div className="sidebar__avatar-placeholder">{avatarLetter}</div>
        )}

        <p className="sidebar__username">{currentUser.name}</p>

        <button
          type="button"
          className="sidebar__edit-button"
          onClick={onEditProfile}
        >
          Edit Profile
        </button>

        <button
          type="button"
          className="sidebar__logout-button"
          onClick={onSignOut}
        >
          Sign Out
        </button>
      </div>
    </aside>
  );
}
