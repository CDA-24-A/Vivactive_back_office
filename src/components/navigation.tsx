import CategoryIcon from "@mui/icons-material/Category";
import IconButton from "@mui/material/IconButton";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import GroupIcon from "@mui/icons-material/Group";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <nav className="navigation">
      <NavLink to="/users" className={({ isActive }) => (isActive ? "selected" : "")}>
        <IconButton size="large" aria-label="Voir les utilisateurs">
          <GroupIcon />
        </IconButton>
      </NavLink>
      <NavLink to="/ressources" className={({ isActive }) => (isActive ? "selected" : "")}>
        <IconButton size="large" aria-label="Voir les ressources">
          <ModeCommentIcon />
        </IconButton>
      </NavLink>
      <NavLink to="/resource-types" className={({ isActive }) => (isActive ? "selected" : "")}>
        <IconButton size="large" aria-label="Voir les types de ressources">
          <ModeCommentIcon />
        </IconButton>
      </NavLink>
      <NavLink to="/comments" className={({ isActive }) => (isActive ? "selected" : "")}>
        <IconButton size="large" aria-label="Voir les commentaire">
          <ModeCommentIcon />
        </IconButton>
      </NavLink>
      <NavLink to="/categories" className={({ isActive }) => (isActive ? "selected" : "")}>
        <IconButton size="large" aria-label="Voir les catégories">
          <CategoryIcon />
        </IconButton>
      </NavLink>
    </nav>
  );
};
export default Navigation;
