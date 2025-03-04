import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import { format, subDays } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendarAlt } from "react-icons/fa";
import API from "../api/axiosInstance";
import AnalyticsOverview from "../components/AnalyticsOverview";
import AnalyticsLineChart from "../components/AnalyticsLineChart";
import AnalyticsPieChart from "../components/AnalyticsPieChart";
import TrafficByLinksChart from "../components/TrafficByLinksChart";
import TrafficByDeviceChart from "../components/TrafficByDeviceChart";
import "../styles/analytics.css";

const Analytics = () => {
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState([
    subDays(new Date(), 7),
    new Date(),
  ]);
  const [startDate, endDate] = dateRange;

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);

        const res = await API.get(
          `/analytics?start_date=${format(
            startDate,
            "yyyy-MM-dd"
          )}&end_date=${format(endDate, "yyyy-MM-dd")}`
        );

        console.log("📡 Analytics Data Fetched:", res.data); // ✅ Debugging API response

        const defaultPlatformStats = {
          YouTube: 0,
          Instagram: 0,
          Facebook: 0,
          Other: 0,
        };

        let processedViews;
        if (res.data.monthlyViews && res.data.monthlyViews.length > 0) {
          // ✅ Aggregate Total Visits for Each Month
          const visitsByMonth = res.data.monthlyViews.reduce((acc, item) => {
            acc[item.month] = (acc[item.month] || 0) + item.totalVisits;
            return acc;
          }, {});

          processedViews = Object.entries(visitsByMonth).map(
            ([month, totalVisits]) => ({
              month,
              totalVisits,
            })
          );
        } else {
          // ✅ Date-wise Data for Line Chart (Fallback as Month)
          processedViews = res.data.views.map((view) => ({
            month: new Date(view.date).toLocaleString("en-US", {
              month: "short",
            }),
            totalVisits: view.views,
          }));
        }

        // ✅ Traffic by devices
        const processedDevices = res.data.devices.map((device) => ({
          name: device.name,
          value: device.value,
        }));

        // ✅ Pie Chart
        const clickOnlyPlatformStats = {};
        for (const platform in res.data.platformStats) {
          clickOnlyPlatformStats[platform] =
            res.data.platformStats[platform] || 0;
        }

        console.log("🔍 Processing Links Data:", res.data.links);

        const processedLinks = res.data.links.map((link, index) => ({
          name: `Link ${index + 1}`, // ✅ Always display "Link 1", "Link 2", etc.
          value: link.value || 0, // ✅ Keep correct click count
        }));

        console.log("✅ Final Processed Links:", processedLinks);

        // ✅ Calculate Total Clicks
        const totalClicks =
          res.data.monthlyViews && res.data.monthlyViews.length > 0
            ? res.data.monthlyViews.reduce(
                (sum, item) => sum + (item.totalVisits || 0),
                0
              )
            : 0;

        // ✅ Calculate Shop and CTA Clicks if they are returned by the backend
        const shopClicks = res.data.shopClicks || 0;
        const ctaClicks = res.data.cta || 0;

        // 🚨 Debugging Logs
        console.log("🟡 Calculated Total Clicks:", totalClicks);
        console.log("🟡 Shop Clicks:", shopClicks);
        console.log("🟡 CTA Clicks:", ctaClicks);

        const newData = {
          user: res.data.user,
          views: processedViews || [],
          devices: processedDevices || [],
          links: processedLinks || [],
          platformStats: clickOnlyPlatformStats,
          totalClicks,
          shopClicks,
          cta: ctaClicks,
        };

        console.log("✅ Final Analytics Data Processed:", newData);
        setAnalyticsData(newData);

        console.log("✅ Final Analytics Data Processed:", {
          ...res.data,
          totalClicks,
          shopClicks,
          cta: ctaClicks,
        });
      } catch (error) {
        console.error("❌ Error fetching analytics:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [startDate, endDate]);

  const getFormattedDateRange = () => {
    if (!startDate || !endDate) return "Select a date range";
    return `${format(startDate, "MMM do")} to ${format(endDate, "MMM do")}`;
  };

  return (
    <div className="analytics-container">
      <h2 className="analytics-title">
        Hi, {analyticsData?.user?.firstName} {analyticsData?.user?.lastName}!
      </h2>
      <p className="analytics-subtitle">
        Congratulations! You got a great response today.
      </p>

      {/* Date Range Picker */}
      <div className="filter">
        <label>Overview</label>
        <div
          className="date-picker-wrapper"
          onClick={() => document.getElementById("hidden-datepicker").click()}
        >
          <FaCalendarAlt className="calendar-icon" />
          <span className="date-display">{getFormattedDateRange()}</span>
        </div>
        <DatePicker
          id="hidden-datepicker"
          selectsRange
          startDate={startDate}
          endDate={endDate}
          onChange={(update) => setDateRange(update || [null, null])}
          dateFormat="MMM do"
          className="hidden-datepicker"
          popperPlacement="bottom-end"
          popperModifiers={{
            preventOverflow: {
              enabled: true,
              boundariesElement: "window",
            },
            flip: {
              enabled: true,
              behavior: ["bottom", "bottom-end", "bottom-start"],
            },
            offset: {
              enabled: true,
              offset: "0, 5",
            },
          }}
        />
      </div>

      {loading ? (
        <p>Loading analytics...</p>
      ) : analyticsData ? (
        <>
          <AnalyticsOverview data={analyticsData} />
          <div className="analytics-charts">
            <AnalyticsLineChart data={analyticsData.views} />

            <div className="charts-grid">
              <div className="charts-row">
                {/* Traffic by Device */}
                <div className="device-chart-box">
                  <TrafficByDeviceChart data={analyticsData.devices} />
                </div>

                {/* Sites Pie Chart */}
                <div className="pie-chart-box">
                  <AnalyticsPieChart
                    data={analyticsData?.platformStats || {}}
                  />
                </div>
              </div>

              {/* Traffic by Links */}
              <div className="links-chart-box">
                <TrafficByLinksChart data={analyticsData.links} />
              </div>
            </div>
          </div>
        </>
      ) : (
        <p>No analytics data available.</p>
      )}
    </div>
  );
};

export default Analytics;
