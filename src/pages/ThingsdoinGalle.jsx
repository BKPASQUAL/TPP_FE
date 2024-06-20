import React, { useState, useEffect } from 'react';
import "../assets/css/ThingsdoinGalle.css";
import thingsToDoData from "../assets/data/TouristPlaceInGalle.json";

function ThingsdoinGalle() {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(thingsToDoData);
  }, []);

  // State to manage which items have their reviews expanded
  const [expandedReviews, setExpandedReviews] = useState({});

  // Function to toggle reviews for a specific item
  const toggleReviews = (index) => {
    setExpandedReviews(prevState => ({
      ...prevState,
      [index]: !prevState[index]
    }));
  };

  return (
    <div className="things-main">
      <div className="things-main-title">Things to Do in Galle</div>
      <div className="things-main-content">
        {data.map((thing, index) => (
          <div className="things-box" key={index}>
            <div className="things-box-top">
              {/* Render only the first image */}
              {thing.ImageURLs && thing.ImageURLs.length > 0 && (
                <img src={thing.ImageURLs[0]} alt={thing.Name} className="things-img" />
              )}
            </div>
            <div className="things-box-btm">
              <div className="things-box-title">{thing.Name}</div>
              <div className="things-box-address">{thing.Address}</div>
              <div className="things-box-rating">
                Rating: {thing.Rating} ({thing.UserRatingsTotal} reviews)
              </div>
              <div className="things-box-reviews">
                {thing.Reviews && thing.Reviews.length > 0 ? (
                  <>
                    {thing.Reviews.slice(0, expandedReviews[index] ? undefined : 1).map((review, i) => (
                      <div key={i} className="things-box-review">
                        <div className="things-box-review-author">{review["Review Author"]}</div>
                        <div className="things-box-review-rating">Rating: {review["Review Rating"]}</div>
                        <div className="things-box-review-text">{review["Review Text"]}</div>
                      </div>
                    ))}
                    {thing.Reviews.length > 1 && (
                      <button className="show-more-button" onClick={() => toggleReviews(index)}>
                        {expandedReviews[index] ? 'Show less' : 'Show more reviews'}
                      </button>
                    )}
                  </>
                ) : (
                  <div className="no-reviews">No reviews available</div>
                )}
              </div>
              <a href={thing["Location Link"]} target="_blank" rel="noopener noreferrer" className="things-box-link">View on Map</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ThingsdoinGalle;
