import React, {useEffect, useState} from "react";
import AboutCards from "./AboutCards";
import QuickActionsCard from "./QuickActionsCard";
import HistoryCard from "./HistoryCard";
import "./Dashboard.css";
import Sidebar from "../../components/sidebar/Sidebar";
import axios from "axios";

function Dashboard() {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/user/isAuthenticated",
          {withCredentials: true}
        );
        setUserData(res.data.user)
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserData();
  }, []);

  return (
    <>
      <Sidebar user={userData} />
      
      <div className="dashboard">
        <h1 className="dashboard-title">Welcome Back!</h1>
        <h3 className="section-title">Your Blog Overview</h3>
        <div className="cards-container">
          <AboutCards
            title="Total Blogs"
            counts={42}
            description="Posts created so far"
            symbol={<i className="ri-book-2-line"></i>}
          />
          <AboutCards
            title="Published"
            counts={30}
            description="Blogs live and thriving"
            symbol={<i className="ri-leaf-fill"></i>}
          />
          <AboutCards
            title="Drafts"
            counts={12}
            description="Ideas waiting to be finished"
            symbol={<i className="ri-draft-line"></i>}
          />
        </div>

        <h3 className="section-title">Quick Actions</h3>
        <div className="actions-container">
          <QuickActionsCard
            title="Create New Blog"
            description="Start writing a fresh, engaging blog post"
            button="Write New Post"
            symbol={<i className="ri-add-line"></i>}
          />
          <QuickActionsCard
            title="Review Drafts"
            description="Continue working on your unfinished blog posts"
            button="View Drafts"
            symbol={<i className="ri-pencil-ruler-2-line"></i>}
          />
        </div>

        <h3 className="section-title">Recent Activity</h3>
        <div className="history-list">
          <HistoryCard
            activity='You published "The Future of AI in Blogging"'
            time="2 hours ago"
            symbol={<i className="ri-edit-box-line"></i>}
          />
          <HistoryCard
            activity='New comment on "Optimizing SEO for Blog Posts"'
            time="Yesterday"
            symbol={<i className="ri-message-line"></i>}
          />
        </div>
      </div>
    </>
  );
}

export default Dashboard;
