import { Link } from "react-router-dom";

export default function WatchedList() {
  return (
    <Link to="/watched" className="watchedList">
      <div className="watchlist-button">
        {/* <span>🎬</span> */}
        <h2>My Watch List</h2>
      </div>
    </Link>
  );
}
