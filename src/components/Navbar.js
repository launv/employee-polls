import { Menubar } from "primereact/menubar";
import { connect } from "react-redux";
import Profile from "./Profile";
import { Link } from "react-router-dom";

const Navbar = (props) => {
  const items = [
    {
      id: "1",
      label: "Home",
      url: "/",
    },
    {
      id: "2",
      label: "Leader Board",
      url: "/leaderboard",
    },
    {
      id: "3",
      label: "New Question",
      url: "/add",
    },
  ];

  const Menu = () => {
    return (
      <ul className="p-menubar-root-list">
        {items.map((item) => (
          <li key={item.id} className="p-menuitem">
            <div className="p-menuitem-content">
              <Link className="p-menuitem-link" to={item.url}>
                {item.label}
              </Link>
            </div>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="card">
      <Menubar start={<Menu />} end={props.authedUser ? <Profile /> : null} />
    </div>
  );
};

const mapStateToProps = ({ authedUser }) => ({
  authedUser,
});

export default connect(mapStateToProps)(Navbar);
