import React from 'react'
import { Link } from 'react-router-dom'


const Dashboard = () => {
    return (
        <div className="dashboard">
            <div className="left hidden">
                <div className="dashboard-menu">
                    <div className="top">
                        <a className="active dash-btn"><ion-icon name="analytics"></ion-icon> Analytics</a>
                        <a className="dash-btn"><ion-icon name="contacts"></ion-icon> Users
                        </a>
                        <a className="dash-btn"><ion-icon name="card"></ion-icon> Revenue</a>
                        <a className="dash-btn"><ion-icon name="happy"></ion-icon> Engagement</a>
                        <a className="dash-btn"><ion-icon name="calendar"></ion-icon> Celendar</a>
                        <a className="dash-btn"><ion-icon name="hammer"></ion-icon> Fixes</a>
                    </div>
                    <div className="bottom">
                        <a className="dark dash-btn"><ion-icon name="settings"></ion-icon> Settings</a>
                    </div>
                </div>
            </div>
            <div className="right">
                <div className="flex justify-center md:justify-start items-center md:flex-row gap-2">
                    <Link to="/create-blog" className="btn blog-link">Manage blogs</Link>
                    <Link to="/admin-contacts" className="btn blog-link">View contacts</Link>
                </div>
                <div className="dash-cards">
                    <div className="dash-card">
                        <div className="dash-card-title">Visitors</div>
                        <div className="dash-card-measure">
                            <div className="rise">
                                <ion-icon name="trending-up"></ion-icon>
                            </div>
                            <div className="down">
                                <ion-icon name="trending-down"></ion-icon>
                            </div>
                        </div>
                        <div className="dash-card-content">12,211</div>
                    </div>
                    <div className="dash-card">
                        <div className="dash-card-title">Predictions</div>
                        <div className="dash-card-measure">
                            <div className="rise">
                                <ion-icon name="trending-up"></ion-icon>
                            </div>
                            <div className="down">
                                <ion-icon name="trending-down"></ion-icon>
                            </div>
                        </div>
                        <div className="dash-card-content">112 K</div>
                    </div>
                    <div className="dash-card">
                        <div className="dash-card-title">Active users</div>
                        <div className="dash-card-measure">
                            <div className="rise">
                                <ion-icon name="trending-up"></ion-icon>
                            </div>
                            <div className="down">
                                <ion-icon name="trending-down"></ion-icon>
                            </div>
                        </div>
                        <div className="dash-card-content">2.5 M</div>
                    </div>
                </div>
                <br />
                <div className="dash-actions">
                    <div className="dash-action">
                        <h3 className="dash-header">Analytics.</h3>
                        <p>Get most out of your data.</p>
                        <div className="analytics-img">
                            <img src="./images/analytics.png" alt="Coding" />
                        </div>
                    </div>
                    <div className="dash-action">
                        <h3 className="dash-header">Activity.</h3>
                        <p>Track down activities.</p>
                        <div className="analytics-img">
                            <img src="./images/activity.png" alt="activities" />
                        </div>
                    </div>
                    <div className="dash-action">
                        <h3 className="dash-header">Management.</h3>
                        <p>Micro-managing everything.</p>
                        <div className="analytics-img">
                            <img src="./images/management.png" alt="management" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard