import { useEffect } from "react";
import { connect } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { handleInitialData } from "../src/actions/shared";
import Home from "./components/Home";
import LeaderBoard from "../src/components/LeaderBoard";
import Login from "../src/components/Login";
import Navbar from "../src/components/Navbar";
import NewQuest from "./components/NewQuest";
import NotFound from "../src/components/NotFound";
import QuestDetail from "./components/QuestDetail";

const App = ({ authedUser, dispatch }) => {
  useEffect(() => {
    dispatch(handleInitialData());
  }, [authedUser]);

  return (
    <div className="app">
      <div>
        <Navbar />
      </div>
      <div className="main-content">
        {authedUser ? (
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/leaderboard" element={<LeaderBoard />} />
            <Route path="/add" element={<NewQuest />} />
            <Route path="/questions/:question_id" element={<QuestDetail />} />
            <Route path="*" element={<NotFound page="page" />} />
          </Routes>
        ) : (
          <Login />
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ authedUser }) => ({
  authedUser,
});

export default connect(mapStateToProps)(App);
