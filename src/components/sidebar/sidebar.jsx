import "./sidebar.css";
import avatar from "../../assets/avatar.svg";

export default function SideBar() {
  const username = "Lebron James";

  return (
    <aside className="sidebar">
      <div className="sidebar__profile">
        <img src={avatar} alt="User avatar" className="sidebar__avatar" />
        <p className="sidebar__username">{username}</p>
      </div>
    </aside>
  );
}
