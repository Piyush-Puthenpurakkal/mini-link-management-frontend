const AnalyticsOverview = ({ data }) => {
  return (
    <div className="overview-container">
      <div className="overview-card-links">
        <h3>Clicks on Links</h3>
        <p>{data?.totalClicks || 0}</p>
      </div>
      <div className="overview-card-shops">
        <h3>Clicks on Shop</h3>
        <p>{data?.shopClicks || 0}</p>
      </div>
      <div className="overview-card-cta">
        <h3>CTA Clicks</h3>
        <p>{data?.cta || 0}</p>
      </div>
    </div>
  );
};

export default AnalyticsOverview;
